import { useNavigation } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { createStore } from 'redux';
import strings from '_localization/index';
import { CustomerActions } from '_store/customer';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import UpdateCityPage from './UpdateCityPage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('UpdateCityPage', () => {
  let mockStore;
  let mockDispatch = jest.fn();
  let mockNavigation = navigationMock(jest.fn);
  const params = {
    addressLine1: '123 Main Street',
    addressLine2: 'Apt 1111',
    city: 'Oakland',
    state: 'CA',
    zipCode: '94501',
  };

  beforeEach(() => {
    mockStore = createStore(rootReducer, { customer: { externalId: 'customerExternalId' } });
    useDispatch.mockReturnValue(mockDispatch);
    useNavigation.mockReturnValue(mockNavigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update the address when the user make changes', async () => {
    const { getByText, getByTestId } = render(
      <ComponentWithProviders component={UpdateCityPage} store={mockStore} params={params} />
    );

    const cityInput = getByTestId('city');
    fireEvent.changeText(cityInput, 'San Jose');

    const submitButton = getByText(strings.signUp.continue);
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockDispatch).toBeCalledWith(
        CustomerActions.updateAddress('customerExternalId', {
          addressLine1: '123 Main Street',
          addressLine2: 'Apt 1111',
          city: 'San Jose',
          state: 'CA',
          zipCode: '94501',
        })
      );
    });
  });

  it('should not enable the submit button when some field is missing', async () => {
    const { getByText, getByTestId } = render(
      <ComponentWithProviders component={UpdateCityPage} store={mockStore} params={params} />
    );

    const cityInput = getByTestId('city');
    fireEvent.changeText(cityInput, '');

    const submitButton = getByText(strings.signUp.continue);
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockDispatch).toBeCalledTimes(0);
    });
  });

  it('should match snapshot', () => {
    const { toJSON } = render(
      <ComponentWithProviders component={UpdateCityPage} store={mockStore} params={params} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
