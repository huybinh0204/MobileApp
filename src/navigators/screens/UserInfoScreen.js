import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { UserInfoPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const UserInfoScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.USER_INFO_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <UserInfoPage testID="UserInfoScreen" />;
};

export default UserInfoScreen;
