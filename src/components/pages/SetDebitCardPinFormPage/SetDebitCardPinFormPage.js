import { useTheme } from '@emotion/react';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import ENV from 'react-native-config';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { NotifyModal } from '_components/molecules';
import { SecondaryScreenLayout } from '_components/organisms';
import { NAVIGATION } from '_constants';
import strings from '_localization';
import { AccountActions, AccountSelectors } from '_store/account';
import {
  Container,
  LoadingIndicator,
  LoadingIndicatorContainer,
} from './SetDebitCardPinFormPage.styles';

const SetDebitCardPinFormPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { params } = useRoute();
  const { navigate } = useNavigation();

  const token = useSelector(AccountSelectors.getCardPinChangeToken);
  const error = useSelector(AccountSelectors.getCardPinChangeError);
  const isLoading = useSelector(AccountSelectors.getCardPinChangeIsLoading);
  const externalId = useSelector(AccountSelectors.getExternalId);
  const [kinlyCard] = useSelector(AccountSelectors.getKinlyCards);
  const pinChangeSuccess = useSelector(AccountSelectors.getCardPinChangeSuccess);

  const [showModal, setShowModal] = useState(false);
  const [hideWebview, setHideWebview] = useState(false);

  const { isChangePinVariant } = params;
  const formURI = `${ENV.GALILEO_SET_PIN_FORM_URI}/${ENV.GALILEO_SET_PIN_FORM_SUBMITTER_ID}/${token}`;

  const handlePinChange = ({ nativeEvent: { data: status } }) => {
    if (status === '0') {
      dispatch(AccountActions.commitCardPinChange(externalId, kinlyCard?.cardId));
    } else {
      setShowModal(true);
      setHideWebview(true);
    }
  };

  const handleModalDissmis = () => {
    setShowModal(false);
    setHideWebview(false);
    dispatch(AccountActions.setCardPinChangeError(false));
    dispatch(AccountActions.fetchCardPinChangeToken(externalId, kinlyCard?.cardId));
  };

  useEffect(() => {
    if (externalId && kinlyCard?.cardId) {
      dispatch(AccountActions.fetchCardPinChangeToken(externalId, kinlyCard?.cardId));
    }
  }, [dispatch, externalId, kinlyCard?.cardId]);

  useEffect(() => {
    if (pinChangeSuccess) {
      dispatch(AccountActions.setCardPinChangeSuccess(false));
      navigate(NAVIGATION.card.setDebitCardPinSuccess, { isChangePinVariant });
    }

    if (error) {
      setShowModal(true);
      setHideWebview(true);
    }
  }, [error, isChangePinVariant, pinChangeSuccess, navigate, dispatch]);

  return (
    <SecondaryScreenLayout
      testID="SetDebitCardPinFormPage"
      title={strings.card.setPinForm.header}
      showBackButton={isChangePinVariant}
    >
      <Container>
        {!isLoading && token && !pinChangeSuccess && !hideWebview && (
          <WebView
            javaScriptEnabled
            bounces={false}
            onMessage={handlePinChange}
            renderLoading={() => <LoadingIndicator color={theme.colors.alpha500} size="large" />}
            source={{ uri: formURI }}
            startInLoadingState={true}
          />
        )}
        {isLoading && (
          <LoadingIndicatorContainer>
            <LoadingIndicator color={theme.colors.alpha500} size="large" />
          </LoadingIndicatorContainer>
        )}
      </Container>
      <NotifyModal
        buttonText={strings.card.setPinForm.modalErrorButtonText}
        description={strings.card.setPinForm.modalErrorDescription}
        onDismiss={handleModalDissmis}
        title={strings.card.setPinForm.modalErrorTitle}
        visible={showModal}
      />
    </SecondaryScreenLayout>
  );
};

export default SetDebitCardPinFormPage;
