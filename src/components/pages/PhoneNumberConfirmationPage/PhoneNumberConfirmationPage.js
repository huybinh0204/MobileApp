import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MainButton, SegmentedTextInput, Toast } from '_components/atoms';
import { SecondaryScreenLayout } from '_components/organisms';
import { PHONE_CODES, TOAST_TYPES } from '_constants';
import strings from '_localization';
import { CustomerActions, CustomerSelectors } from '_store/customer';
import { cleanPhoneNumber, formatPhoneNumber } from '_utilities/Account';
import { ConfirmPhoneTitle, Container } from './PhoneNumberConfirmationPage.styles';

const CONFIRMATION_CODE_LENGTH = 6;
const RESEND_TIMEOUT = 15000; // 15 seconds

const PhoneNumberConfirmationPage = () => {
  const { params } = useRoute();
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const confirmationSuccess = useSelector(CustomerSelectors.getConfirmPhoneVerificationSuccess);
  const confirmationError = useSelector(CustomerSelectors.getConfirmPhoneVerificationError);
  const customerExternalId = useSelector(CustomerSelectors.getExternalId);
  const isLoading = useSelector(CustomerSelectors.getIsLoading);

  const resendCodeTimer = useRef(null);
  const [code, setCode] = useState('');
  const [showResendButton, setShowResendButton] = useState(true);

  const localizedPhoneNumber = cleanPhoneNumber(PHONE_CODES.US, params?.phoneNumber);

  useEffect(() => {
    if (confirmationSuccess) {
      dispatch(CustomerActions.updateCustomerData({ phoneNumber: params.phoneNumber }));
      navigate(params.target, { ...params });
      resetConfirmationStatus();
    }
  }, [confirmationSuccess, dispatch, navigate, params, resetConfirmationStatus]);

  useEffect(() => {
    if (code?.length < CONFIRMATION_CODE_LENGTH) {
      return;
    }

    dispatch(
      CustomerActions.confirmPhoneVerification(code, customerExternalId, localizedPhoneNumber)
    );

    return () => {
      if (resendCodeTimer?.current) {
        clearTimeout(resendCodeTimer.current);
      }
    };
  }, [code, dispatch, localizedPhoneNumber, customerExternalId]);

  const resendCode = () => {
    dispatch(CustomerActions.startPhoneVerification(customerExternalId, localizedPhoneNumber));
    setShowResendButton(false);
    setCode('');
    resetTimer();
  };

  const resetTimer = () => {
    if (resendCodeTimer.current) {
      clearTimeout(resendCodeTimer.current);
    }
    resendCodeTimer.current = setTimeout(() => {
      setShowResendButton(true);
    }, RESEND_TIMEOUT);
  };

  const resetConfirmationStatus = useCallback(() => {
    dispatch(CustomerActions.setConfirmPhoneVerificationSuccess(false));
    dispatch(CustomerActions.setConfirmPhoneVerificationError(null));
  }, [dispatch]);

  return (
    <SecondaryScreenLayout testID="PhoneNumberConfirmationPage">
      <Container>
        <View>
          <ConfirmPhoneTitle>
            {strings.formatString(strings.signUp.confirmPhoneNumber.title, {
              phone: formatPhoneNumber(params.phoneNumber),
            })}
          </ConfirmPhoneTitle>
          <SegmentedTextInput
            autoFocus
            cellCount={CONFIRMATION_CODE_LENGTH}
            keyboardType="number-pad"
            setValue={setCode}
            testID="SMSCode"
            textContentType="oneTimeCode"
            value={code}
          />
        </View>
        <MainButton
          disabled={showResendButton}
          onPress={resendCode}
          isLoading={isLoading}
          testID="resendCodeButton"
          variant="link"
        >
          {strings.signUp.confirmPhoneNumber.resendCode}
        </MainButton>
      </Container>
      <Toast
        type={TOAST_TYPES.ERROR}
        header={confirmationError?.title}
        content={confirmationError?.description}
        onClose={resetConfirmationStatus}
        show={confirmationError !== null}
        testID="confirmCodeErrorToast"
      />
    </SecondaryScreenLayout>
  );
};

export default PhoneNumberConfirmationPage;
