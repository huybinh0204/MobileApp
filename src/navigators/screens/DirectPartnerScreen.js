import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import DirectPartnerPage from '_components/pages/DirectPartnerPage/DirectPartnerPage';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const DirectPartnerScreen = ({ route: { params } }) => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.DIRECT_PARTNER_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <DirectPartnerPage />;
};

export default DirectPartnerScreen;
