import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { OverdraftOptInSuccessPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const OverdraftOptInSuccessScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.OVERDRAFT_OPT_IN_SUCCESS_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <OverdraftOptInSuccessPage testID="OverdraftOptInSuccessScreen" />;
};

export default OverdraftOptInSuccessScreen;
