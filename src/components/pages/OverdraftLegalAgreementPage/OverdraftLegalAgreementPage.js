import { useTheme } from '@emotion/react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import ENV from 'react-native-config';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from '_components/atoms';
import { SecondaryScreenLayout } from '_components/organisms';
import { NAVIGATION, OverdraftState, TOAST_TYPES } from '_constants';
import strings from '_localization';
import { AccountActions, AccountSelectors } from '_store/account';
import {
  AgreementText,
  CheckBox,
  CheckboxContainer,
  LoadingIndicator,
  OptionsContainer,
  SubmitButton,
  WebViewContainer,
} from './OverdraftLegalAgreementPage.styles';

const OVERDRAFT_LEGAL_AGREEMENT_PAGE_TITLE = 'Overdraft Mobile';

const OverdraftLegalAgreementPage = () => {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const { navigate } = useNavigation();

  const dispatch = useDispatch();
  const externalId = useSelector(AccountSelectors.getExternalId);
  const overdraftProtectionError = useSelector(AccountSelectors.getOverdraftError);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [toggleAgreementCheckBox, setToggleAgreementCheckBox] = useState(false);
  const [isOverdraftAgreementLoaded, setIsOverdraftAgreementLoaded] = useState(false);

  const shouldRenderWebView = isFocused || Platform.OS === 'ios';

  const handleWebViewLoad = ({ nativeEvent: { title } }) => {
    if (title === OVERDRAFT_LEGAL_AGREEMENT_PAGE_TITLE) {
      setIsOverdraftAgreementLoaded(true);
    }
  };

  const handleSubmit = () => {
    setSubmitLoading(true);
    dispatch(AccountActions.setOverdraftProtectionState(externalId, OverdraftState.OPT_IN));
    navigate(NAVIGATION.shared.overdraftOptInSuccess);
  };

  const handleCloseToast = () => {
    dispatch(AccountActions.setOverdraftProtectionError(null));
    setSubmitLoading(false);
  };

  return (
    <SecondaryScreenLayout
      testID="OverdraftLegalAgreementPage"
      title={strings.overdraft.legalAgreement.title}
    >
      <WebViewContainer>
        {shouldRenderWebView && (
          <WebView
            startInLoadingState
            onLoad={handleWebViewLoad}
            renderLoading={() => <LoadingIndicator color={theme.colors.alpha500} size="large" />}
            source={{ uri: ENV.OVERDRAFT_LEGAL_AGREEMENT_URL }}
          />
        )}
      </WebViewContainer>
      <OptionsContainer>
        <CheckboxContainer>
          <CheckBox
            disabled={!isOverdraftAgreementLoaded}
            value={toggleAgreementCheckBox}
            boxType="square"
            tintColor={isOverdraftAgreementLoaded ? theme.colors.alpha500 : theme.colors.beta100}
            onValueChange={setToggleAgreementCheckBox}
            onCheckColor={theme.colors.white}
            onFillColor={theme.colors.alpha500}
            onTintColor={theme.colors.alpha500}
            animationDuration={0.2}
            testID="agreementCheckbox"
          />
          <AgreementText>{strings.overdraft.legalAgreement.agreementCheck}</AgreementText>
        </CheckboxContainer>
        <SubmitButton
          disabled={!toggleAgreementCheckBox}
          isLoading={submitLoading}
          onPress={handleSubmit}
          testID="overdraftLegalSubmitButton"
        >
          {strings.overdraft.legalAgreement.submit}
        </SubmitButton>
      </OptionsContainer>
      <Toast
        type={TOAST_TYPES.ERROR}
        content={overdraftProtectionError?.description}
        header={overdraftProtectionError?.title}
        onClose={handleCloseToast}
        show={overdraftProtectionError !== null}
        testID="overdraftToast"
      />
    </SecondaryScreenLayout>
  );
};

export default OverdraftLegalAgreementPage;
