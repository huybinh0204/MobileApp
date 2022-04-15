import { render } from '@testing-library/react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { createStore } from 'redux';
import { EVENTS, OverdraftState } from '_constants';
import { RegisterActions } from '_store/register';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import OverdraftNudge from './OverdraftNudge';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('Overdraft Nudge', () => {
  const mockedDispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockedDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send OVERDRAFT_TEASER_PANEL_OPENED event', () => {
    const mockStore = createStore(rootReducer, {
      account: {
        overdraft: {
          state: OverdraftState.OPT_IN,
        },
      },
    });
    jest.spyOn(RegisterActions, 'trackEvent');

    render(<ComponentWithProviders component={OverdraftNudge} store={mockStore} />);

    expect(RegisterActions.trackEvent).toHaveBeenCalledWith(EVENTS.OVERDRAFT_TEASER_PANEL_OPENED);
  });

  it('should not render anything if overdraft is null', () => {
    const mockStore = createStore(rootReducer, {
      account: {
        overdraft: null,
      },
    });

    const { queryByTestId } = render(
      <ComponentWithProviders component={OverdraftNudge} store={mockStore} />
    );

    expect(queryByTestId('ActiveOverdraftNudge')).toBeNull();
    expect(queryByTestId('InActiveOverdraftNudge')).toBeNull();
  });

  it('should render ActiveOverdraftNudge if overdraft is active', () => {
    const mockStore = createStore(rootReducer, {
      account: {
        overdraft: {
          eligible: true,
          state: OverdraftState.OPT_IN,
        },
      },
    });

    const { queryByTestId } = render(
      <ComponentWithProviders component={OverdraftNudge} store={mockStore} />
    );

    expect(queryByTestId('ActiveOverdraftNudge')).not.toBeNull();
    expect(queryByTestId('OptedOutOverdraftNudge')).toBeNull();
    expect(queryByTestId('InactiveOptedInOverdraftNudge')).toBeNull();
  });

  it('should render OptedOutOverdraftNudge when user is not eligible', () => {
    const mockStore = createStore(rootReducer, {
      account: {
        overdraft: {
          eligible: false,
          state: OverdraftState.OPT_OUT,
        },
      },
    });

    const { queryByTestId } = render(
      <ComponentWithProviders component={OverdraftNudge} store={mockStore} />
    );

    expect(queryByTestId('ActiveOverdraftNudge')).toBeNull();
    expect(queryByTestId('OptedOutOverdraftNudge')).not.toBeNull();
    expect(queryByTestId('InactiveOptedInOverdraftNudge')).toBeNull();
  });

  it('should render InactiveOptedInOverdraftNudge if user is eligible', () => {
    const mockStore = createStore(rootReducer, {
      account: {
        overdraft: {
          eligible: true,
          state: OverdraftState.OPT_OUT,
        },
      },
    });

    const { queryByTestId } = render(
      <ComponentWithProviders component={OverdraftNudge} store={mockStore} />
    );

    expect(queryByTestId('ActiveOverdraftNudge')).toBeNull();
    expect(queryByTestId('OptedOutOverdraftNudge')).toBeNull();
    expect(queryByTestId('InactiveOptedInOverdraftNudge')).not.toBeNull();
  });
});
