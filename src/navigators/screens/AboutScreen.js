import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AboutPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const AboutScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.ABOUT_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <AboutPage testID="AboutScreen" />;
};

export default AboutScreen;
