import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ActivateCardExpDatePage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const ActivateCardExpDateScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.ACTIVATE_CARD_SECURITY_CHECK_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <ActivateCardExpDatePage testID="ActivateCardExpDateScreen" />;
};

export default ActivateCardExpDateScreen;
