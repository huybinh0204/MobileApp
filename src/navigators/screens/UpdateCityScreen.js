import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { UpdateCityPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const UpdateCityScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.UPDATE_CITY_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <UpdateCityPage testID="UpdateCityScreen" />;
};

export default UpdateCityScreen;
