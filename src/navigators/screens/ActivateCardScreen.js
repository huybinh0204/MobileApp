import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ActivateCardPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const ActivateCardScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.ACTIVATE_CARD_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <ActivateCardPage testID="ActivateCardScreen" />;
};

export default ActivateCardScreen;
