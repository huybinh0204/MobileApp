import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AtomicFiOverdraftSellPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const OverdraftSellScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.OVERDRAFT_SELL_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <AtomicFiOverdraftSellPage testID="OverdraftSellPage" />;
};

export default OverdraftSellScreen;
