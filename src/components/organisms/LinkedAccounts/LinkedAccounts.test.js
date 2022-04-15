import { render } from '@testing-library/react-native';
import React from 'react';
import { createStore } from 'redux';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import LinkedAccounts from './LinkedAccounts';

const mockNavigation = navigationMock(jest.fn);

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => mockNavigation,
}));

describe('LinkedAccounts', () => {
  let mockStore;

  beforeEach(() => {
    mockStore = createStore(rootReducer, {
      account: {
        accountsList: [
          {
            id: '123',
            name: 'Plaid Test 1230',
          },
        ],
        accountCardsList: [
          {
            externalUserId: '9df570b1-e079-466d-ab7f-33sfg5affe7be',
            lastFourDigits: '1111',
            linkedDebitCardId: 'c3198f34-e3c6-4ef9-9b93-7dbad230sss',
            issuer: {
              network: 'Visa',
              payeeId: '0000',
              payeeName: 'Chase',
            },
          },
        ],
      },
    });
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(
      <ComponentWithProviders component={LinkedAccounts} store={mockStore} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
