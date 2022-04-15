import { useNavigation } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { createStore } from 'redux';
import { NAVIGATION } from '_constants';
import strings from '_localization/index';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import UpdateAddressPage from './UpdateAddressPage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('UpdateAddressPage', () => {
  let mockStore;
  const mockNavigation = navigationMock(jest.fn);

  beforeEach(() => {
    mockStore = createStore(rootReducer, {
      customer: {
        data: {
          addressLine1: '123 Main Street',
          addressLine2: 'Apt 111',
          city: 'Oakland',
          state: 'CA',
          zipCode: '94501',
        },
      },
      auth: {
        credentials: {
          accessToken: 'eyJhbGciOiJSUzIYzZnpabjNoNnSJ9.eyJpc3M',
        },
      },
    });
    useNavigation.mockReturnValue(mockNavigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should trigger the change of screen if the address is correct', async () => {
    const { getByText, getByTestId } = render(
      <ComponentWithProviders component={UpdateAddressPage} store={mockStore} />
    );

    const addressLine1Input = getByTestId('addressLine1');
    fireEvent.changeText(addressLine1Input, '123 Main Street');

    const addressLine2Input = getByTestId('addressLine2');
    fireEvent.changeText(addressLine2Input, 'Apt 111');

    const submitButton = getByText(strings.signUp.continue);
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockNavigation.navigate).toBeCalledWith(NAVIGATION.settings.updateCity, {
        addressLine1: '123 Main Street',
        addressLine2: 'Apt 111',
        changed: true,
      });
    });
  });

  it('should not navigate if addressLine1 is missing', async () => {
    const { getByText, getByTestId } = render(
      <ComponentWithProviders component={UpdateAddressPage} store={mockStore} />
    );

    const addressLine2Input = getByTestId('addressLine2');
    fireEvent.changeText(addressLine2Input, 'Apt 111');

    const submitButton = getByText(strings.signUp.continue);
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockNavigation.navigate).toBeCalledTimes(0);
    });
  });

  it('should match snapshot', () => {
    const { toJSON } = render(
      <ComponentWithProviders component={UpdateAddressPage} store={mockStore} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
