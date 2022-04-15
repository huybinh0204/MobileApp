import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { HomeTabPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const HomeTabScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.HOME_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <HomeTabPage />;
};

export default HomeTabScreen;
