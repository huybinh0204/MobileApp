import { useNavigation } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import SetDebitCardPinSuccessPage from './SetDebitCardPinSuccessPage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('SetDebitCardPinSuccessPage', () => {
  const mockedNavigation = navigationMock(jest.fn);

  beforeEach(() => {
    useNavigation.mockReturnValue(mockedNavigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', async () => {
    const { toJSON } = render(<ComponentWithProviders component={SetDebitCardPinSuccessPage} />);

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('should navigate to the card tab main screen', async () => {
    const { getByAccessibilityLabel } = render(
      <ComponentWithProviders component={SetDebitCardPinSuccessPage} />
    );

    const goToTop = getByAccessibilityLabel('Go To Card Tab');

    await fireEvent.press(goToTop);

    expect(mockedNavigation.popToTop).toBeCalledTimes(1);
  });
});
