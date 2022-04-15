import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { UpdateEmailPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const UpdateEmailScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.UPDATE_EMAIL_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <UpdateEmailPage testID="UpdateEmailScreen" />;
};

export default UpdateEmailScreen;
