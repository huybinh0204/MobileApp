import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SetDebitCardPinSuccessPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const SetDebitCardPinSuccessScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.SET_DEBIT_CARD_PIN_SUCCESS_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <SetDebitCardPinSuccessPage testID="SetDebitCardPinSuccessPageScreen" />;
};

export default SetDebitCardPinSuccessScreen;
