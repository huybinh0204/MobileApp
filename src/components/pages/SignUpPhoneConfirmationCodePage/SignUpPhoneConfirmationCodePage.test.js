import { useNavigation } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { createStore } from 'redux';
import { CustomerActions } from '_store/customer';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import SignUpPhoneConfirmationCodePage from './SignUpPhoneConfirmationCodePage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('SignUpPhoneConfirmationCodePage', () => {
  let mockStore;
  let mockNavigation;
  let mockDispatch;
  let params;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockNavigation = navigationMock(jest.fn);
    mockStore = createStore(rootReducer, {
      customer: {
        externalId: 'mocked-external-id',
      },
    });
    params = {
      phoneNumber: '5104831826',
    };
    useNavigation.mockImplementation(() => mockNavigation);
    useDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should trigger the change of screen if the code has 6 digits', async () => {
    mockStore = createStore(rootReducer, {
      customer: {
        externalId: 'mocked-external-id',
        confirmPhoneVerificationSuccess: true,
      },
    });

    const { getByTestId } = render(
      <ComponentWithProviders
        component={SignUpPhoneConfirmationCodePage}
        store={mockStore}
        params={params}
      />
    );

    const codeInput = getByTestId('SMSCode');
    fireEvent.changeText(codeInput, '510483');

    expect(mockDispatch).toBeCalledWith(
      CustomerActions.confirmPhoneVerification('510483', 'mocked-external-id', '+15104831826')
    );
  });

  it('should not navigate if the code input does not have 6 digits', async () => {
    render(
      <ComponentWithProviders
        component={SignUpPhoneConfirmationCodePage}
        store={mockStore}
        params={params}
      />
    );

    expect(mockDispatch).toBeCalledTimes(0);
  });

  it('should match snapshot', () => {
    const { getByTestId, toJSON } = render(
      <ComponentWithProviders
        component={SignUpPhoneConfirmationCodePage}
        store={mockStore}
        params={params}
      />
    );

    const codeInput = getByTestId('SMSCode');

    fireEvent.changeText(codeInput, '510483');

    expect(toJSON()).toMatchSnapshot();
  });
});
