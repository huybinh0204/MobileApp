import { Dynatrace } from '@dynatrace/react-native-plugin';
import { useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import Share from 'react-native-share';
import { PdfView } from '_components/atoms';
import { SecondaryHeader } from '_components/organisms';
import { ICONS } from '_constants';
import strings from '_localization';
import { cancelDownload, deleteFile, downloadPdf } from '_services/PdfService';
import { Container, HeaderContainer } from './StatementPreviewPage.styles';

const StatementPreviewPage = () => {
  const { params } = useRoute();
  const [filePath, setFilePath] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { url, title } = params;
  const fileName = `${title} Statement.pdf`;

  useEffect(() => {
    const download = downloadPdf({ fileName, url });

    download
      .then((file) => {
        setFilePath(file.path());
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      cancelDownload(download);
    };
  }, [fileName, url, handleError]);

  useEffect(() => {
    return () => {
      if (filePath) {
        deleteFile(filePath);
      }
    };
  }, [filePath]);

  const handleShare = async () => {
    try {
      await Share.open({
        failOnCancel: false,
        type: 'application/pdf',
        url: Platform.select({ android: `file://${filePath}`, ios: filePath }),
      });
    } catch (error) {
      Dynatrace.reportError(`Share Statement Error: ${JSON.stringify(error)}`, 0);
    }
  };

  const handleError = useCallback((error) => {
    Alert.alert(strings.statements.previewError);
    Dynatrace.reportError(`Download Statement Error: ${JSON.stringify(error)}`, 0);
  }, []);

  return (
    <Container>
      <HeaderContainer edges={['top']}>
        <SecondaryHeader
          onRightItemPress={handleShare}
          rightItem={filePath ? ICONS.share : null}
          rightItemTestID="Share-Statement-PDF"
          title={title}
        />
      </HeaderContainer>
      <PdfView
        isLoading={isLoading}
        resource={Platform.select({ android: filePath, ios: fileName })}
        resourceType="file"
        fileFrom="documentsDirectory"
        onError={handleError}
        testID="Statement-PDF"
      />
    </Container>
  );
};

export default StatementPreviewPage;
