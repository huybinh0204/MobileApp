import { useNavigation } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { NAVIGATION } from '_constants';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import SetDebitCardPinInfoPage from './SetDebitCardPinInfoPage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('SetDebitCardPinInfoPage', () => {
  const mockedNavigation = navigationMock(jest.fn);

  beforeEach(() => {
    useNavigation.mockReturnValue(mockedNavigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(<ComponentWithProviders component={SetDebitCardPinInfoPage} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should navigate to the set pin form', async () => {
    const { getByAccessibilityLabel } = render(
      <ComponentWithProviders
        component={SetDebitCardPinInfoPage}
        params={{ isChangePinVariant: false }}
      />
    );

    await waitFor(() => {
      fireEvent.press(getByAccessibilityLabel('Set Debit Card Pin'));
    });

    expect(mockedNavigation.navigate).toBeCalledWith(NAVIGATION.card.setDebitCardPinForm, {
      isChangePinVariant: false,
    });
  });

  it('should goBack when isChangePinVariant is true and back button is pressed', async () => {
    const { getByTestId } = render(
      <ComponentWithProviders
        component={SetDebitCardPinInfoPage}
        params={{ isChangePinVariant: true }}
      />
    );

    const backButton = getByTestId('BackButton');
    await fireEvent.press(backButton);
    expect(mockedNavigation.goBack).toBeCalled();
  });

  it('should popToTop when isChangePinVariant is false and back button is pressed', async () => {
    const { getByTestId } = render(
      <ComponentWithProviders
        component={SetDebitCardPinInfoPage}
        params={{ isChangePinVariant: false }}
      />
    );

    const backButton = getByTestId('BackButton');
    await fireEvent.press(backButton);

    expect(mockedNavigation.popToTop).toBeCalled();
  });
});
