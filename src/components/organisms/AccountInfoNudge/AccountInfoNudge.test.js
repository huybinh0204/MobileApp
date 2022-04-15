import * as Split from '@splitsoftware/splitio-react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { createStore } from 'redux';
import { NAVIGATION } from '_constants';
import strings from '_localization/index';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import AccountInfoNudge from './AccountInfoNudge';

const mockDispatch = jest.fn();
const mockNavigation = navigationMock(jest.fn);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => mockNavigation,
}));

describe('AccountInfoNudge', () => {
  let mockStore;

  beforeEach(() => {
    mockStore = createStore(rootReducer, {
      fundDirectDepositStoreReducer: {
        renderData: {
          accountNumber: '123456798',
          routingNumber: '000000000',
        },
      },
    });
  });

  it('should match the snapshot', () => {
    jest.spyOn(Split, 'useClient').mockImplementation(() => ({
      getTreatment(flag) {
        return 'on';
      },
    }));
    const { toJSON } = render(
      <ComponentWithProviders component={AccountInfoNudge} store={mockStore} />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should show account and routing numbers', async () => {
    const { getByText } = render(
      <ComponentWithProviders component={AccountInfoNudge} store={mockStore} />
    );

    const accountNumber = getByText('123 ••• •••');
    const routingNumber = getByText('000 000 000');

    await waitFor(() => {
      expect(accountNumber).toBeTruthy();
      expect(routingNumber).toBeTruthy();
    });
  });

  it('should open the modal when button is pressed', async () => {
    const { getByTestId, getByText } = render(
      <ComponentWithProviders component={AccountInfoNudge} store={mockStore} />
    );

    const transferFundsButton = getByTestId('AccountInfoTransferFunds');

    await waitFor(() => {
      fireEvent.press(transferFundsButton);
    });

    expect(getByText(strings.transferMoney.title)).toBeTruthy();
  });

  it("should navigate to Money Movement Page when the 'Take out money' button is pressed", async () => {
    const { getByTestId } = render(
      <ComponentWithProviders component={AccountInfoNudge} store={mockStore} />
    );

    const transferFundsButton = getByTestId('AccountInfoTransferFunds');

    fireEvent.press(transferFundsButton);

    const takeOutMoneyButton = getByTestId('TakeOutMoney');

    await waitFor(() => {
      fireEvent.press(takeOutMoneyButton);
    });

    expect(mockNavigation.navigate).toHaveBeenCalledWith(NAVIGATION.shared.phoneNumber, {
      target: NAVIGATION.accounts.takeOutMoney,
    });
  });
});
