import { useNavigation } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { createStore } from 'redux';
import { NAVIGATION } from '_constants';
import { CustomerActions } from '_store/customer';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import PhoneNumberConfirmationPage from './PhoneNumberConfirmationPage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('PhoneNumberConfirmationPage', () => {
  let mockDispatch;
  let mockNavigation;
  let mockStore;
  let params;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockNavigation = navigationMock(jest.fn);
    mockStore = createStore(rootReducer, {
      customer: {
        externalId: 'mocked-identity',
      },
    });
    params = {
      target: NAVIGATION.accounts.takeOutMoney,
      phoneNumber: '5104831826',
    };
    useNavigation.mockReturnValue(mockNavigation);
    useDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should navigate to the target screen if the code is validated', async () => {
    mockStore = createStore(rootReducer, {
      customer: {
        externalId: 'mocked-identity',
        confirmPhoneVerificationSuccess: true,
      },
    });

    const { getByTestId } = render(
      <ComponentWithProviders
        component={PhoneNumberConfirmationPage}
        store={mockStore}
        params={params}
      />
    );

    const codeInput = getByTestId('SMSCode');
    fireEvent.changeText(codeInput, '510483');

    expect(mockDispatch).toBeCalledWith(
      CustomerActions.confirmPhoneVerification('510483', 'mocked-identity', '+15104831826')
    );

    expect(mockDispatch).toBeCalledWith(
      CustomerActions.updateCustomerData({ phoneNumber: '5104831826' })
    );

    expect(mockNavigation.navigate).toBeCalledWith(NAVIGATION.accounts.takeOutMoney, {
      target: NAVIGATION.accounts.takeOutMoney,
      phoneNumber: '5104831826',
    });
  });

  it('should not navigate if the code input does not have 6 digits', async () => {
    render(
      <ComponentWithProviders
        component={PhoneNumberConfirmationPage}
        store={mockStore}
        params={params}
      />
    );

    expect(mockDispatch).toBeCalledTimes(0);
  });

  it('should match snapshot', () => {
    const { getByTestId, toJSON } = render(
      <ComponentWithProviders
        component={PhoneNumberConfirmationPage}
        store={mockStore}
        params={params}
      />
    );

    const codeInput = getByTestId('SMSCode');

    fireEvent.changeText(codeInput, '510483');

    expect(toJSON()).toMatchSnapshot();
  });
});
