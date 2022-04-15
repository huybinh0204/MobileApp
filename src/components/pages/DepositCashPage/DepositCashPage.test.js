import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Linking } from 'react-native';
import ENV from 'react-native-config';
import { createStore } from 'redux';
import strings from '_localization/index';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import DepositCashPage from './DepositCashPage';

describe('DepositCashPage', () => {
  let mockStore;

  beforeEach(() => {
    mockStore = createStore(rootReducer, {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', async () => {
    const { toJSON } = render(
      <ComponentWithProviders store={mockStore} component={DepositCashPage} />
    );

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should open the deposit cash locations in external browser', async () => {
    jest.spyOn(Linking, 'openURL');
    const { getByText } = render(
      <ComponentWithProviders store={mockStore} component={DepositCashPage} />
    );

    const findDepositLocationButton = getByText(strings.depositCash.button);
    fireEvent.press(findDepositLocationButton);
    await waitFor(() => {
      expect(Linking.openURL).toHaveBeenCalledWith(ENV.FIND_PLACE_TO_DEPOSIT_CASH_URI);
    });
  });
});
