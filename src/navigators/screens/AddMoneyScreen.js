import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AddMoneyPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const AddMoneyScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.ADD_MONEY_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <AddMoneyPage testID="AddMoneyScreen" />;
};

export default AddMoneyScreen;
