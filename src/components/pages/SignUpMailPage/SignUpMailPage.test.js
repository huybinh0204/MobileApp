import { useNavigation } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NAVIGATION } from '_constants';
import strings from '_localization/index';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import SignUpMailPage from './SignUpMailPage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('SignUpMailPage', () => {
  const mockDispatch = jest.fn();
  const mockNavigation = navigationMock(jest.fn);

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useNavigation.mockReturnValue(mockNavigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should trigger the change of screen if the mail input is correct', async () => {
    const { getByText, getByTestId } = render(
      <ComponentWithProviders component={SignUpMailPage} />
    );

    const emailInput = getByTestId('newAccountMail');
    fireEvent.changeText(emailInput, 'test@mail.com');

    const sendMail = getByText(strings.signUp.continue);
    fireEvent.press(sendMail);

    await waitFor(() => {
      expect(mockNavigation.navigate).toBeCalledWith(NAVIGATION.auth.signUpPassword, {
        email: 'test@mail.com',
      });
    });
  });

  it('should not navigate if the mail input is not correct', async () => {
    const { getByText, getByTestId } = render(
      <ComponentWithProviders component={SignUpMailPage} />
    );

    const emailInput = getByTestId('newAccountMail');
    fireEvent.changeText(emailInput, 'testmailcom');

    const sendMail = getByText(strings.signUp.continue);
    fireEvent.press(sendMail);

    await waitFor(() => {
      expect(mockNavigation.navigate).toBeCalledTimes(0);
    });
  });

  it('should match snapshot', () => {
    const { toJSON } = render(<ComponentWithProviders component={SignUpMailPage} />);

    expect(toJSON()).toMatchSnapshot();
  });
});
