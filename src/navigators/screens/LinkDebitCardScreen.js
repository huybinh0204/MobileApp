import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { LinkDebitCardPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const LinkDebitCardScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.LINK_DEBIT_CARD_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <LinkDebitCardPage testID="LinkDebitCardPage" />;
};

export default LinkDebitCardScreen;
