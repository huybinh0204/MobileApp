import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { EarlyPaycheckSuccessPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const EarlyPaycheckSuccessScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.EARLY_PAYCHECK_SUCCESS_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <EarlyPaycheckSuccessPage testID="EarlyPaycheckSuccessScreen" />;
};

export default EarlyPaycheckSuccessScreen;
