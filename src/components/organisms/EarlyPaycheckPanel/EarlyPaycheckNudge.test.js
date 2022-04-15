import { useNavigation } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { EVENTS, NAVIGATION } from '_constants';
import strings from '_localization';
import { RegisterActions } from '_store/register';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import EarlyPaycheckNudge from './EarlyPaycheckNudge';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('Early Paycheck Nudge', () => {
  const mockedDispatch = jest.fn();
  const mockedNavigation = navigationMock(jest.fn);

  beforeEach(() => {
    useDispatch.mockReturnValue(mockedDispatch);
    useNavigation.mockReturnValue(mockedNavigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(<ComponentWithProviders component={EarlyPaycheckNudge} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should navigate to early paycheck when button is clicked', async () => {
    const { getByText } = render(
      <ComponentWithProviders
        component={EarlyPaycheckNudge}
        componentProps={{ testID: 'EarlyPaycheckNudge' }}
      />
    );

    const overdraftPanelButton = getByText(strings.earlyPaycheckNudge.buttonText);

    await waitFor(() => {
      fireEvent.press(overdraftPanelButton);
    });

    expect(mockedNavigation.navigate).toHaveBeenCalledWith(NAVIGATION.shared.earlyPaycheck);
  });

  it('should send EARLY_PAYCHECK_TEASER_PANEL_OPENED event', () => {
    jest.spyOn(RegisterActions, 'trackEvent');

    render(<ComponentWithProviders component={EarlyPaycheckNudge} />);

    expect(RegisterActions.trackEvent).toHaveBeenCalledWith(
      EVENTS.EARLY_PAYCHECK_TEASER_PANEL_OPENED
    );
  });
});
