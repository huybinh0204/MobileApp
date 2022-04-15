import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SignInPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const SignInScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.SIGN_IN_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <SignInPage testID="SignInScreen" />;
};

export default SignInScreen;
