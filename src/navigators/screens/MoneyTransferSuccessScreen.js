import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { MoneyTransferSuccessPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const MoneyTransferSuccessScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.MONEY_TRANSFER_SUCCESS_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <MoneyTransferSuccessPage testID="MoneyTransferSuccessScreen" />;
};

export default MoneyTransferSuccessScreen;
