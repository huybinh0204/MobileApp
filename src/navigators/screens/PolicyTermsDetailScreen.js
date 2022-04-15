import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { PolicyTermsDetailPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const PolicyTermsDetailScreen = ({ route: { params } }) => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.POLICY_AND_TERMS_DETAIL_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <PolicyTermsDetailPage url={params.url} testID="PolicyTermsDetailScreen" />;
};

export default PolicyTermsDetailScreen;
