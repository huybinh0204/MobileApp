import { useNavigation } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import SignUpAddressSuggestionPage from './SignUpAddressSuggestionPage';
import { useDispatch } from 'react-redux';
import { CustomerActions } from '_store/customer';
import { createStore } from 'redux';
import rootReducer from '_store/rootReducer';
import { NAVIGATION } from '_constants';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('SignUpAddressSuggestionPage', () => {
  let mockNavigation = navigationMock(jest.fn);
  let mockDispatch;

  beforeEach(() => {
    useNavigation.mockReturnValue(mockNavigation);
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch address suggestions when typed in address input field', () => {
    const { getByTestId } = render(
      <ComponentWithProviders
        component={SignUpAddressSuggestionPage}
        params={{
          firstName: 'First',
          lastName: 'Last',
          dateOfBirth: '09/24/1997',
          phoneNumber: '5104831826',
        }}
      />
    );

    const addressInput = getByTestId('address');
    fireEvent.changeText(addressInput, '123');

    expect(mockDispatch).toBeCalledWith(CustomerActions.getSuggestedAddresses('123'));
  });

  it('should display the suggested addresses', () => {
    const mockStore = createStore(rootReducer, {
      customer: {
        suggestedAddresses: [
          {
            addressLine1: '123 Main St',
            city: 'San Francisco',
            state: 'CA',
            zipCode: '94105',
          },
          {
            addressLine1: '456 Main St',
            city: 'San Francisco',
            state: 'CA',
            zipCode: '94105',
          },
        ],
      },
    });
    const { getByTestId } = render(
      <ComponentWithProviders
        component={SignUpAddressSuggestionPage}
        params={{
          firstName: 'First',
          lastName: 'Last',
          dateOfBirth: '09/24/1997',
          phoneNumber: '5104831826',
        }}
        store={mockStore}
      />
    );

    expect(getByTestId('123 Main St, San Francisco, CA, 94105')).toBeTruthy();
    expect(getByTestId('456 Main St, San Francisco, CA, 94105')).toBeTruthy();
  });

  it('should navigate to address screen when a suggested address is pressed', async () => {
    const mockStore = createStore(rootReducer, {
      customer: {
        suggestedAddresses: [
          {
            addressLine1: '123 Main St',
            city: 'San Francisco',
            state: 'CA',
            zipCode: '94105',
          },
        ],
      },
    });
    const { getByTestId } = render(
      <ComponentWithProviders
        component={SignUpAddressSuggestionPage}
        params={{
          firstName: 'First',
          lastName: 'Last',
          dateOfBirth: '09/24/1997',
          phoneNumber: '5104831826',
        }}
        store={mockStore}
      />
    );

    fireEvent.press(getByTestId('123 Main St, San Francisco, CA, 94105'));

    await waitFor(() => {
      expect(mockNavigation.navigate).toBeCalledWith(NAVIGATION.auth.signUpAddress, {
        firstName: 'First',
        lastName: 'Last',
        dateOfBirth: '09/24/1997',
        phoneNumber: '5104831826',
        addressLine1: '123 Main St',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94105',
      });
    });
  });

  it('should match snapshot', () => {
    const { toJSON } = render(
      <ComponentWithProviders
        component={SignUpAddressSuggestionPage}
        params={{
          firstName: 'First',
          lastName: 'Last',
          dateOfBirth: '09/24/1997',
          phoneNumber: '5104831826',
        }}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
