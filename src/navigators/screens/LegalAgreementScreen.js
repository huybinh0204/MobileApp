import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { LegalAgreementPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const LegalAgreementScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.LEGAL_AGREEMENT_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <LegalAgreementPage testID="LegalAgreementScreen" />;
};

export default LegalAgreementScreen;
