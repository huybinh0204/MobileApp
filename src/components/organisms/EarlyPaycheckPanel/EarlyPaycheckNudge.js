import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Nudge } from '_components/molecules';
import { EVENTS, ICONS, NAVIGATION } from '_constants';
import strings from '_localization';
import { RegisterActions } from '_store/register';
import { HeaderDescription, HeaderTitle } from './EarlyPaycheckNudge.styles';

const EarlyPaycheckNudge = ({ testID }) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const navigateToDirectDepositInfo = () => {
    navigate(NAVIGATION.shared.earlyPaycheck);
  };

  useEffect(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.EARLY_PAYCHECK_TEASER_PANEL_OPENED));
  }, [dispatch]);

  const Header = (
    <>
      <HeaderTitle>{strings.earlyPaycheckNudge.header.title}</HeaderTitle>
      <HeaderDescription>{strings.earlyPaycheckNudge.header.description}</HeaderDescription>
    </>
  );

  return (
    <Nudge
      icon={ICONS.earlyPaycheck}
      headerComponent={Header}
      buttonText={strings.earlyPaycheckNudge.buttonText}
      onButtonPress={navigateToDirectDepositInfo}
      testID={testID}
    />
  );
};

export default EarlyPaycheckNudge;
