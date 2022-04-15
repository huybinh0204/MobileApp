import { useNavigation } from '@react-navigation/native';
import { SplitContext, useClient } from '@splitsoftware/splitio-react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import strings from '_localization/index';
import { AuthenticationActions } from '_store/authentication';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import SignUpPasswordPage from './SignUpPasswordPage';

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

const SignUpPassword = ({ params }) => (
  <SplitContext.Provider value={{ isReady: true }}>
    <ComponentWithProviders component={SignUpPasswordPage} params={params} />
  </SplitContext.Provider>
);

describe('SignUpPasswordPage', () => {
  const mockDispatch = jest.fn();
  const mockNavigation = navigationMock(jest.fn);
  const params = { email: 'test@mail.com' };

  beforeEach(() => {
    useClient.mockReturnValue({ getTreatment: () => 'on' });
    useDispatch.mockReturnValue(mockDispatch);
    useNavigation.mockReturnValue(mockNavigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the create the account if the password is valid', async () => {
    const { getByText, getByTestId } = render(<SignUpPassword params={params} />);

    const passwordInput = getByTestId('password');
    const submitButton = getByText(strings.signUp.continue);

    fireEvent.changeText(passwordInput, 'Ahead123!');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        AuthenticationActions.signUp('test@mail.com', 'Ahead123!')
      );
    });
  });

  it('should not change the screen when password does not pass the regex validation', async () => {
    const { getByText, getByTestId } = render(<SignUpPassword params={params} />);

    const passwordInput = getByTestId('password');
    const submitButton = getByText(strings.signUp.continue);

    fireEvent.changeText(passwordInput, 'test');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockNavigation.navigate).toBeCalledTimes(0);
    });
  });

  it('should match snapshot', () => {
    const { toJSON } = render(<SignUpPassword params={params} />);

    expect(toJSON()).toMatchSnapshot();
  });
});
