import Clipboard from '@react-native-community/clipboard';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { createStore } from 'redux';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import AccountInfoPage from './AccountInfoPage';

describe('AccountInfoPage', () => {
  let mockStore;

  beforeEach(() => {
    mockStore = createStore(rootReducer, {
      fundDirectDepositStoreReducer: {
        renderData: {
          accountNumber: '12345678',
          routingNumber: '00000000',
        },
        renderDataError: false,
      },
    });
  });

  it('should match the snapshot', async () => {
    const { toJSON } = render(
      <ComponentWithProviders component={AccountInfoPage} store={mockStore} />
    );

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should show the account and routing numbers', async () => {
    const { getByText } = render(
      <ComponentWithProviders component={AccountInfoPage} store={mockStore} />
    );

    await waitFor(() => {
      expect(getByText('12345678')).toBeTruthy();
      expect(getByText('00000000')).toBeTruthy();
    });
  });

  it('should copy the account number', async () => {
    jest.spyOn(Clipboard, 'setString');

    const { getByAccessibilityLabel } = render(
      <ComponentWithProviders component={AccountInfoPage} store={mockStore} />
    );

    const accountNumberButton = getByAccessibilityLabel('Copy account number');

    fireEvent(accountNumberButton, 'onLongPress');

    await waitFor(() => {
      expect(Clipboard.setString).toBeCalledWith('12345678');
    });
  });

  it('should copy the routing number', async () => {
    jest.spyOn(Clipboard, 'setString');

    const { getByAccessibilityLabel } = render(
      <ComponentWithProviders component={AccountInfoPage} store={mockStore} />
    );

    const routingNumberButton = getByAccessibilityLabel('Copy routing number');

    fireEvent(routingNumberButton, 'onLongPress');

    await waitFor(() => {
      expect(Clipboard.setString).toBeCalledWith('00000000');
    });
  });
});
