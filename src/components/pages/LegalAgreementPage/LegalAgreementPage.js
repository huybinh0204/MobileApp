import { useTheme } from '@emotion/react';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import ENV from 'react-native-config';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from '_components/atoms';
import { OnboardingScreenLayout } from '_components/organisms';
import { AGREEMENT_TYPES, NAVIGATION, TOAST_TYPES } from '_constants';
import strings from '_localization';
import { AccountActions, AccountSelectors } from '_store/account';
import { openExternalLink } from '_utilities/ExternalLinks';
import {
  AgreementText,
  CheckBox,
  CheckboxContainer,
  CheckboxSpacing,
  Content,
  Hyperlink,
  LoadingIndicator,
  SubmitButton,
} from './LegalAgreementPage.styles';

const agreements = [
  { type: AGREEMENT_TYPES.AHEAD_BANCORP_ELECTRONIC_COMMUNICATIONS_AGREEMENT },
  { type: AGREEMENT_TYPES.AHEAD_BANCORP_DEPOSIT_ACCOUNT_AGREEMENT },
  { type: AGREEMENT_TYPES.AHEAD_BANCORP_BANK_CARDHOLDER_AGREEMENT },
  { type: AGREEMENT_TYPES.BANCORP_BANK_PRIVACY_NOTICE },
  { type: AGREEMENT_TYPES.AHEAD_PRIVACY_POLICY },
  { type: AGREEMENT_TYPES.AHEAD_USER_AGREEMENT },
];

const LegalAgreementPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { addListener, navigate } = useNavigation();

  const externalId = useSelector(AccountSelectors.getExternalId);
  const success = useSelector(AccountSelectors.getLegalAgreementSuccess);
  const error = useSelector(AccountSelectors.getLegalAgreementError);
  const isLoading = useSelector(AccountSelectors.getIsLoadingLegalAgreement);

  const [togglePolicyCheckBox, setTogglePolicyCheckBox] = useState(false);
  const [toggleAgreementCheckBox, setToggleAgreementCheckBox] = useState(false);

  const isSubmitEnabled = toggleAgreementCheckBox && togglePolicyCheckBox;
  const shouldRenderWebView = isFocused || Platform.OS === 'ios';

  const openURL = async (url) => {
    await openExternalLink(url);
  };

  const handleSubmit = () => {
    dispatch(AccountActions.confirmLegalAgreement(externalId, agreements));
  };

  const handleCloseToast = () => {
    dispatch(AccountActions.setLegalAgreementSuccess(false));
    dispatch(AccountActions.setLegalAgreementError(false));
  };

  useEffect(() => {
    if (success) {
      navigate(NAVIGATION.auth.welcomeToKinly);
    }
  }, [success, navigate]);

  useFocusEffect(
    useCallback(() => {
      return addListener('beforeRemove', (event) => {
        event.preventDefault(); // Disables go back
      });
    }, [addListener])
  );

  return (
    <OnboardingScreenLayout step={11} showBackButton={false} testID="LegalAgreementPage">
      <Content>
        {shouldRenderWebView && (
          <WebView
            startInLoadingState
            bounces={false}
            renderLoading={() => <LoadingIndicator color={theme.colors.alpha500} size="large" />}
            source={{ uri: ENV.ELECTRONIC_DISCLOSURE_AGREEMENT_URL }}
          />
        )}
        <CheckboxSpacing>
          <CheckboxContainer>
            <CheckBox
              value={toggleAgreementCheckBox}
              boxType="square"
              tintColor={theme.colors.alpha500}
              onValueChange={setToggleAgreementCheckBox}
              onCheckColor={theme.colors.white}
              onFillColor={theme.colors.alpha500}
              onTintColor={theme.colors.alpha500}
              animationDuration={0.2}
              testID="agreementCheckbox"
            />
            <AgreementText>
              {strings.formatString(strings.legalAgreement.readAndAgreeCommunicationAgreement, {
                communicationsAgreementLink: (
                  <Hyperlink
                    onPress={() =>
                      openURL(strings.settings.policyTerms.electronicCommunication.url)
                    }
                  >
                    {strings.settings.policyTerms.electronicCommunication.title}
                  </Hyperlink>
                ),
              })}
            </AgreementText>
          </CheckboxContainer>
          <CheckboxContainer>
            <CheckBox
              value={togglePolicyCheckBox}
              disabled={!toggleAgreementCheckBox}
              boxType="square"
              tintColor={!toggleAgreementCheckBox ? theme.colors.beta100 : theme.colors.alpha500}
              onValueChange={setTogglePolicyCheckBox}
              onCheckColor={theme.colors.white}
              onFillColor={theme.colors.alpha500}
              onTintColor={theme.colors.alpha500}
              animationDuration={0.2}
              testID="policyCheckbox"
            />
            <AgreementText>
              {strings.formatString(strings.legalAgreement.readAndAgreeOthers, {
                accountAgreementLink: (
                  <Hyperlink
                    onPress={() => openURL(strings.settings.policyTerms.depositAccount.url)}
                  >
                    {strings.settings.policyTerms.depositAccount.title}
                  </Hyperlink>
                ),
                privacyNotice: (
                  <Hyperlink onPress={() => openURL(strings.settings.policyTerms.bankPrivacy.url)}>
                    {strings.settings.policyTerms.bankPrivacy.title}
                  </Hyperlink>
                ),
                privacyPolicy: (
                  <Hyperlink
                    onPress={() => openURL(strings.settings.policyTerms.privacyPolicy.url)}
                  >
                    {strings.settings.policyTerms.privacyPolicy.title}
                  </Hyperlink>
                ),
                agreementPolicy: (
                  <Hyperlink onPress={() => openURL(strings.settings.policyTerms.kinlyUser.url)}>
                    {strings.settings.policyTerms.kinlyUser.title}
                  </Hyperlink>
                ),
              })}
            </AgreementText>
          </CheckboxContainer>
          <SubmitButton
            disabled={!isSubmitEnabled}
            isLoading={isLoading}
            onPress={handleSubmit}
            testID="submit"
          >
            {strings.submit}
          </SubmitButton>
        </CheckboxSpacing>
      </Content>
      <Toast
        type={TOAST_TYPES.ERROR}
        header={strings.signUp.legalAgreementErrorHeader}
        content={strings.signUp.legalAgreementErrorBody}
        onClose={handleCloseToast}
        show={error}
        testID="legalAgreementToast"
      />
    </OnboardingScreenLayout>
  );
};

export default LegalAgreementPage;
