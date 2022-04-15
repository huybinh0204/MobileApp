import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SignUpMailPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const SignUpMailScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.SIGNUP_MAIL_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <SignUpMailPage testID="SignUpMailScreen" />;
};

export default SignUpMailScreen;
