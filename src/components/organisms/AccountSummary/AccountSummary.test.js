import { useNavigation } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import React from 'react';
import { createStore } from 'redux';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import AccountSummary from './AccountSummary';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('AccountSummary', () => {
  let mockStore;
  const mockedNavigation = navigationMock(jest.fn);

  beforeEach(() => {
    useNavigation.mockReturnValue(mockedNavigation);
    mockStore = createStore(rootReducer, {
      account: {
        accountInfo: {
          balance: 1000.55,
        },
      },
    });
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(
      <ComponentWithProviders store={mockStore} component={AccountSummary} />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should show the balance formatted', () => {
    const { getByText } = render(
      <ComponentWithProviders store={mockStore} component={AccountSummary} />
    );

    const balance = getByText('$1,000.55');

    expect(balance).toBeTruthy();
  });
});
