import { useNavigation } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import Share from 'react-native-share';
import { useDispatch } from 'react-redux';
import { createStore } from 'redux';
import { downloadPdf } from '_services/PdfService';
import { AccountActions } from '_store/account';
import { AuthenticationActions } from '_store/authentication';
import rootReducer from '_store/rootReducer';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import { navigationMock } from '_test/mocks/navigation';
import DirectDepositFormViewPage from './DirectDepositFormViewPage';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('_services/PdfService', () => ({
  ...jest.requireActual('_services/PdfService'),
  downloadPdf: jest.fn(),
}));

describe('DirectDepositFormViewPage', () => {
  let mockStore;
  let mockDispatch = jest.fn();
  let mockNavigation = navigationMock(jest.fn);

  beforeEach(() => {
    downloadPdf.mockResolvedValue({ path: jest.fn(() => 'pdfPath') });
    useDispatch.mockReturnValue(mockDispatch);
    useNavigation.mockReturnValue(mockNavigation);
    mockStore = createStore(rootReducer, {
      auth: {
        isSignIn: true,
        credentials: {
          accessToken: 'kjfnejkfnbjfrk',
        },
      },
    });
  });

  it('should match snapshot', async () => {
    const { findByTestId, toJSON } = render(
      <ComponentWithProviders component={DirectDepositFormViewPage} store={mockStore} />
    );

    await findByTestId('Direct-Deposit-PDF');

    expect(toJSON()).toMatchSnapshot();
  });

  it('should share the pdf when the share button is clicked', async () => {
    const { findByTestId } = render(
      <ComponentWithProviders component={DirectDepositFormViewPage} store={mockStore} />
    );

    const shareButton = await findByTestId('Share-Direct-Deposit-Form');

    fireEvent.press(shareButton);

    expect(Share.open).toBeCalledWith({
      failOnCancel: false,
      type: 'application/pdf',
      url: 'pdfPath',
    });
  });

  it('should navigate to the home screen after sharing the pdf if the users is not loged in', async () => {
    mockStore = createStore(rootReducer, {
      auth: {
        isSignIn: false,
        credentials: {
          accessToken: 'kjfnejkfnbjfrk',
        },
      },
    });

    const { findByTestId } = render(
      <ComponentWithProviders component={DirectDepositFormViewPage} store={mockStore} />
    );

    const shareButton = await findByTestId('Share-Direct-Deposit-Form');

    await fireEvent.press(shareButton);

    expect(mockDispatch).toHaveBeenCalledWith(AuthenticationActions.setIsSignIn(true));
  });

  it('should navigate back and show an error toast if there is error loading the pdf', async () => {
    downloadPdf.mockRejectedValue({ message: 'Error downloading the PDF' });

    render(<ComponentWithProviders component={DirectDepositFormViewPage} />);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(AccountActions.setDirectDepositFormError(true));
      expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);
    });
  });
});
