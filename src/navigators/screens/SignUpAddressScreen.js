import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SignUpAddressPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const SignUpAddressScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.SIGN_UP_ADDRESS_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <SignUpAddressPage testID="SignUpAddressScreen" />;
};

export default SignUpAddressScreen;
