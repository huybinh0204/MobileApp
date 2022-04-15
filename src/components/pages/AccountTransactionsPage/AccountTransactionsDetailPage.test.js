import { render } from '@testing-library/react-native';
import React from 'react';
import { createStore } from 'redux';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import AccountTransactionsDetailPage from './AccountTransactionsDetailPage';

describe('AccountTransactionsDetailPage', () => {
  let mockStore;

  beforeEach(() => {
    mockStore = createStore(rootReducer, {
      account: {
        accountInfo: { balance: 1000 },
        transactionsDetails: [],
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(
      <ComponentWithProviders component={AccountTransactionsDetailPage} store={mockStore} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
