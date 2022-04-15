import { useNavigation } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { NAVIGATION } from '_constants';
import strings from '_localization/index';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import SignUpNamePage from './SignUpNamePage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('SignUpNamePage', () => {
  const mockNavigation = navigationMock(jest.fn);

  beforeEach(() => {
    useNavigation.mockReturnValue(mockNavigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const { toJSON } = render(
      <ComponentWithProviders component={SignUpNamePage} params={{ email: 'test@mail.com' }} />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should trigger the change of screen if name and last name are corrects', async () => {
    const { getByText, getByTestId } = render(
      <ComponentWithProviders component={SignUpNamePage} params={{ email: 'test@mail.com' }} />
    );

    const firstNameInput = getByTestId('firstName');
    const lastNameInput = getByTestId('lastName');
    const submitButton = getByText(strings.signUp.continue);

    fireEvent.changeText(firstNameInput, 'First');
    fireEvent.changeText(lastNameInput, 'Last');

    expect(submitButton).toBeEnabled();

    await waitFor(() => {
      fireEvent.press(submitButton);
    });

    expect(mockNavigation.navigate).toBeCalledWith(NAVIGATION.auth.signUpBirthDate, {
      email: 'test@mail.com',
      firstName: 'First',
      lastName: 'Last',
    });
  });

  it('should not enable the continue button if some field is missing', async () => {
    const { getByText, getByTestId } = render(
      <ComponentWithProviders component={SignUpNamePage} params={{ email: 'test@mail.com' }} />
    );

    const firstNameInput = getByTestId('firstName');
    const submitButton = getByText(strings.signUp.continue);

    fireEvent.changeText(firstNameInput, 'First');

    expect(submitButton).toBeDisabled();

    fireEvent.press(submitButton);

    expect(mockNavigation.navigate).toBeCalledTimes(0);
  });

  it('should not navigate if first name + last name length is greatter than 25', async () => {
    const { findByText, getByText, getByTestId } = render(
      <ComponentWithProviders component={SignUpNamePage} params={{ email: 'test@mail.com' }} />
    );

    const firstNameInput = getByTestId('firstName');
    const lastNameInput = getByTestId('lastName');
    const submitButton = getByText(strings.signUp.continue);

    fireEvent.changeText(firstNameInput, 'ReallyLongFirstName');
    fireEvent.changeText(lastNameInput, 'LastName');
    fireEvent.press(submitButton);

    expect(await findByText(strings.signUp.maxCombinedError)).toBeTruthy();
    expect(mockNavigation.navigate).toBeCalledTimes(0);
  });
});
