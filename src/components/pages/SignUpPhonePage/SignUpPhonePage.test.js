import { useNavigation } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import * as ReactRedux from 'react-redux';
import { createStore } from 'redux';
import { NAVIGATION } from '_constants/index';
import strings from '_localization/index';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import SignUpPhonePage from './SignUpPhonePage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

const dispatch = jest.fn();
jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(dispatch);

describe('SignUpPhonePage', () => {
  let mockStore;
  let mockNavigation;

  beforeEach(() => {
    mockStore = createStore(rootReducer, {
      auth: {
        credentials: {
          sub: 'identity-unique-id',
          accessToken: 'eyJhbGciOiJSUzIYzZnpabjNoNnSJ9.eyJpc3M',
        },
      },
      customer: {
        externalId: 'mocked-external-id',
      },
    });
    mockNavigation = navigationMock(jest.fn);
    useNavigation.mockImplementation(() => mockNavigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch an action if the phone number is correct', async () => {
    const { getByText, getByTestId } = render(
      <ComponentWithProviders component={SignUpPhonePage} store={mockStore} />
    );

    const phoneNumberInput = getByTestId('phoneNumber');
    fireEvent.changeText(phoneNumberInput, '5104831826');

    const submitButton = getByText(strings.signUp.continue);

    await waitFor(() => {
      fireEvent.press(submitButton);
    });

    expect(dispatch).toBeCalledWith({
      customerExternalId: 'mocked-external-id',
      phoneNumber: '+15104831826',
      type: '@@BE-CUSTOMER/START_PHONE_VERIFICATION',
    });
  });

  it('should trigger the change of screen if the code was requested successfully', async () => {
    mockStore = createStore(rootReducer, {
      auth: {
        credentials: {
          sub: 'identity-unique-id',
          accessToken: 'eyJhbGciOiJSUzIYzZnpabjNoNnSJ9.eyJpc3M',
        },
      },
      customer: {
        phoneVerificationSuccess: true,
      },
    });

    const { getByText, getByTestId } = render(
      <ComponentWithProviders component={SignUpPhonePage} store={mockStore} />
    );

    const phoneNumberInput = getByTestId('phoneNumber');
    fireEvent.changeText(phoneNumberInput, '5104831826');

    const submitButton = getByText(strings.signUp.continue);

    await waitFor(() => {
      fireEvent.press(submitButton);
    });

    expect(mockNavigation.navigate).toBeCalledWith(NAVIGATION.auth.signUpPhoneConfirmation, {
      phoneNumber: '5104831826',
    });
  });

  it('should not navigate if some field is missing', async () => {
    const { getByText } = render(
      <ComponentWithProviders
        component={SignUpPhonePage}
        store={mockStore}
        params={{ firstName: 'First', lastName: 'Last', dateOfBirth: '09241997' }}
      />
    );

    const submitButton = getByText(strings.signUp.continue);

    await waitFor(() => {
      fireEvent.press(submitButton);
    });

    expect(mockNavigation.navigate).toBeCalledTimes(0);
  });

  it('should match snapshot', () => {
    const { getByTestId, toJSON } = render(
      <ComponentWithProviders
        component={SignUpPhonePage}
        store={mockStore}
        params={{ firstName: 'First', lastName: 'Last', dateOfBirth: '09241997' }}
      />
    );

    const phoneNumberInput = getByTestId('phoneNumber');

    fireEvent.changeText(phoneNumberInput, '5104831826');

    expect(toJSON()).toMatchSnapshot();
  });
});
