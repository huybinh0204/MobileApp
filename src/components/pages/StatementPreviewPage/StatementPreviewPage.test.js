import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Alert } from 'react-native';
import Share from 'react-native-share';
import strings from '_localization';
import { downloadPdf } from '_services/PdfService';
import ComponentWithProviders from '_test/mocks/ComponentWithProviders';
import StatementPreviewPage from './StatementPreviewPage';

jest.mock('_services/PdfService', () => ({
  ...jest.requireActual('_services/PdfService'),
  downloadPdf: jest.fn(),
}));

describe('StatementPreviewPage', () => {
  let params;

  beforeEach(() => {
    downloadPdf.mockResolvedValue({ path: jest.fn(() => 'pdfPath') });
    params = {
      url: 'http://www.africau.edu/images/default/sample.pdf',
      title: 'May 2021',
    };
  });

  it('should match snapshot', async () => {
    const { findByTestId, toJSON } = render(
      <ComponentWithProviders component={StatementPreviewPage} params={params} />
    );

    await findByTestId('Statement-PDF');

    expect(toJSON()).toMatchSnapshot();
  });

  it('should show an Alert if there is error loading the pdf', async () => {
    jest.spyOn(Alert, 'alert');

    downloadPdf.mockRejectedValue({ message: 'Error downloading the PDF' });

    render(<ComponentWithProviders component={StatementPreviewPage} params={params} />);

    await waitFor(() => {
      expect(Alert.alert).toBeCalledWith(strings.statements.previewError);
    });
  });

  it('should share the pdf when the share button is clicked', async () => {
    jest.spyOn(Share, 'open');

    const { findByTestId } = render(
      <ComponentWithProviders component={StatementPreviewPage} params={params} />
    );

    const shareButton = await findByTestId('Share-Statement-PDF');

    fireEvent.press(shareButton);

    expect(Share.open).toBeCalledWith({
      failOnCancel: false,
      type: 'application/pdf',
      url: 'pdfPath',
    });
  });
});
