import { useNavigation } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import * as ReactRedux from 'react-redux';
import { createStore } from 'redux';
import { DEBIT_CARD_STATUS } from '_constants';
import strings from '_localization/index';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import ActivateCardExpDatePage from './ActivateCardExpDatePage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

const dispatch = jest.fn();
jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(dispatch);

describe('ActivateCardExpDatePage', () => {
  let mockStore;
  let mockNavigation;

  beforeEach(() => {
    mockStore = createStore(rootReducer, {
      auth: {
        credentials: {
          accessToken: 'eyJhbGciOiJSUzIYzZnpabjNoNnSJ9.eyJpc3M',
        },
      },
      account: {
        externalId: 'd9be3a12-1909-459c-91dd-80be2dce1353',
        kinlyDebitCards: [
          {
            cardLastFour: '9247',
            status: DEBIT_CARD_STATUS.READY_TO_ACTIVATE,
            cardId: '680',
          },
        ],
      },
    });
    mockNavigation = navigationMock(jest.fn);
    useNavigation.mockImplementation(() => mockNavigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', async () => {
    const { toJSON } = render(
      <ComponentWithProviders component={ActivateCardExpDatePage} store={mockStore} />
    );

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should not navigate if the date is invalid', async () => {
    const { getByText, getByTestId } = render(
      <ComponentWithProviders component={ActivateCardExpDatePage} store={mockStore} />
    );

    const input = getByTestId('cardExpirationDate');
    const submitButton = getByText(strings.signUp.continue);

    await fireEvent.changeText(input, '1119');
    await fireEvent.press(submitButton);

    expect(mockNavigation.navigate).toBeCalledTimes(0);
  });

  it('should dispatch action to activate the card', async () => {
    const { getByText, getByTestId } = render(
      <ComponentWithProviders component={ActivateCardExpDatePage} store={mockStore} />
    );

    const input = getByTestId('cardExpirationDate');
    const submitButton = getByText(strings.signUp.continue);

    await fireEvent.changeText(input, '1125');
    await fireEvent.press(submitButton);

    expect(dispatch).toHaveBeenCalledWith({
      cardExpiryDate: '2025-11',
      cardId: '680',
      externalId: 'd9be3a12-1909-459c-91dd-80be2dce1353',
      type: '@@BE-ACCOUNT/ACTIVATE_CARD',
    });
  });
});
