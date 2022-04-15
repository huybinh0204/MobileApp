import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { StatementPreviewPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const StatementPreviewScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.STATEMENT_PREVIEW_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <StatementPreviewPage testID="StatementPreviewScreen" />;
};

export default StatementPreviewScreen;
