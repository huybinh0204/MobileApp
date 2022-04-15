import { useNavigation } from '@react-navigation/native';
import { SplitContext, useClient } from '@splitsoftware/splitio-react';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { NAVIGATION } from '_constants';
import strings from '_localization/index';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import WelcomePage from './WelcomePage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('@splitsoftware/splitio-react', () => ({
  ...jest.requireActual('@splitsoftware/splitio-react'),
  useClient: jest.fn(),
}));

const Welcome = () => (
  <SplitContext.Provider value={{ isReady: true }}>
    <WelcomePage />
  </SplitContext.Provider>
);

describe('WelcomePage', () => {
  const mockNavigation = navigationMock(jest.fn);

  beforeEach(() => {
    useNavigation.mockReturnValue(mockNavigation);
    useClient.mockReturnValue({ getTreatment: (flag) => 'on' });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(<ComponentWithProviders component={Welcome} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render carousel data', () => {
    const { getAllByTestId } = render(<ComponentWithProviders component={Welcome} />);

    expect(getAllByTestId('slide-1')).not.toBeNull();
    expect(getAllByTestId('slide-2')).not.toBeNull();
    expect(getAllByTestId('slide-3')).not.toBeNull();
  });

  it('should render sign in and apply now buttons', () => {
    const { getByText } = render(<ComponentWithProviders component={Welcome} />);

    expect(getByText(strings.welcome.signInButtonLabel)).not.toBeNull();
    expect(getByText(strings.welcome.signUpButtonLabel)).not.toBeNull();
  });

  it('should navigate to sign in page when universal login is disabled and the sign in button is clicked', () => {
    useClient.mockReturnValue({ getTreatment: (flag) => 'off' });

    const { getByText } = render(<ComponentWithProviders component={Welcome} />);

    const signInButton = getByText(strings.welcome.signInButtonLabel);
    fireEvent.press(signInButton);

    expect(mockNavigation.navigate).toBeCalledWith(NAVIGATION.auth.signIn);
  });

  it('should navigate to sign up page when universal login is disabled and the apply now button is clicked', () => {
    useClient.mockReturnValue({ getTreatment: (flag) => 'off' });

    const { getByText } = render(<ComponentWithProviders component={Welcome} />);

    const signUpButton = getByText(strings.welcome.signUpButtonLabel);
    fireEvent.press(signUpButton);

    expect(mockNavigation.navigate).toBeCalledWith(NAVIGATION.auth.signUpMail);
  });
});
