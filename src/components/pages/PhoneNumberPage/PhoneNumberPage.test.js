import { useNavigation } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import * as ReactRedux from 'react-redux';
import { createStore } from 'redux';
import { NAVIGATION } from '_constants';
import strings from '_localization/index';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import PhoneNumberPage from './PhoneNumberPage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

const dispatch = jest.fn();
jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(dispatch);

describe('PhoneNumberPage', () => {
  let mockStore;
  let mockNavigation;
  let params;

  beforeEach(() => {
    params = {
      edit: false,
    };
    mockStore = createStore(rootReducer, {
      customer: {
        externalId: 'identity-unique-id',
        data: {
          phoneNumber: '5104831826',
        },
      },
    });
    mockNavigation = navigationMock(jest.fn);
    useNavigation.mockImplementation(() => mockNavigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Force phone number verification prior Transfer Funds actions', () => {
    it('should dispatch an action if the phone number is correct during', async () => {
      const { getByText } = render(
        <ComponentWithProviders component={PhoneNumberPage} store={mockStore} params={params} />
      );

      const submitButton = getByText(strings.signUp.continue);

      await waitFor(() => {
        fireEvent.press(submitButton);
      });

      expect(dispatch).toBeCalledWith({
        customerExternalId: 'identity-unique-id',
        phoneNumber: '+15104831826',
        type: '@@BE-CUSTOMER/START_PHONE_VERIFICATION',
      });
    });

    it('should trigger the change of screen if the code was requested successfully', async () => {
      mockStore = createStore(rootReducer, {
        customer: {
          externalId: 'identity-unique-id',
          phoneVerificationSuccess: true,
          data: {
            phoneNumber: '5104831826',
          },
        },
      });

      const { getByText } = render(
        <ComponentWithProviders component={PhoneNumberPage} store={mockStore} params={params} />
      );

      const submitButton = getByText(strings.signUp.continue);

      await waitFor(() => {
        fireEvent.press(submitButton);
      });

      expect(mockNavigation.navigate).toBeCalledWith(NAVIGATION.shared.phoneNumberConfirmation, {
        phoneNumber: '5104831826',
        edit: false,
      });
    });
  });

  it('should not navigate if some field is missing', async () => {
    const { getByText } = render(
      <ComponentWithProviders
        component={PhoneNumberPage}
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
        component={PhoneNumberPage}
        store={mockStore}
        params={{ firstName: 'First', lastName: 'Last', dateOfBirth: '09241997' }}
      />
    );

    const phoneNumberInput = getByTestId('phoneNumber');

    fireEvent.changeText(phoneNumberInput, '5104831826');

    expect(toJSON()).toMatchSnapshot();
  });
});
