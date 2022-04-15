import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { EarlyPaycheckPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const EarlyPaycheckScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.EARLY_PAYCHECK_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <EarlyPaycheckPage testID="EarlyPaycheckScreen" />;
};

export default EarlyPaycheckScreen;
