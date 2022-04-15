import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SetDebitCardPinFormPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const SetDebitCardPinFormScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.SET_DEBIT_CARD_PIN_FORM_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <SetDebitCardPinFormPage testID="SetDebitCardPinFormScreen" />;
};

export default SetDebitCardPinFormScreen;
