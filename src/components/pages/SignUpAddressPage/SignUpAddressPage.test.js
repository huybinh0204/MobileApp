import { useNavigation } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { NAVIGATION } from '_constants';
import strings from '_localization/index';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import SignUpAddressPage from './SignUpAddressPage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('SignUpAddressPage', () => {
  let mockNavigation = navigationMock(jest.fn);

  beforeEach(() => {
    useNavigation.mockReturnValue(mockNavigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should trigger the change of screen if the address is correct', async () => {
    const { getByText, getByTestId } = render(
      <ComponentWithProviders
        component={SignUpAddressPage}
        params={{
          firstName: 'First',
          lastName: 'Last',
          dateOfBirth: '09/24/1997',
          phoneNumber: '5104831826',
          addressLine1: '123 Main Street',
          city: '',
          state: '',
          zipCode: '',
        }}
      />
    );

    const addressLine2Input = getByTestId('addressLine2');
    fireEvent.changeText(addressLine2Input, 'Apt 111');

    const cityInput = getByTestId('city');
    fireEvent.changeText(cityInput, 'Oakland');

    const stateInput = getByTestId('state');
    fireEvent.changeText(stateInput, 'CA');

    const zipCodeInput = getByTestId('zipCode');
    fireEvent.changeText(zipCodeInput, '94501');

    const submitButton = getByText(strings.signUp.continue);
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockNavigation.navigate).toBeCalledWith(NAVIGATION.auth.signUpSSN, {
        firstName: 'First',
        lastName: 'Last',
        dateOfBirth: '09/24/1997',
        phoneNumber: '5104831826',
        addressLine1: '123 Main Street',
        addressLine2: 'Apt 111',
        city: 'Oakland',
        state: 'CA',
        zipCode: '94501',
      });
    });
  });

  it('should trigger the change of screen even with lowerCase state', async () => {
    const { getByText, getByTestId } = render(
      <ComponentWithProviders
        component={SignUpAddressPage}
        params={{
          firstName: 'First',
          lastName: 'Last',
          dateOfBirth: '09/24/1997',
          phoneNumber: '5104831826',
          addressLine1: '123 Main Street',
        }}
      />
    );

    const addressLine2Input = getByTestId('addressLine2');
    fireEvent.changeText(addressLine2Input, 'Apt 111');

    const cityInput = getByTestId('city');
    fireEvent.changeText(cityInput, 'Oakland');

    const stateInput = getByTestId('state');
    fireEvent.changeText(stateInput, 'ca');

    const zipCodeInput = getByTestId('zipCode');
    fireEvent.changeText(zipCodeInput, '94501');

    const submitButton = getByText(strings.signUp.continue);
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockNavigation.navigate).toBeCalledWith(NAVIGATION.auth.signUpSSN, {
        firstName: 'First',
        lastName: 'Last',
        dateOfBirth: '09/24/1997',
        phoneNumber: '5104831826',
        addressLine1: '123 Main Street',
        addressLine2: 'Apt 111',
        city: 'Oakland',
        state: 'CA',
        zipCode: '94501',
      });
    });
  });

  it('should not navigate if some field is missing', async () => {
    const { getByText, getByTestId } = render(
      <ComponentWithProviders
        component={SignUpAddressPage}
        params={{
          firstName: 'First',
          lastName: 'Last',
          dateOfBirth: '09/24/1997',
          phoneNumber: '5104831826',
          addressLine1: '123 Main Street',
        }}
      />
    );

    const addressLine2Input = getByTestId('addressLine2');
    fireEvent.changeText(addressLine2Input, 'Apt 111');

    const cityInput = getByTestId('city');
    fireEvent.changeText(cityInput, 'Oakland');

    const stateInput = getByTestId('state');
    fireEvent.changeText(stateInput, 'CA');

    const submitButton = getByText(strings.signUp.continue);
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockNavigation.navigate).toBeCalledTimes(0);
    });
  });

  it('should match snapshot', async () => {
    const { toJSON } = render(
      <ComponentWithProviders
        component={SignUpAddressPage}
        params={{
          firstName: 'First',
          lastName: 'Last',
          dateOfBirth: '09/24/1997',
          phoneNumber: '5104831826',
          addressLine1: '123 Main Street',
          addressLine2: 'Apt 111',
        }}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should pre-populate address information passed in params', async () => {
    const { getByTestId } = render(
      <ComponentWithProviders
        component={SignUpAddressPage}
        params={{
          firstName: 'First',
          lastName: 'Last',
          dateOfBirth: '09/24/1997',
          phoneNumber: '5104831826',
          addressLine1: '123 Main Street',
          city: 'Oakland',
          state: 'CA',
          zipCode: '94501',
        }}
      />
    );

    const addressLine1Input = await getByTestId('addressLine1');
    expect(addressLine1Input.props.value).toEqual('123 Main Street');

    const cityInput = await getByTestId('city');
    expect(cityInput.props.value).toEqual('Oakland');

    const stateInput = await getByTestId('state');
    expect(stateInput.props.value).toEqual('CA');

    const zipCodeInput = await getByTestId('zipCode');
    expect(zipCodeInput.props.value).toEqual('94501');
  });
});
