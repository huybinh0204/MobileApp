import { useNavigation } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import OverdraftOptInSuccessPage from './OverdraftOptInSuccessPage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('OverdraftOptInSuccessPage', () => {
  const mockedDispatch = jest.fn();
  const mockedNavigation = navigationMock(jest.fn);

  beforeEach(() => {
    useDispatch.mockReturnValue(mockedDispatch);
    useNavigation.mockReturnValue(mockedNavigation);
  });

  it('should match snapshot', () => {
    const { toJSON } = render(<ComponentWithProviders component={OverdraftOptInSuccessPage} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should navigate back to snapshot', () => {
    const { getByTestId } = render(
      <ComponentWithProviders component={OverdraftOptInSuccessPage} />
    );

    const continueButton = getByTestId('overdraftOptInSuccessButton');

    expect(continueButton).toBeEnabled();

    fireEvent.press(continueButton);

    expect(mockedNavigation.popToTop).toHaveBeenCalled();
  });
});
