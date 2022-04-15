import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AccountTabPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const AccountsTabScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.ACCOUNT_TAB_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <AccountTabPage testID="AccountsScreen" />;
};

export default AccountsTabScreen;
