import { useNavigation } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import * as ReactRedux from 'react-redux';
import strings from '_localization/index';
import { AuthenticationActions } from '_store/authentication';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import SignUpMailVerificationPage from './SignUpMailVerificationPage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

const dispatch = jest.fn();
jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(dispatch);

describe('SignUpMailVerificationPage', () => {
  const mockedNavigation = navigationMock(jest.fn);

  beforeEach(() => {
    useNavigation.mockReturnValue(mockedNavigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const { toJSON } = render(<ComponentWithProviders component={SignUpMailVerificationPage} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should disptach action to fetch current user data', async () => {
    const { getByText } = render(<ComponentWithProviders component={SignUpMailVerificationPage} />);

    const continueButton = getByText(strings.signUp.continue);

    await waitFor(() => {
      fireEvent.press(continueButton);
    });

    expect(dispatch).toHaveBeenCalledWith(AuthenticationActions.fetchCurrentUserData());
  });
});
