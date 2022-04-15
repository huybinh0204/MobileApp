import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { CardTabPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const CardTabScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.CARD_TAB_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <CardTabPage testID="CardTabScreen" />;
};

export default CardTabScreen;
