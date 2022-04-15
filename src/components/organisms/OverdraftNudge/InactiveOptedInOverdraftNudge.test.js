import { useNavigation } from '@react-navigation/native';
import { fireEvent, getDefaultNormalizer, render } from '@testing-library/react-native';
import React from 'react';
import { createStore } from 'redux';
import { NAVIGATION, OverdraftState, OverdraftStatus } from '_constants';
import strings from '_localization';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import InactiveOptedInOverdraftNudge from './InactiveOptedInOverdraftNudge';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('InactiveOptedInOverdraftNudge', () => {
  let mockStore;
  let mockNavigation = navigationMock(jest.fn);

  beforeEach(() => {
    useNavigation.mockReturnValue(mockNavigation);
    mockStore = createStore(rootReducer, {
      account: {
        overdraft: {
          status: OverdraftStatus.ACTIVE,
          state: OverdraftState.OPT_OUT,
        },
      },
    });
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(
      <ComponentWithProviders component={InactiveOptedInOverdraftNudge} store={mockStore} />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render the right content', () => {
    const { getByText } = render(
      <ComponentWithProviders component={InactiveOptedInOverdraftNudge} store={mockStore} />
    );

    const title = getByText(strings.overdraft.nudge.inactiveOptedIn.header.title, {
      normalizer: getDefaultNormalizer({ collapseWhitespace: false }),
    });

    const description = getByText(strings.overdraft.nudge.inactiveOptedIn.header.description);

    expect(title).not.toBeNull();
    expect(description).not.toBeNull();
  });

  it('should navigate to overdraft sell page when button is clicked', () => {
    const { getByText } = render(
      <ComponentWithProviders component={InactiveOptedInOverdraftNudge} store={mockStore} />
    );

    const button = getByText(strings.overdraft.nudge.inactiveOptedIn.buttonText);
    fireEvent.press(button);

    expect(mockNavigation.navigate).toBeCalledWith(NAVIGATION.shared.overdraftLegalAgreement);
  });
});
