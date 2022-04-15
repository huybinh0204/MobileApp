import { render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { createStore } from 'redux';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import AccountNumber from './AccountNumber';

describe('AccountNumber', () => {
  let mockStore;

  beforeEach(() => {
    mockStore = createStore(rootReducer, {
      fundDirectDepositStoreReducer: {
        renderData: {
          accountNumber: '728983733',
          routingNumber: '988765640',
        },
      },
    });
  });

  it('should match the snapshot when state is opt in and status is active', () => {
    const { toJSON } = render(
      <ComponentWithProviders component={AccountNumber} store={mockStore} />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should show account and routing numbers', async () => {
    const { getByText } = render(
      <ComponentWithProviders component={AccountNumber} store={mockStore} />
    );

    const accountNumber = getByText('728 ••• •••');
    const routingNumber = getByText('988 765 640');

    await waitFor(() => {
      expect(accountNumber).toBeTruthy();
      expect(routingNumber).toBeTruthy();
    });
  });

  it('should show completely the account number', async () => {
    const { getByText } = render(
      <ComponentWithProviders
        component={AccountNumber}
        store={mockStore}
        componentProps={{ showAccountNumber: true }}
      />
    );

    const accountNumber = getByText('728983733');

    await waitFor(() => {
      expect(accountNumber).toBeTruthy();
    });
  });
});
