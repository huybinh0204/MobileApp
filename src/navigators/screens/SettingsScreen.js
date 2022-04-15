import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SettingsPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const SettingsScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.SETTINGS_MENU_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <SettingsPage testID="SettingsScreen" />;
};

export default SettingsScreen;
