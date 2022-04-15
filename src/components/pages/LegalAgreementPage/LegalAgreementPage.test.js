import { useNavigation } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import strings from '_localization/index';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import LegalAgreementPage from './LegalAgreementPage';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('LegalAgreementPage', () => {
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
    const { toJSON } = render(<ComponentWithProviders component={LegalAgreementPage} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should not enable the continue button if both checkboxes are not marked', async () => {
    const { getByText } = render(<ComponentWithProviders component={LegalAgreementPage} />);

    const continueButton = getByText(strings.submit);

    await waitFor(() => {
      fireEvent.press(continueButton);
    });

    expect(mockedNavigation.navigate).toBeCalledTimes(0);
  });
});
