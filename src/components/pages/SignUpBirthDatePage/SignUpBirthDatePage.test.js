import { useNavigation } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { NAVIGATION } from '_constants';
import strings from '_localization/index';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import SignUpBirthDatePage from './SignUpBirthDatePage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('SignUpBirthDatePage', () => {
  let mockNavigation;
  const params = {
    firstName: 'First',
    lastName: 'Last',
  };

  beforeEach(() => {
    mockNavigation = navigationMock(jest.fn);
    useNavigation.mockImplementation(() => mockNavigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should trigger the change of screen if the birth date is correct', async () => {
    const { getByText, getByTestId } = render(
      <ComponentWithProviders component={SignUpBirthDatePage} params={params} />
    );

    const monthInput = getByTestId('signUpBirthMonth');
    const dayInput = getByTestId('signUpBirthDay');
    const yeatInput = getByTestId('signUpBirthYear');
    const submitButton = getByText(strings.signUp.continue);

    fireEvent.changeText(monthInput, '09');
    fireEvent.changeText(dayInput, '24');
    fireEvent.changeText(yeatInput, '1997');

    await waitFor(() => {
      fireEvent.press(submitButton);
    });

    expect(mockNavigation.navigate).toBeCalledWith(NAVIGATION.auth.signUpAddressSuggestion, {
      firstName: 'First',
      lastName: 'Last',
      dateOfBirth: '09/24/1997',
    });
  });

  it('should not navigate if some field is missing', async () => {
    const { getByText } = render(
      <ComponentWithProviders component={SignUpBirthDatePage} params={params} />
    );

    const submitButton = getByText(strings.signUp.continue);

    await waitFor(() => {
      fireEvent.press(submitButton);
    });

    expect(mockNavigation.navigate).toBeCalledTimes(0);
  });

  it('should not navigate if the date is invalid', async () => {
    const { getByText, getByTestId } = render(
      <ComponentWithProviders component={SignUpBirthDatePage} params={params} />
    );

    const monthInput = getByTestId('signUpBirthMonth');
    const dayInput = getByTestId('signUpBirthDay');
    const yeatInput = getByTestId('signUpBirthYear');
    const submitButton = getByText(strings.signUp.continue);

    fireEvent.changeText(monthInput, '12');
    fireEvent.changeText(dayInput, '45');
    fireEvent.changeText(yeatInput, '1990');

    await waitFor(() => {
      fireEvent.press(submitButton);
    });

    expect(mockNavigation.navigate).toBeCalledTimes(0);
  });

  it('should not navigate if the age is invalid', async () => {
    const { getByText, getByTestId } = render(
      <ComponentWithProviders component={SignUpBirthDatePage} params={params} />
    );

    const monthInput = getByTestId('signUpBirthMonth');
    const dayInput = getByTestId('signUpBirthDay');
    const yeatInput = getByTestId('signUpBirthYear');
    const submitButton = getByText(strings.signUp.continue);

    fireEvent.changeText(monthInput, '11');
    fireEvent.changeText(dayInput, '01');
    fireEvent.changeText(yeatInput, '2021');

    await waitFor(() => {
      fireEvent.press(submitButton);
    });

    expect(mockNavigation.navigate).toBeCalledTimes(0);
  });

  it('should match snapshot', () => {
    const { toJSON, getByTestId } = render(
      <ComponentWithProviders component={SignUpBirthDatePage} params={params} />
    );

    const monthInput = getByTestId('signUpBirthMonth');
    const dayInput = getByTestId('signUpBirthDay');
    const yeatInput = getByTestId('signUpBirthYear');

    fireEvent.changeText(monthInput, '09');
    fireEvent.changeText(dayInput, '24');
    fireEvent.changeText(yeatInput, '1997');

    expect(toJSON()).toMatchSnapshot();
  });
});
