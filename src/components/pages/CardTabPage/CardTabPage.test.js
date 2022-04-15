import { useNavigation } from '@react-navigation/native';
import * as Split from '@splitsoftware/splitio-react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Linking } from 'react-native';
import ENV from 'react-native-config';
import { useDispatch } from 'react-redux';
import { createStore } from 'redux';
import { DEBIT_CARD_STATUS, EVENTS, EVENT_TYPES, FEATURE_FLAGS, NAVIGATION } from '_constants';
import strings from '_localization/index';
import { RegisterActions } from '_store/register';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import CardTabPage from './CardTabPage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('CardTabPage', () => {
  let mockStore;
  let mockedDispatch = jest.fn();
  let mockedNavigation = navigationMock(jest.fn);

  beforeEach(() => {
    useDispatch.mockReturnValue(mockedDispatch);
    useNavigation.mockReturnValue(mockedNavigation);

    mockStore = createStore(rootReducer, {
      account: {
        kinlyDebitCards: [{ status: DEBIT_CARD_STATUS.READY_TO_ACTIVATE }],
      },
    });

    jest.spyOn(Split, 'useClient').mockImplementation(() => ({
      getTreatment(flag) {
        expect(flag).toEqual(FEATURE_FLAGS.CHANGE_PIN);
        return 'on';
      },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(<ComponentWithProviders component={CardTabPage} store={mockStore} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should display the Page Title', () => {
    const { getByText } = render(
      <ComponentWithProviders component={CardTabPage} store={mockStore} />
    );

    expect(getByText('Card')).not.toBeNull();
  });

  it('should display the card banner', () => {
    const { getByTestId } = render(
      <ComponentWithProviders component={CardTabPage} store={mockStore} />
    );

    expect(getByTestId('CardBanner')).not.toBeNull();
  });

  it('should display a list of pressables with the correct number of items', () => {
    const { queryByTestId, getByTestId, getAllByTestId } = render(
      <ComponentWithProviders component={CardTabPage} store={mockStore} />
    );

    expect(queryByTestId('ActivateCard')).not.toBeNull();
    expect(getByTestId('CardTabList')).not.toBeNull();
    expect(getAllByTestId('ItemTitle')).toHaveLength(5);
  });

  it('should not have a card activation link when the account debit card has been activated', async () => {
    mockStore = createStore(rootReducer, {
      account: {
        kinlyDebitCards: [{ status: DEBIT_CARD_STATUS.ACTIVE }],
      },
    });

    const { queryByTestId } = render(
      <ComponentWithProviders component={CardTabPage} store={mockStore} />
    );

    expect(queryByTestId('ActivateCard')).toBeNull();
  });

  it('should not have a card activation nor change PIN button when there are no debit cards', () => {
    mockStore = createStore(rootReducer, {
      account: {
        kinlyDebitCards: [],
      },
    });

    const { getAllByTestId, queryByTestId } = render(
      <ComponentWithProviders component={CardTabPage} store={mockStore} />
    );

    expect(queryByTestId('ActivateCard')).toBeNull();
    expect(queryByTestId('ChangePIN')).toBeNull();
    expect(getAllByTestId('ItemTitle')).toHaveLength(4);
  });

  it('should open Find ATM link and send event', async () => {
    const linkingSpy = jest.spyOn(Linking, 'openURL');
    const trackEventSpy = jest.spyOn(RegisterActions, 'trackEvent');

    const { getByText } = render(
      <ComponentWithProviders component={CardTabPage} store={mockStore} />
    );

    const findATMButton = getByText('Find ATM');

    await waitFor(() => {
      fireEvent.press(findATMButton);
    });

    expect(linkingSpy).toBeCalledWith(ENV.FIND_ATM_URI);
    expect(trackEventSpy).toHaveBeenCalledWith(EVENTS.FIND_ATM_OPENED, EVENT_TYPES.TRACK);
  });

  it('should open Find Place to Deposit Cash in external browser and send event', async () => {
    const linkingSpy = jest.spyOn(Linking, 'openURL');
    const trackEventSpy = jest.spyOn(RegisterActions, 'trackEvent');

    const { getByText } = render(
      <ComponentWithProviders component={CardTabPage} store={mockStore} />
    );

    const depositCashButton = getByText('Find cash deposit location');

    await waitFor(() => {
      fireEvent.press(depositCashButton);
    });

    expect(linkingSpy).toBeCalledWith(ENV.FIND_PLACE_TO_DEPOSIT_CASH_URI);
    expect(trackEventSpy).toHaveBeenCalledWith(
      EVENTS.FIND_PLACE_TO_DEPOSIT_CASH_OPENED,
      EVENT_TYPES.TRACK
    );
  });

  it('should navigate to Activate Card', async () => {
    const { getByText } = render(
      <ComponentWithProviders component={CardTabPage} store={mockStore} />
    );

    const goActivateCardButton = getByText(strings.cardTab_list_activate_card);

    await waitFor(() => {
      fireEvent.press(goActivateCardButton);
    });

    expect(mockedNavigation.navigate).toBeCalledWith(NAVIGATION.card.activateCard);
  });
});
