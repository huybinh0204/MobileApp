import { useNavigation } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import React from 'react';
import { createStore } from 'redux';
import { DEBIT_CARD_STATUS } from '_constants';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import HomePage from './HomeTabPage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('HomeTabPage', () => {
  let mockStore;
  let mockedNavigation = navigationMock(jest.fn);

  beforeEach(() => {
    useNavigation.mockReturnValue(mockedNavigation);

    mockStore = createStore(rootReducer, {
      account: {
        kinlyDebitCards: [{ status: DEBIT_CARD_STATUS.READY_TO_ACTIVATE }],
        accountInfo: {
          balance: 1000.5,
        },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot with overdraft enabled', () => {
    const { toJSON } = render(<ComponentWithProviders component={HomePage} store={mockStore} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should show the Activate Card Nudge when the account has a debit card ready to activate', () => {
    const { queryByTestId } = render(
      <ComponentWithProviders component={HomePage} store={mockStore} />
    );

    expect(queryByTestId('ActivateCardNudgeComponent')).toBeTruthy();
  });

  it('should NOT show the Activate Card Nudge when the account has no debit cards ready to activate', () => {
    mockStore = createStore(rootReducer, {
      account: {
        kinlyDebitCards: [
          { status: DEBIT_CARD_STATUS.ACTIVE },
          { status: DEBIT_CARD_STATUS.UNKNOWN },
        ],
        accountInfo: {
          balance: 1000.5,
        },
      },
    });

    const { queryByTestId } = render(
      <ComponentWithProviders component={HomePage} store={mockStore} />
    );

    expect(queryByTestId('ActivateCardNudgeComponent')).toBeNull();
  });

  it('should still render the main page even if kinlyDebitCards is not present', () => {
    mockStore = createStore(rootReducer, {
      account: {
        kinlyDebitCards: [],
        accountInfo: {
          balance: 1000.5,
        },
      },
    });

    const { queryByTestId } = render(
      <ComponentWithProviders component={HomePage} store={mockStore} />
    );

    expect(queryByTestId('HomeTabPage')).toBeTruthy();
  });
});
