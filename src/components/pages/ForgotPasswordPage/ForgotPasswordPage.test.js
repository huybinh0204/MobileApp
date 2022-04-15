import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { createStore } from 'redux';
import { AuthenticationActions } from '_store/authentication';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import ForgotPasswordPage from './ForgotPasswordPage';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('ForgotPasswordPage', () => {
  let mockStore;
  const mockedDispatch = jest.fn();

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

  it('should match the snapshot', () => {
    const { toJSON } = render(
      <ComponentWithProviders component={ForgotPasswordPage} store={mockStore} />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should trigger the reset password flow with a valid email', async () => {
    const { getByTestId } = render(
      <ComponentWithProviders component={ForgotPasswordPage} store={mockStore} />
    );

    const email = 'user@lendup.com';

    const emailInput = getByTestId('emailInput');
    const resetPasswordButton = getByTestId('resetPasswordButton');

    fireEvent.changeText(emailInput, email);

    await waitFor(() => {
      fireEvent.press(resetPasswordButton);
    });

    expect(mockedDispatch).toHaveBeenCalledWith(AuthenticationActions.resetPassword(email));
  });
});
