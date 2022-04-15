import { useNavigation } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { NAVIGATION } from '_constants';
import strings from '_localization';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import OptedOutOverdraftNudge from './OptedOutOverdraftNudge';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('OptedOut Overdraft Protection Nudge', () => {
  const mockedNavigation = navigationMock(jest.fn);

  beforeEach(() => {
    useNavigation.mockReturnValue(mockedNavigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(<ComponentWithProviders component={OptedOutOverdraftNudge} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should navigate to overdraft legal agreement when button is clicked', async () => {
    const { getByText } = render(
      <ComponentWithProviders
        component={OptedOutOverdraftNudge}
        componentProps={{ testID: 'OverdraftProtectionNudge' }}
      />
    );

    const overdraftProtectionButton = getByText(strings.overdraft.nudge.optedOut.buttonText);

    await waitFor(() => {
      fireEvent.press(overdraftProtectionButton);
    });

    expect(mockedNavigation.navigate).toHaveBeenCalledWith(NAVIGATION.shared.overdraftSell);
  });
});
