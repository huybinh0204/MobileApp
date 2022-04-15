import { useNavigation } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { createStore } from 'redux';
import { EVENTS, EVENT_TYPES, OverdraftState } from '_constants';
import { RegisterActions } from '_store/register';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import OverdraftProtectionToggle from './OverdraftProtectionToggle';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('OverdraftProtectionToggle', () => {
  let mockStore;
  let mockDispatch = jest.fn();
  let mockNavigation = navigationMock(jest.fn);

  beforeEach(() => {
    mockStore = createStore(rootReducer, {
      account: {
        externalId: 'd9be3a12-1909-459c-91dd-80be2dce1353',
        overdraft: {
          state: OverdraftState.OPT_OUT,
          eligible: true,
        },
      },
    });
    useDispatch.mockReturnValue(mockDispatch);
    useNavigation.mockReturnValue(mockNavigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    const { toJSON } = render(
      <ComponentWithProviders store={mockStore} component={OverdraftProtectionToggle} />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should opt in', () => {
    const { getByTestId } = render(
      <ComponentWithProviders store={mockStore} component={OverdraftProtectionToggle} />
    );

    const overdraftSwitch = getByTestId('overdraf-protection-switch');
    fireEvent(overdraftSwitch, 'onValueChange', true);

    expect(mockDispatch).toHaveBeenCalledWith(
      RegisterActions.trackEvent(
        EVENTS.OVERDRAFT_PROTECTION_OPT_IN_CONFIRMATION_OPENED,
        EVENT_TYPES.TRACK
      )
    );
  });

  it('should opt out', () => {
    mockStore = createStore(rootReducer, {
      account: {
        externalId: 'd9be3a12-1909-459c-91dd-80be2dce1353',
        overdraft: {
          state: OverdraftState.OPT_IN,
          eligible: true,
        },
      },
    });

    const { getByTestId } = render(
      <ComponentWithProviders store={mockStore} component={OverdraftProtectionToggle} />
    );

    const overdraftSwitch = getByTestId('overdraf-protection-switch');
    fireEvent(overdraftSwitch, 'onValueChange', false);

    expect(mockDispatch).toHaveBeenCalledWith(
      RegisterActions.trackEvent(
        EVENTS.OVERDRAFT_PROTECTION_OPT_OUT_CONFIRMATION_OPENED,
        EVENT_TYPES.TRACK
      )
    );
  });
});
