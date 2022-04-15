import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { createStore } from 'redux';
import strings from '_localization/index';
import { AuthenticationActions } from '_store/authentication/authentication_reducer';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import ChangePasswordPage from './ChangePasswordPage';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('ChangePasswordPage', () => {
  let mockStore;
  let mockedDispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockedDispatch);
    mockStore = createStore(rootReducer, {
      customer: {
        data: {
          email: 'user@lendup.com',
        },
      },
      auth: {
        resetPasswordSuccess: true,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const { toJSON } = render(
      <ComponentWithProviders component={ChangePasswordPage} store={mockStore} />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should trigger the change password flow when change password button is pressed', async () => {
    const { getByText } = render(
      <ComponentWithProviders component={ChangePasswordPage} store={mockStore} />
    );

    const changePasswordButton = getByText(strings.changePassword.button);

    await waitFor(() => {
      fireEvent.press(changePasswordButton);
    });

    expect(mockedDispatch).toHaveBeenCalledWith(
      AuthenticationActions.resetPassword('user@lendup.com')
    );
  });
});
