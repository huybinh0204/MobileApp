import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Nudge } from '_components/molecules';
import { ICONS, NAVIGATION } from '_constants';
import strings from '_localization/index';
import { HeaderDescription, HeaderTitle } from './OptedOutOverdraftNudge.styles';

const OptedOutOverdraftNudge = ({ testID }) => {
  const { navigate } = useNavigation();

  const navigateToOverdraftSellPage = () => {
    navigate(NAVIGATION.shared.overdraftSell);
  };

  const Header = (
    <>
      <HeaderTitle>{strings.overdraft.nudge.optedOut.header.title}</HeaderTitle>
      <HeaderDescription>{strings.overdraft.nudge.optedOut.header.description}</HeaderDescription>
    </>
  );

  return (
    <Nudge
      icon={ICONS.overdraftProtection}
      buttonText={strings.overdraft.nudge.optedOut.buttonText}
      headerComponent={Header}
      onButtonPress={navigateToOverdraftSellPage}
      testID={testID}
    />
  );
};

export default OptedOutOverdraftNudge;
