import { Dynatrace } from '@dynatrace/react-native-plugin';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { ImageTextButtonModal } from '_components/molecules';
import { SecondaryScreenLayout } from '_components/organisms';
import { COLORS, ICONS } from '_constants';
import strings from '_localization';
import { AccountActions, AccountSelectors } from '_store/account';
import { AuthenticationSelectors } from '_store/authentication';
import linkCardForm from './LinkCardFormHtml';
import { CardActivityIndicator, Container, Legend } from './LinkCardPage.styles';

export default function LinkCardPage() {
  const dispatch = useDispatch();
  const { params } = useRoute();
  const { navigate, goBack } = useNavigation();

  const externalId = useSelector(AccountSelectors.getExternalId);
  const credentials = useSelector(AuthenticationSelectors.getCredentials);
  const linkSuccess = useSelector(AccountSelectors.getLinkCardSuccess);
  const linkError = useSelector(AccountSelectors.getLinkCardError);
  const message = linkSuccess ? strings.linkCard.success : linkError;

  const handleSubmit = ({ nativeEvent }) => {
    const { data, status } = JSON.parse(nativeEvent.data);
    if (status === 200) {
      dispatch(AccountActions.linkCard(externalId, data));
    } else {
      dispatch(AccountActions.setLinkCardError(message));
      if (status !== 400) {
        Dynatrace.reportError(`Link Debit Card Error: ${JSON.stringify(data)}`, 0);
      }
    }
  };

  const handleLoadingError = () => {
    Dynatrace.reportError('Link Debit Card Error: Error rendering VGS form', 0);
  };

  const onModalClose = () => {
    dispatch(AccountActions.setLinkCardError(null));
    dispatch(AccountActions.setLinkCardSuccess(false));

    if (params?.nextNav) {
      navigate(params.nextNav);
    } else {
      goBack();
    }
  };

  return (
    <SecondaryScreenLayout testID="LinkCardPage" title={strings.linkCard.linkDebitCard}>
      <Container>
        <Legend>{strings.linkCard.card_number_leyend}</Legend>
        <WebView
          hideKeyboardAccessoryView
          onError={handleLoadingError}
          onMessage={handleSubmit}
          originWhitelist={['*']}
          renderLoading={() => <CardActivityIndicator color={COLORS.alpha500} size="large" />}
          source={{ html: linkCardForm(credentials.accessToken) }}
          startInLoadingState={true}
        />
      </Container>
      <ImageTextButtonModal
        image={ICONS.successIllustration}
        text={message?.description}
        buttonText={message?.title}
        onClose={onModalClose}
        visible={linkSuccess || !!linkError}
      />
    </SecondaryScreenLayout>
  );
}
