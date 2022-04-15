import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ChangePasswordPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const ChangePasswordScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.CHANGE_PASSWORD_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <ChangePasswordPage testID="ChangePasswordScreen" />;
};

export default ChangePasswordScreen;
