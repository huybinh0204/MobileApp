import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SetDebitCardPinInfoPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const SetDebitCardPinInfoScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.SET_DEBIT_CARD_PIN_INFO_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <SetDebitCardPinInfoPage testID="SetDebitCardPinInfoScreen" />;
};

export default SetDebitCardPinInfoScreen;
