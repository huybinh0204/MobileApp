import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { UpdateAddressPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const UpdateAddressScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.UPDATE_ADDRESS_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <UpdateAddressPage testID="UpdateAddressScreen" />;
};

export default UpdateAddressScreen;
