import { render } from '@testing-library/react-native';
import React from 'react';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import AddBankAccount from './AddBankAccount';

describe('AddBankAccount', () => {
  it('should match the snapshot', () => {
    const { toJSON } = render(
      <ComponentWithProviders
        component={AddBankAccount}
        componentProps={{
          linkedAccount: {
            id: '123',
            name: 'Plaid Test 1230',
          },
          loading: false,
        }}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render plaid button', () => {
    const { getByTestId } = render(
      <ComponentWithProviders
        component={AddBankAccount}
        componentProps={{
          token: 'plaid-token',
          linkedAccount: null,
          loading: false,
        }}
      />
    );
    const plaidBtn = getByTestId('plaidLinkAccountButton');
    expect(plaidBtn).toBeTruthy();
  });

  it('should render the activity indicator', () => {
    const { getByTestId } = render(
      <ComponentWithProviders
        component={AddBankAccount}
        componentProps={{
          linkedAccount: null,
          loading: true,
        }}
      />
    );

    const addAccountLoading = getByTestId('addAccountLoading');
    expect(addAccountLoading).toBeTruthy();
  });

  it('should render the linked account info', () => {
    const { getByTestId } = render(
      <ComponentWithProviders
        component={AddBankAccount}
        componentProps={{
          token: null,
          linkedAccount: {
            id: '123',
            name: 'Plaid Test 1230',
          },
          loading: false,
        }}
      />
    );
    const linkedAccountButton = getByTestId('linkedAccountButton');
    expect(linkedAccountButton).toBeTruthy();
  });
});
