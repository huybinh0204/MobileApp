import styled from '@emotion/native';
import PdfView from 'react-native-view-pdf';

export const SpinnerContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.beta50,
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledPdfView = styled(PdfView)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.beta50,
}));
