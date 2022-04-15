import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { DepositCashPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const DepositCashScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.DEPOSIT_CASH_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <DepositCashPage />;
};

export default DepositCashScreen;
