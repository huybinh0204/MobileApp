import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { FundChoicePage } from '_components/pages';
import { EVENTS } from '_constants';
import { RegisterActions } from '_store/register';

const FundChoiceScreen = () => {
  const dispatch = useDispatch();

  const trackNavigation = useCallback(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.FUND_CHOICE_SCREEN_OPENED));
  }, [dispatch]);

  useFocusEffect(trackNavigation);

  return <FundChoicePage testID="FundChoiceScreen" />;
};

export default FundChoiceScreen;
