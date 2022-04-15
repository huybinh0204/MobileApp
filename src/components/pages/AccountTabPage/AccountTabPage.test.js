import * as Split from '@splitsoftware/splitio-react';
import { render } from '@testing-library/react-native';
import React from 'react';
import { createStore } from 'redux';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import AccountTabPage from './AccountTabPage';

describe('AccountTabPage', () => {
  let mockStore;

  beforeEach(() => {
    jest.spyOn(Split, 'useClient').mockImplementation(() => ({
      getTreatment(flag) {
        return 'on';
      },
    }));
    mockStore = createStore(rootReducer, {
      account: {
        accountsList: [],
        accountInfo: { balance: 1000 },
        accountCardsList: [],
        transactionsDetails: [],
        unlinkDebitCardSuccess: true,
        isLoadingAchAccount: false,
        plaidLinkTokenObject: {
          linkToken: 'plaid-token',
        },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(
      <ComponentWithProviders component={AccountTabPage} store={mockStore} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
