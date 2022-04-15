import { useNavigation } from '@react-navigation/native';
import { render, waitFor } from '@testing-library/react-native';
import React from 'react';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import SetDebitCardPinFormPage from './SetDebitCardPinFormPage';

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

  it('should match the snapshot', async () => {
    const { toJSON } = render(<ComponentWithProviders component={SetDebitCardPinFormPage} />);

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
