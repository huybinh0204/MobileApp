import { render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { createStore } from 'redux';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import AccountBalance from './AccountBalance';

describe('AccountBalance', () => {
  let mockStore;

  beforeEach(() => {
    mockStore = createStore(rootReducer, {
      account: {
        accountInfo: { balance: 1000 },
      },
    });
  });

  it('should match the snapshot', async () => {
    const { toJSON } = render(
      <ComponentWithProviders store={mockStore} component={AccountBalance} />
    );

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should have the correct balance number', async () => {
    const { getByText } = render(
      <ComponentWithProviders store={mockStore} component={AccountBalance} />
    );

    const balance = getByText('$1,000.00');

    await waitFor(() => {
      expect(balance).toBeTruthy();
    });
  });
});
