import { Dynatrace } from '@dynatrace/react-native-plugin';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import ENV from 'react-native-config';
import Share from 'react-native-share';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { PdfView } from '_components/atoms';
import { SecondaryHeader } from '_components/organisms';
import { ICONS } from '_constants';
import strings from '_localization/index';
import { cancelDownload, deleteFile, downloadPdf } from '_services/PdfService';
import { AccountActions, AccountSelectors } from '_store/account';
import { AuthenticationActions, AuthenticationSelectors } from '_store/authentication';
import { Container, HeaderContainer } from './DirectDepositFormViewPage.styles';

const DirectDepositFormViewPage = () => {
  const dispatch = useDispatch();
  const { goBack } = useNavigation();

  const credentials = useSelector(AuthenticationSelectors.getCredentials);
  const externalId = useSelector(AccountSelectors.getExternalId);
  const isSignIn = useSelector(AuthenticationSelectors.getIsSignIn);

  const [filePath, setFilePath] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const accessToken = credentials?.accessToken ?? null;
  const fileName = 'Direct Deposit Form.pdf';

  useEffect(() => {
    const download = downloadPdf({
      fileName,
      url: `${ENV.EXPERIENCE_LAYER_BASE_URL}${ENV.EXPERIENCE_LAYER_URIS_ACCOUNTS}/${externalId}/directDepositForm`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'idempotency-key': uuid(),
      },
    });

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
  }, [accessToken, externalId, handleError]);

  useEffect(() => {
    return () => {
      if (filePath) {
        deleteFile(filePath);
      }
    };
  }, [filePath]);

  const handleShare = async () => {
    try {
      const { dismissedAction } = await Share.open({
        failOnCancel: false,
        type: 'application/pdf',
        url: Platform.select({ android: `file://${filePath}`, ios: filePath }),
      });

      if (!isSignIn && !dismissedAction) {
        dispatch(AuthenticationActions.setIsSignIn(true));
      }
    } catch (e) {
      Dynatrace.reportError(`Share Direct Deposit Form Error: ${JSON.stringify(e)}`, 0);
    }
  };

  const handleError = useCallback(
    (error) => {
      Dynatrace.reportError(`Download Direct Deposit Form Error: ${JSON.stringify(error)}`, 0);
      dispatch(AccountActions.setDirectDepositFormError(true));
      goBack();
    },
    [dispatch, goBack]
  );

  return (
    <Container>
      <HeaderContainer edges={['top']}>
        <SecondaryHeader
          title={strings.directDepositFormView_title}
          onRightItemPress={handleShare}
          rightItem={filePath ? ICONS.share : null}
          rightItemTestID="Share-Direct-Deposit-Form"
        />
      </HeaderContainer>
      <PdfView
        isLoading={isLoading}
        resource={Platform.OS === 'ios' ? fileName : filePath}
        resourceType="file"
        fileFrom="documentsDirectory"
        onError={handleError}
        testID="Direct-Deposit-PDF"
      />
    </Container>
  );
};

export default DirectDepositFormViewPage;
