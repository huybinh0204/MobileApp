import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { TakeOutMoneyPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const TakeOutMoneyScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.TAKE_OUT_MONEY_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <TakeOutMoneyPage testID="TakeOutMoneyPage" />;
};

export default TakeOutMoneyScreen;
