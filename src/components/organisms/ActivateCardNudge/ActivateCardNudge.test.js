import { useNavigation } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { EVENTS, NAVIGATION } from '_constants';
import strings from '_localization';
import { RegisterActions } from '_store/register';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import ActivateCardNudge from './ActivateCardNudge';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('ActivateCardNudge', () => {
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
    const { toJSON } = render(<ComponentWithProviders component={ActivateCardNudge} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should navigate to card activation flow screen when the nudge is pressed', async () => {
    const { getByText } = render(
      <ComponentWithProviders
        component={ActivateCardNudge}
        componentProps={{ testID: 'ActivateCardNudge' }}
      />
    );

    const activateCardButton = getByText(strings.activateCardNudge.buttonText);

    await waitFor(() => {
      fireEvent.press(activateCardButton);
    });

    expect(mockedNavigation.navigate).toHaveBeenCalledWith(NAVIGATION.card.activateCard);
  });

  it('should send ACTIVATE_CARD_NUDGE_OPENED event', () => {
    const trackEventSpy = jest.spyOn(RegisterActions, 'trackEvent');

    render(<ComponentWithProviders component={ActivateCardNudge} />);

    expect(trackEventSpy).toHaveBeenCalledWith(EVENTS.ACTIVATE_CARD_NUDGE_OPENED);
  });
});
