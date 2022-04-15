import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { OverdraftLegalAgreementPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const OverdraftLegalAgreementScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.OVERDRAFT_LEGAL_AGREEMENT_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <OverdraftLegalAgreementPage testID="OverdraftLegalAgreementPage" />;
};

export default OverdraftLegalAgreementScreen;
