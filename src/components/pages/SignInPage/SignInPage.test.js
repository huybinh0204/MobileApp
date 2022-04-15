import { useNavigation } from '@react-navigation/native';
import { SplitContext, useClient } from '@splitsoftware/splitio-react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NAVIGATION } from '_constants';
import strings from '_localization/index';
import { AuthenticationActions } from '_store/authentication';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import SignInPage from './SignInPage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('@splitsoftware/splitio-react', () => ({
  ...jest.requireActual('@splitsoftware/splitio-react'),
  useClient: jest.fn(),
}));

const SignIn = () => (
  <SplitContext.Provider value={{ isReady: true }}>
    <SignInPage />
  </SplitContext.Provider>
);

describe('SignInPage', () => {
  const mockedDispatch = jest.fn();
  const mockedNavigation = navigationMock(jest.fn);

  beforeEach(() => {
    useDispatch.mockReturnValue(mockedDispatch);
    useNavigation.mockReturnValue(mockedNavigation);
    useClient.mockReturnValue({ getTreatment: (flag) => 'on' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const { toJSON } = render(<ComponentWithProviders component={SignIn} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should dispatch the signIn action when email and password are valid correct', async () => {
    const { getByText, getByTestId } = render(<ComponentWithProviders component={SignIn} />);

    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const signInButton = getByText(strings.signIn.button_text);

    fireEvent.changeText(emailInput, 'test@mail.com');
    fireEvent.changeText(passwordInput, 'Ahead123!');

    await waitFor(() => {
      fireEvent.press(signInButton);
    });

    expect(mockedDispatch).toBeCalledWith(
      AuthenticationActions.signIn({
        email: 'test@mail.com',
        password: 'Ahead123!',
        isEmailVerificationEnabled: true,
      })
    );
  });

  it('should dispatch the signIn action with email password and email verification disabled', async () => {
    useClient.mockReturnValue({ getTreatment: (flag) => 'off' });

    const { getByText, getByTestId } = render(<ComponentWithProviders component={SignIn} />);

    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const signInButton = getByText(strings.signIn.button_text);

    fireEvent.changeText(emailInput, 'test@mail.com');
    fireEvent.changeText(passwordInput, 'Ahead123!');

    await waitFor(() => {
      fireEvent.press(signInButton);
    });

    expect(mockedDispatch).toBeCalledWith(
      AuthenticationActions.signIn({
        email: 'test@mail.com',
        password: 'Ahead123!',
        isEmailVerificationEnabled: false,
      })
    );
  });

  it('should not enable the submit button when password is not provided', async () => {
    const { getByText, getByTestId } = render(<ComponentWithProviders component={SignIn} />);

    const emailInput = getByTestId('email');
    const signInButton = getByText(strings.signIn.button_text);

    fireEvent.changeText(emailInput, 'test@mail.com');

    await waitFor(() => {
      fireEvent.press(signInButton);
    });

    expect(mockedDispatch).toBeCalledTimes(0);
  });

  it('should navigate to the sign up screen', async () => {
    const { getByText } = render(<ComponentWithProviders component={SignIn} />);

    const signUpButton = getByText(strings.signIn.signUp);

    await waitFor(() => {
      fireEvent.press(signUpButton);
    });

    expect(mockedNavigation.navigate).toBeCalledWith(NAVIGATION.auth.signUpMail);
  });

  it('should navigate to the forgot password screen', async () => {
    const { getByText } = render(<ComponentWithProviders component={SignIn} />);

    const forgotPasswordButton = getByText(strings.signIn.forgot_password);

    await waitFor(() => {
      fireEvent.press(forgotPasswordButton);
    });

    expect(mockedNavigation.navigate).toBeCalledWith(NAVIGATION.auth.forgotPassword);
  });

  it('should show back button if navigation can go back', () => {
    mockedNavigation.canGoBack.mockReturnValue(true);
    const { queryByTestId } = render(<ComponentWithProviders component={SignIn} />);
    expect(queryByTestId('BackButton')).not.toBeNull();
  });

  it('should not show back button if navigation cannot go back', () => {
    mockedNavigation.canGoBack.mockReturnValue(false);
    const { queryByTestId } = render(<ComponentWithProviders component={SignIn} />);
    expect(queryByTestId('BackButton')).toBeNull();
  });
});
