import { render } from '@testing-library/react-native';
import React from 'react';
import { createStore } from 'redux';
import strings from '_localization';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import AddMoneyPage from './AddMoneyPage';

describe('AddMoneyPage', () => {
  let mockStore;

  beforeEach(() => {
    mockStore = createStore(rootReducer, {
      account: {
        accountsList: [{ id: 136, name: 'Bank Of America (9873)' }],
        linkAchSuccess: false,
        linkAchError: strings.linkAccount.linkAccountError,
      },
      auth: {
        credentials: {
          accessToken: 'example.test.some-fes-test-xam-pel-tes-es-test',
          sub: 'auth0|example',
        },
      },
      fundDirectDepositStoreReducer: {
        renderData: {
          accountNumber: '728983733',
        },
      },
    });
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(
      <ComponentWithProviders component={AddMoneyPage} store={mockStore} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
