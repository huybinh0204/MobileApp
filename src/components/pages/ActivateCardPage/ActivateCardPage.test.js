import { useNavigation } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { NAVIGATION } from '_constants';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import ActivateCardPage from './ActivateCardPage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('ActivateCardPage', () => {
  const mockedNavigation = navigationMock(jest.fn);

  beforeEach(() => {
    useNavigation.mockReturnValue(mockedNavigation);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(<ComponentWithProviders component={ActivateCardPage} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should navigate to ActivateCardExpDate flow screen when the button is clicked', async () => {
    const { getByTestId } = render(<ComponentWithProviders component={ActivateCardPage} />);

    await waitFor(() => {
      fireEvent.press(getByTestId('goToExpirationDateScreen'));
    });

    expect(mockedNavigation.navigate).toHaveBeenCalledWith(NAVIGATION.card.securityCheck);
  });
});
