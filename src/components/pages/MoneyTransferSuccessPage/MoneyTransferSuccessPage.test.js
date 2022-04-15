import { useNavigation } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { TRANSFER_TYPES } from '_constants';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import MoneyTransferSuccessPage from './MoneyTransferSuccessPage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('MoneyTransferSuccessPage', () => {
  let params;
  const mockedDispatch = jest.fn();
  const mockedNavigation = navigationMock(jest.fn);

  beforeEach(() => {
    useDispatch.mockReturnValue(mockedDispatch);
    useNavigation.mockReturnValue(mockedNavigation);

    params = {
      transferAmount: 9.75,
      transferFee: 0.25,
      transferFrom: 'Kinly Account',
      transferTo: 'American Express',
      transferMethod: TRANSFER_TYPES.INSTANT_OUT,
    };
  });

  it('should match snapshot', () => {
    const { toJSON } = render(
      <ComponentWithProviders component={MoneyTransferSuccessPage} params={params} />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should navigate back to snapshot', () => {
    const { getByTestId } = render(
      <ComponentWithProviders component={MoneyTransferSuccessPage} params={params} />
    );

    const continueButton = getByTestId('moneyTransferSuccessButton');

    expect(continueButton).toBeEnabled();

    fireEvent.press(continueButton);

    expect(mockedNavigation.popToTop).toHaveBeenCalled();
  });
});
