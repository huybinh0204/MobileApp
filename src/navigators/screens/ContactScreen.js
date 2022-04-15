import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ContactPage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const ContactScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.CONTACT_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <ContactPage testID="ContactScreen" />;
};

export default ContactScreen;
