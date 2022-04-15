import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { WelcomePage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const WelcomeScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.WELCOME_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <WelcomePage testID="WelcomeScreen" />;
};

export default WelcomeScreen;
