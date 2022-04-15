import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Nudge } from '_components/molecules';
import { EVENTS, ICONS, NAVIGATION } from '_constants';
import strings from '_localization/index';
import { RegisterActions } from '_store/register';
import { HeaderDescription, HeaderTitle } from './ActivateCardeNudge.styles';

const ActivateCardNudge = ({ testID }) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const navigateToCardActivation = () => {
    navigate(NAVIGATION.card.activateCard);
  };

  useEffect(() => {
    dispatch(RegisterActions.trackEvent(EVENTS.ACTIVATE_CARD_NUDGE_OPENED));
  }, [dispatch]);

  const Header = (
    <>
      <HeaderTitle>{strings.activateCardNudge.title}</HeaderTitle>
      <HeaderDescription> {strings.activateCardNudge.info}</HeaderDescription>
    </>
  );

  return (
    <Nudge
      icon={ICONS.activateCard}
      headerComponent={Header}
      buttonText={strings.activateCardNudge.buttonText}
      onButtonPress={navigateToCardActivation}
      testID={testID}
    />
  );
};

export default ActivateCardNudge;
