import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AccountTransactionsDetailPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const AccountTransactionsDetailScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.ACCOUNT_TRANSACTION_DETAIL_SCREEN_OPEN));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <AccountTransactionsDetailPage testID="AccountTransactionsDetailScreen" />;
};

export default AccountTransactionsDetailScreen;
