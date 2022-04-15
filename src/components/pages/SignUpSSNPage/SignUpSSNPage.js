import { Dynatrace } from '@dynatrace/react-native-plugin';
import { useTheme } from '@emotion/react';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { NotifyModal } from '_components/molecules';
import { OnboardingScreenLayout } from '_components/organisms';
import { EVENTS, NAVIGATION } from '_constants';
import strings from '_localization';
import AppsFlyerService from '_services/AppsFlyerService';
import BrazeService from '_services/BrazeService';
import { AccountActions } from '_store/account';
import { AuthenticationActions, AuthenticationSelectors } from '_store/authentication';
import { CustomerActions } from '_store/customer';
import { shouldReportError } from '_utilities/dynatrace';
import generateVgsWebView from './generateVgsWebView';
import { Container, Legend, LoadingIndicator, Title } from './SignUpSSNPage.styles';

const SignUpSSNPage = () => {
  const { colors } = useTheme();
  const { params } = useRoute();
  const dispatch = useDispatch();
  const { navigate, popToTop } = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const credentials = useSelector(AuthenticationSelectors.getCredentials);

  const handleSubmit = ({ nativeEvent }) => {
    AppsFlyerService.track(EVENTS.AF_SUBMIT_ACCOUNT_APPLICATION);

    const { data, status } = JSON.parse(nativeEvent.data);
    const { externalId: accountExternalId, userExternalId: customerExternalId } = data;

    if (status === 200) {
      BrazeService.changeUser(customerExternalId);
      AppsFlyerService.identify(customerExternalId);
      Dynatrace.identifyUser(customerExternalId);
      dispatch(AccountActions.setExternalId(accountExternalId));
      dispatch(CustomerActions.setExternalId(customerExternalId));
      navigate(NAVIGATION.auth.legalAgreement);
    } else {
      setShowModal(true);
      if (shouldReportError(status)) {
        Dynatrace.reportError(`Sign Up SSN Error: ${JSON.stringify(data)}`, 0);
      }
    }
  };

  const handleLoadingError = () => {
    Dynatrace.reportError('Sign Up SSN Error: Error rendering VGS form', 0);
  };

  const handleModalDissmis = () => {
    setShowModal(false);
    dispatch(AuthenticationActions.logout());
    popToTop();
  };

  return (
    <OnboardingScreenLayout step={10} testID="SignUpSSNPage">
      <Container>
        <Title>{strings.signUp.ssn.title}</Title>
        <Legend>{strings.signUp.ssn.legend}</Legend>
        <WebView
          hideKeyboardAccessoryView
          startInLoadingState
          bounces={false}
          onError={handleLoadingError}
          onMessage={handleSubmit}
          originWhitelist={['*']}
          renderLoading={() => <LoadingIndicator color={colors.alpha500} size="large" />}
          scrollEnabled={false}
          source={{ html: generateVgsWebView({ credentials, userData: params }) }}
        />
      </Container>
      <NotifyModal
        title={strings.signUp.modalIdentityErrorTitle}
        description={strings.signUp.modalIdentityErrorDescription}
        buttonText={strings.signUp.modalIdentityButton}
        onDismiss={handleModalDissmis}
        visible={showModal}
        transparent={true}
      />
    </OnboardingScreenLayout>
  );
};

export default SignUpSSNPage;
