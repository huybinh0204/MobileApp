import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { WelcomeToKinlyPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const WelcomeToKinlyScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.WELCOME_TO_KINLY_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <WelcomeToKinlyPage testID="WelcomeToKinlyPage" />;
};

export default WelcomeToKinlyScreen;
