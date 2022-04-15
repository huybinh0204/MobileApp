import { useNavigation } from '@react-navigation/native';
import * as Split from '@splitsoftware/splitio-react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { createStore } from 'redux';
import { FEATURE_FLAGS, NAVIGATION } from '_constants';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import UserInfoPage from './UserInfoPage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

const UserInfo = () => (
  <Split.SplitContext.Provider value={{ isReady: true }}>
    <UserInfoPage />
  </Split.SplitContext.Provider>
);

describe('UserInfoPage', () => {
  let mockStore;
  let mockNavigation = navigationMock(jest.fn);

  beforeEach(() => {
    mockStore = createStore(rootReducer, {
      customer: {
        data: {
          firstName: 'Jonh',
          lastName: 'Doe',
          email: 'jonhdoe@gmail.com',
          phoneNumber: '00000',
          addressLine1: 'Test',
          addressLine2: '1111',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '11111',
        },
        updateAddressSuccess: false,
        updateEmailSuccess: false,
        phoneVerificationSuccess: false,
        confirmPhoneVerificationSuccess: false,
        isLoading: false,
      },
    });
    useNavigation.mockReturnValue(mockNavigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot with edit email disabled', () => {
    jest.spyOn(Split, 'useClient').mockImplementation(() => ({
      getTreatment(flag) {
        return flag === FEATURE_FLAGS.CHANGE_EMAIL ? 'off' : 'on';
      },
    }));

    const { toJSON } = render(<ComponentWithProviders component={UserInfo} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should match the snapshot with edit phone number disabled', () => {
    jest.spyOn(Split, 'useClient').mockImplementation(() => ({
      getTreatment(flag) {
        return flag === FEATURE_FLAGS.CHANGE_PHONE ? 'off' : 'on';
      },
    }));

    const { toJSON } = render(<ComponentWithProviders component={UserInfo} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should navigate to the update address page on edit mode', async () => {
    jest.spyOn(Split, 'useClient').mockImplementation(() => ({ getTreatment: () => 'on' }));

    const { getByTestId } = render(
      <ComponentWithProviders component={UserInfo} store={mockStore} />
    );

    const editButton = getByTestId('editAddressButton');

    await waitFor(() => {
      fireEvent.press(editButton);
    });

    expect(mockNavigation.navigate).toBeCalledWith(NAVIGATION.settings.updateAddress, {
      addressLine1: 'Test',
      addressLine2: '1111',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '11111',
    });
  });

  it('should navigate to the update phone number page on edit mode', async () => {
    jest.spyOn(Split, 'useClient').mockImplementation(() => ({ getTreatment: () => 'on' }));

    const { getByTestId } = render(
      <ComponentWithProviders component={UserInfo} store={mockStore} />
    );

    const editButton = getByTestId('editPhoneNumberButton');

    await waitFor(() => {
      fireEvent.press(editButton);
    });

    expect(mockNavigation.navigate).toBeCalledWith(NAVIGATION.shared.phoneNumber, {
      edit: true,
      target: NAVIGATION.settings.userInfo,
    });
  });
});
