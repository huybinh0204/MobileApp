import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { PhoneNumberConfirmationPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const PhoneNumberConfirmationScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.PHONE_NUMBER_CONFIRMATION_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <PhoneNumberConfirmationPage testID="PhoneNumberConfirmationScreen" />;
};

export default PhoneNumberConfirmationScreen;
