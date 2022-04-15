import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ForgotPasswordPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const ForgotPasswordScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.FORGOT_PASSWORD_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <ForgotPasswordPage testID="ForgotPasswordScreen" />;
};

export default ForgotPasswordScreen;
