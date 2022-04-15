import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AccountInfoPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const AccountInfoScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.ACCOUNT_INFO_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <AccountInfoPage testID="AccountInfoScreen" />;
};

export default AccountInfoScreen;
