import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { PhoneNumberPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const PhoneNumberScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.PHONE_NUMBER_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <PhoneNumberPage testID="PhoneNumberScreen" />;
};

export default PhoneNumberScreen;
