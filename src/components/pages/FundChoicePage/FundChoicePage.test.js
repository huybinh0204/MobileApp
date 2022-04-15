import { useNavigation } from '@react-navigation/native';
import * as Split from '@splitsoftware/splitio-react';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NAVIGATION } from '_constants';
import strings from '_localization/index';
import { AuthenticationActions } from '_store/authentication';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import FundChoicePage from './FundChoicePage';

const FundChoise = () => (
  <Split.SplitContext.Provider value={{ isReady: true }}>
    <FundChoicePage />
  </Split.SplitContext.Provider>
);

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('FundChoicePage', () => {
  const mockDispatch = jest.fn();
  const mockNavigation = navigationMock(jest.fn);

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useNavigation.mockReturnValue(mockNavigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    jest.spyOn(Split, 'useClient').mockReturnValue({
      getTreatment: () => 'on',
    });

    const { toJSON } = render(<ComponentWithProviders component={FundChoise} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should navigate to the home tab when skip button is clicked', () => {
    const { getByText } = render(<ComponentWithProviders component={FundChoise} />);

    const skipButton = getByText(strings.signUp.fund.skipButton);

    fireEvent.press(skipButton);

    expect(mockDispatch).toHaveBeenCalledWith(AuthenticationActions.setIsSignIn(true));
  });

  it('should navigate to direct deposit info page', () => {
    const { getByText } = render(<ComponentWithProviders component={FundChoise} />);

    const directDepositButton = getByText(strings.signUp.fund.directDeposit);

    fireEvent.press(directDepositButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith(NAVIGATION.shared.earlyPaycheck);
  });

  it('should navigate to fund amount from external bank page when ACH In is enabled', () => {
    jest.spyOn(Split, 'useClient').mockReturnValue({
      getTreatment: () => 'on',
    });

    const { getByText } = render(<ComponentWithProviders component={FundChoise} />);

    const addMoney = getByText(strings.signUp.fund.bankTransfer);

    fireEvent.press(addMoney);

    expect(mockNavigation.navigate).toHaveBeenCalledWith(NAVIGATION.shared.addMoney);
  });

  it('should not show the transfer from external bank option when ACH In is disabled', () => {
    jest.spyOn(Split, 'useClient').mockReturnValue({
      getTreatment: () => 'off',
    });

    const { queryByText } = render(<ComponentWithProviders component={FundChoise} />);

    const achInOption = queryByText(strings.signUp.fund.bankTransfer);

    expect(achInOption).toBeNull();
  });

  it('should navigate to deposit cash page', () => {
    const { getByText } = render(<ComponentWithProviders component={FundChoise} />);

    const depositCash = getByText(strings.signUp.fund.depositCash);

    fireEvent.press(depositCash);

    expect(mockNavigation.navigate).toHaveBeenCalledWith(NAVIGATION.auth.depositCash);
  });
});
