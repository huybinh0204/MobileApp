import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { SpinnerContainer, StyledPdfView } from './PdfView.styles';

/**
 * On iOS the "fileFrom" prop defines the file directory
 * which means that the "resource" prop must be the name of the file.
 * Whereas in Android, "fileFrom" is ignored, so "resource" must be the full path to the file.
 *
 * @example
 * resource={Platform.select({ android: filePath, ios: fileName })}
 * resourceType="file"
 * fileFrom="documentsDirectory"
 */
const PdfView = ({ isLoading, ...pdfViewProps }) => {
  const { colors } = useTheme();

  return isLoading ? (
    <SpinnerContainer>
      <ActivityIndicator size="large" color={colors.alpha500} />
    </SpinnerContainer>
  ) : (
    <StyledPdfView {...pdfViewProps} />
  );
};

PdfView.propTypes = {
  isLoading: PropTypes.bool,
};

export default PdfView;
