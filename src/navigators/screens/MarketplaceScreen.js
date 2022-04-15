import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { MarketplacePage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const MarketplaceScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.MARKETPLACE_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <MarketplacePage testID="MarketplacePage" />;
};

export default MarketplaceScreen;
