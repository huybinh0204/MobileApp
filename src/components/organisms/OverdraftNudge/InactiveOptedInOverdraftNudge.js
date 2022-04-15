import { useTheme } from '@emotion/react';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Badge } from '_components/atoms';
import { Nudge } from '_components/molecules';
import { ICONS, NAVIGATION } from '_constants';
import strings from '_localization';
import {
  ActivationStatus,
  HeaderDescription,
  HeaderTitle,
} from './InactiveOptedInOverdraftNudge.styles';

export const InactiveOptedInOverdraftNudge = ({ testID }) => {
  const { navigate } = useNavigation();
  const { colors } = useTheme();

  const navigateToOverdraftLegals = () => {
    navigate(NAVIGATION.shared.overdraftLegalAgreement);
  };

  const Header = (
    <>
      <HeaderTitle>{strings.overdraft.nudge.inactiveOptedIn.header.title}</HeaderTitle>
      <HeaderDescription>
        <Badge backgroundColor={colors.zeta500} />
        <ActivationStatus>
          {strings.overdraft.nudge.inactiveOptedIn.header.description}
        </ActivationStatus>
      </HeaderDescription>
    </>
  );

  return (
    <Nudge
      icon={ICONS.overdraftProtection}
      buttonText={strings.overdraft.nudge.inactiveOptedIn.buttonText}
      headerComponent={Header}
      onButtonPress={navigateToOverdraftLegals}
      testID={testID}
    />
  );
};

export default InactiveOptedInOverdraftNudge;
