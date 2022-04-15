import { useNavigation } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { createStore } from 'redux';
import { NAVIGATION, TRANSFER_TYPES } from '_constants';
import strings from '_localization';
import { AccountActions } from '_store/account';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import TakeOutMoneyPage from './TakeOutMoneyPage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('TakeOutMoneyPage', () => {
  let mockStore;
  const mockedDispatch = jest.fn();
  const mockedNavigation = navigationMock(jest.fn);

  beforeEach(() => {
    useDispatch.mockReturnValue(mockedDispatch);
    useNavigation.mockReturnValue(mockedNavigation);

    mockStore = createStore(rootReducer, {
      account: {
        accountsList: [
          {
            id: 136,
            name: 'Bank Of America (9873)',
          },
        ],
        accountCardsList: [],
        accountInfo: {
          balance: 1234.56,
        },
        credentials: {},
        externalId: 12345,
        linkAchSuccess: false,
        linkAchError: null,
        isLoadingAccountInfo: false,
        isLoadingAchAccount: false,
      },
      fundDirectDepositStoreReducer: {
        renderData: {
          accountNumber: '728983733',
        },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not enable the button if the amount is not within the allowed boundaries', () => {
    const { getByText, getByTestId } = render(
      <ComponentWithProviders component={TakeOutMoneyPage} store={mockStore} />
    );

    const input = getByTestId('currency-input');
    const instantTransfer = getByTestId(TRANSFER_TYPES.INSTANT_OUT);
    const continueButton = getByText(strings.moneyMovement.submitButtonText);

    fireEvent.press(instantTransfer);
    expect(continueButton).toBeDisabled();

    fireEvent.changeText(input, '124'); // the amount will be 1.24
    expect(continueButton).toBeDisabled();

    fireEvent.changeText(input, '25001'); // the amount will be 250.01
    expect(continueButton).toBeDisabled();
  });

  it('should not navigate to next page if transfer amount is greater than the account balance', () => {
    const { getByText, getByTestId } = render(
      <ComponentWithProviders component={TakeOutMoneyPage} store={mockStore} />
    );

    const input = getByTestId('currency-input');
    const instantTransfer = getByTestId(TRANSFER_TYPES.INSTANT_OUT);
    const continueButton = getByText(strings.moneyMovement.submitButtonText);

    fireEvent.press(instantTransfer);
    fireEvent.changeText(input, '234567');

    expect(continueButton).toBeDisabled();
  });

  it('should not navigate to next page if the account information is loading', () => {
    mockStore = createStore(rootReducer, {
      account: {
        accountsList: [],
        accountCardsList: [],
        accountInfo: {
          balance: 1234.56,
        },
        credentials: {},
        externalId: 12345,
        linkAchSuccess: false,
        linkAchError: null,
        isLoadingAccountInfo: true,
        isLoadingAchAccount: false,
      },
      fundDirectDepositStoreReducer: {
        renderData: {
          accountNumber: '728983733',
        },
      },
    });

    const { getByTestId } = render(
      <ComponentWithProviders component={TakeOutMoneyPage} store={mockStore} />
    );

    const input = getByTestId('currency-input');
    const continueButton = getByTestId('SubmitButton');
    const instantTransfer = getByTestId(TRANSFER_TYPES.INSTANT_OUT);

    fireEvent.changeText(input, '1');
    fireEvent.press(instantTransfer);

    expect(continueButton).toBeDisabled();
  });

  it('should navigate if transfer amount is valid and less than the account balance', () => {
    const { getByTestId } = render(
      <ComponentWithProviders component={TakeOutMoneyPage} store={mockStore} />
    );

    const input = getByTestId('currency-input');
    const instantTransfer = getByTestId(TRANSFER_TYPES.INSTANT_OUT);
    const continueButton = getByTestId('SubmitButton');

    fireEvent.changeText(input, '150');
    fireEvent.press(instantTransfer);

    expect(continueButton).toBeEnabled();
  });

  it('should navigate to add card if the user has selected instant transfer and does not have a debit/credit card linked.', () => {
    const { getByTestId } = render(
      <ComponentWithProviders component={TakeOutMoneyPage} store={mockStore} />
    );

    const input = getByTestId('currency-input');
    const instantTransfer = getByTestId(TRANSFER_TYPES.INSTANT_OUT);
    const continueButton = getByTestId('SubmitButton');

    fireEvent.press(instantTransfer);
    fireEvent.changeText(input, '1000');

    expect(continueButton).toBeEnabled();

    fireEvent.press(continueButton);

    expect(mockedDispatch).toHaveBeenCalledWith(AccountActions.fetchAccountInfo(12345));
    expect(mockedNavigation.navigate).toHaveBeenCalledWith(NAVIGATION.accounts.linkDebitCardPage);
  });

  it('should navigate to fund confirmation if the user has selected instant transfer and has a debit/credit card linked', () => {
    mockStore = createStore(rootReducer, {
      account: {
        accountsList: [],
        accountCardsList: [
          {
            externalUserId: '9df570b1-e079-466d-ab7f-33sfg5affe7be',
            issuer: {
              network: 'Visa',
              payeeId: '0000',
              payeeName: 'Chase VISA',
            },
            lastFourDigits: '1111',
            linkedDebitCardId: 'c3198f34-e3c6-4ef9-9b93-7dbad230sss',
          },
        ],
        accountInfo: {
          balance: 1234.56,
        },
        credentials: {},
        externalId: 12345,
        linkAchSuccess: false,
        linkAchError: null,
        isLoadingAccountInfo: false,
        isLoadingAchAccount: false,
      },
      fundDirectDepositStoreReducer: {
        renderData: {
          accountNumber: '728983733',
        },
      },
    });

    const { getByTestId } = render(
      <ComponentWithProviders component={TakeOutMoneyPage} store={mockStore} />
    );

    const input = getByTestId('currency-input');
    const instantTransfer = getByTestId(TRANSFER_TYPES.INSTANT_OUT);
    const continueButton = getByTestId('SubmitButton');

    fireEvent.changeText(input, '2000');
    fireEvent.press(instantTransfer);

    expect(continueButton).toBeEnabled();
  });

  it('should match the existing snapshot', () => {
    const { toJSON } = render(
      <ComponentWithProviders component={TakeOutMoneyPage} store={mockStore} />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should match the snapshot if an error ocurrs', async () => {
    mockStore = createStore(rootReducer, {
      account: {
        accountsList: [],
        accountCardsList: [
          {
            externalUserId: '9df570b1-e079-466d-ab7f-33sfg5affe7be',
            issuer: {
              network: 'Visa',
              payeeId: '0000',
              payeeName: 'Chase VISA',
            },
            lastFourDigits: '1111',
            linkedDebitCardId: 'c3198f34-e3c6-4ef9-9b93-7dbad230sss',
          },
        ],
        accountInfo: {
          balance: 1234.56,
        },
        credentials: {},
        externalId: 12345,
        linkAchSuccess: false,
        linkAchError: strings.linkAccount.linkAccountError,
        isLoadingAccountInfo: false,
        isLoadingAchAccount: false,
      },
      fundDirectDepositStoreReducer: {
        renderData: {
          accountNumber: '728983733',
        },
      },
    });

    const { toJSON } = render(
      <ComponentWithProviders component={TakeOutMoneyPage} store={mockStore} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
