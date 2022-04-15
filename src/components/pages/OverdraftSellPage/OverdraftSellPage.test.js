import Clipboard from '@react-native-community/clipboard';
import { useNavigation } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { createStore } from 'redux';
import { NAVIGATION, OverdraftState } from '_constants';
import strings from '_localization/index';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import OverdraftSellPage from './OverdraftSellPage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('OverdraftSellPage', () => {
  let mockNavigation;

  beforeEach(() => {
    mockNavigation = navigationMock(jest.fn);
    useNavigation.mockImplementation(() => mockNavigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderPageWith = (state) => {
    const mockStore = createStore(rootReducer, {
      account: {
        overdraft: {
          state,
        },
        directDepositFormError: false,
      },
      fundDirectDepositStoreReducer: {
        renderData: {
          accountNumber: '12345678',
          routingNumber: '00000000',
        },
        renderDataError: false,
      },
    });

    return render(<ComponentWithProviders component={OverdraftSellPage} store={mockStore} />);
  };

  it('should navigate to direct deposit form view page when user is eligible', async () => {
    const { getByText } = renderPageWith(OverdraftState.OPT_IN);

    const button = getByText(strings.overdraft.sell.buttonText);
    await fireEvent.press(button);

    expect(mockNavigation.navigate).toBeCalledWith(NAVIGATION.shared.directDepositFormView);
  });

  it('should copy the account number', async () => {
    jest.spyOn(Clipboard, 'setString');

    const { getByTestId } = renderPageWith(OverdraftState.OPT_IN);
    const accountNumberButton = getByTestId('accountButton');

    fireEvent(accountNumberButton, 'onPress');

    await waitFor(() => {
      expect(Clipboard.setString).toBeCalledWith('12345678');
    });
  });

  it('should copy the routing number', async () => {
    jest.spyOn(Clipboard, 'setString');
    const mockStore = createStore(rootReducer, {
      account: {
        overdraft: {
          state: OverdraftState.OPT_IN,
        },
        directDepositFormError: false,
      },
      fundDirectDepositStoreReducer: {
        renderData: {
          accountNumber: null,
          routingNumber: '00000000',
        },
        renderDataError: false,
      },
    });

    const { getByTestId } = render(
      <ComponentWithProviders component={OverdraftSellPage} store={mockStore} />
    );
    const routingNumberButton = getByTestId('routingButton');

    fireEvent(routingNumberButton, 'onPress');

    await waitFor(() => {
      expect(Clipboard.setString).toBeCalledWith('00000000');
    });
  });
});
