import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MainButton, SegmentedTextInput, Toast } from '_components/atoms';
import { OnboardingScreenLayout } from '_components/organisms';
import { NAVIGATION, PHONE_CODES, TOAST_TYPES } from '_constants';
import strings from '_localization/index';
import { CustomerActions, CustomerSelectors } from '_store/customer';
import { cleanPhoneNumber, formatPhoneNumber } from '_utilities/Account';
import { ConfirmPhoneTitle, Container } from './SignUpPhoneConfirmationCodePage.styles';

const CELL_COUNT = 6;
const RESEND_TIMEOUT = 15000; // 15 seconds

const SignUpPhoneConfirmationCodePage = () => {
  const { params } = useRoute();
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const customerExternalId = useSelector(CustomerSelectors.getExternalId);
  const confirmSuccess = useSelector(CustomerSelectors.getConfirmPhoneVerificationSuccess);
  const confirmError = useSelector(CustomerSelectors.getConfirmPhoneVerificationError);
  const isLoading = useSelector(CustomerSelectors.getIsLoading);

  const timer = useRef(null);
  const [code, setCode] = useState('');
  const [showResendButton, setShowResendButton] = useState(false);

  const localizedPhoneNumber = cleanPhoneNumber(PHONE_CODES.US, params?.phoneNumber);

  useEffect(() => {
    if (confirmSuccess) {
      dispatch(CustomerActions.setConfirmPhoneVerificationSuccess(false));
      dispatch(CustomerActions.setConfirmPhoneVerificationError(null));
      navigate(NAVIGATION.auth.signUpName, { ...params });
    }
  }, [confirmSuccess, navigate, params, dispatch]);

  useEffect(() => {
    if (code?.length < CELL_COUNT) {
      return;
    }

    dispatch(
      CustomerActions.confirmPhoneVerification(code, customerExternalId, localizedPhoneNumber)
    );

    if (timer?.current) {
      clearTimeout(timer.current);
    }
  }, [code, dispatch, localizedPhoneNumber, customerExternalId]);

  const resetTimer = () => {
    if (timer?.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setShowResendButton(true);
    }, RESEND_TIMEOUT);
  };

  const resendCode = () => {
    dispatch(CustomerActions.startPhoneVerification(customerExternalId, localizedPhoneNumber));
    setShowResendButton(false);
    setCode('');
    resetTimer();
  };

  const handleCloseToast = () => {
    dispatch(CustomerActions.setConfirmPhoneVerificationSuccess(false));
    dispatch(CustomerActions.setConfirmPhoneVerificationError(null));
  };

  return (
    <OnboardingScreenLayout step={5} testID="SignUpPhonePage">
      <Container>
        <View>
          <ConfirmPhoneTitle>
            {strings.formatString(strings.signUp.confirmPhoneNumber.title, {
              phone: formatPhoneNumber(params?.phoneNumber),
            })}
          </ConfirmPhoneTitle>
          <SegmentedTextInput
            autoFocus
            cellCount={CELL_COUNT}
            keyboardType="phone-pad"
            setValue={setCode}
            value={code}
            testID="SMSCode"
          />
        </View>
        <MainButton
          disabled={!showResendButton}
          onPress={resendCode}
          isLoading={isLoading}
          testID="signUpPhoneSubmitButton"
          variant="link"
        >
          {strings.signUp.confirmPhoneNumber.resendCode}
        </MainButton>
      </Container>
      <Toast
        type={TOAST_TYPES.ERROR}
        header={confirmError?.title}
        content={confirmError?.description}
        onClose={handleCloseToast}
        show={confirmError !== null}
        testID="confirmCodeErrorToast"
      />
    </OnboardingScreenLayout>
  );
};

export default SignUpPhoneConfirmationCodePage;
