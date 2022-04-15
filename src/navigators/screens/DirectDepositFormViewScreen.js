import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { DirectDepositFormViewPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const DirectDepositFormViewScreen = ({ route: { params } }) => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.DIRECT_DEPOSIT_FORM_PDF_VIEW_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <DirectDepositFormViewPage />;
};

export default DirectDepositFormViewScreen;
