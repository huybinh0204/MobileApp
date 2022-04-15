import { useNavigation } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { createStore } from 'redux';
import { NAVIGATION } from '_constants';
import strings from '_localization';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import AtomicFiOverdraftSellPage from './AtomicFiOverdraftSellPage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('AtomicFiOverdraftSellPage', () => {
  let mockStore;
  let mockNavigation = navigationMock(jest.fn);

  beforeEach(() => {
    useNavigation.mockReturnValue(mockNavigation);
    mockStore = createStore(rootReducer, {
      account: {
        directDepositFormError: false,
        isLoadingAtomicFiToken: false,
        atomicFiToken: {
          publicToken: 'atomic-fi-token',
        },
      },
      fundDirectDepositStoreReducer: {
        renderData: {
          accountNumber: '12345678',
          routingNumber: '00000000',
        },
        renderDataError: false,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const { toJSON } = render(
      <ComponentWithProviders component={AtomicFiOverdraftSellPage} store={mockStore} />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should navigate to direct deposit form view page when get form button is pressed', () => {
    const { getByTestId, getByText } = render(
      <ComponentWithProviders component={AtomicFiOverdraftSellPage} store={mockStore} />
    );

    const directDepositButton = getByText(strings.overdraft.sell.setUpDirectDeposit);
    fireEvent.press(directDepositButton);

    const directDepositFormButton = getByTestId('overdraftSellPageGetFormButton');
    fireEvent.press(directDepositFormButton);

    expect(mockNavigation.navigate).toBeCalledWith(NAVIGATION.shared.directDepositFormView);
  });

  it('should initiate atomic fi transact SDK and navigate to success screen', () => {
    const { getByTestId } = render(
      <ComponentWithProviders component={AtomicFiOverdraftSellPage} store={mockStore} />
    );

    const button = getByTestId('continue');
    fireEvent.press(button);

    expect(mockNavigation.navigate).toHaveBeenCalledWith(NAVIGATION.shared.earlyPaycheckSuccess);
  });
});
