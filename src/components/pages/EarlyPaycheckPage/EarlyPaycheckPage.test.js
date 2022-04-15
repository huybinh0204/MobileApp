import { useNavigation } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { createStore } from 'redux';
import { NAVIGATION } from '_constants';
import strings from '_localization';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import EarlyPaycheckPage from './EarlyPaycheckPage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('EarlyPaycheckPage', () => {
  const mockedDispatch = jest.fn();
  const mockedNavigation = navigationMock(jest.fn);

  beforeEach(() => {
    useDispatch.mockReturnValue(mockedDispatch);
    useNavigation.mockReturnValue(mockedNavigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const { toJSON } = render(<ComponentWithProviders component={EarlyPaycheckPage} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should navigate to the direct deposit form view', () => {
    const mockStore = createStore(rootReducer, {
      account: {
        directDepositFormError: false,
      },
    });

    const { getByTestId, getByText } = render(
      <ComponentWithProviders store={mockStore} component={EarlyPaycheckPage} />
    );

    const directDepositButton = getByText(strings.earlyPaycheck.setUpDirectDeposit);
    fireEvent.press(directDepositButton);

    const formButton = getByTestId('earlyPaycheckGetFormButton');
    fireEvent.press(formButton);

    expect(mockedNavigation.navigate).toHaveBeenCalledWith(NAVIGATION.shared.directDepositFormView);
  });

  it('should show toast error if fetch form fails', () => {
    const mockStore = createStore(rootReducer, {
      account: {
        directDepositFormError: true,
      },
    });

    const { getByTestId } = render(
      <ComponentWithProviders store={mockStore} component={EarlyPaycheckPage} />
    );

    const toast = getByTestId('earlyPaycheckPageToastError');

    expect(toast).not.toBeNull();
  });
});
