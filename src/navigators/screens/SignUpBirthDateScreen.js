import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SignUpBirthDatePage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const SignUpBirthDateScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.SIGN_UP_BIRTH_DATE_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <SignUpBirthDatePage testID="SignUpBirthDateScreen" />;
};

export default SignUpBirthDateScreen;
