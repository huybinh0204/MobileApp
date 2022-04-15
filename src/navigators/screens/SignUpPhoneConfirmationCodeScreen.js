import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SignUpPhoneConfirmationCodePage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const SignUpPhoneConfirmationCodeScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.SIGN_UP_PHONE_CONFIRMATION_CODE_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <SignUpPhoneConfirmationCodePage testID="SignUpPhoneConfirmationCodeScreen" />;
};

export default SignUpPhoneConfirmationCodeScreen;
