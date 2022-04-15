import { useNavigation } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { NAVIGATION } from '_constants';
import strings from '_localization/index';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import WelcomeToKinlyPage from './WelcomeToKinlyPage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('WelcomeToKinlyPage', () => {
  const mockedNavigation = navigationMock(jest.fn);

  beforeEach(() => {
    useNavigation.mockReturnValue(mockedNavigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const { toJSON } = render(<ComponentWithProviders component={WelcomeToKinlyPage} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should navigate to the Fund screen', async () => {
    const { getByText } = render(<ComponentWithProviders component={WelcomeToKinlyPage} />);

    const continueButton = getByText(strings.signUp.continue);

    await waitFor(() => {
      fireEvent.press(continueButton);
    });

    expect(mockedNavigation.navigate).toBeCalledWith(NAVIGATION.auth.fundChoice);
  });
});
