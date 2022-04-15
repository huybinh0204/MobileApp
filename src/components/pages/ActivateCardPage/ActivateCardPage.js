import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { MainButton } from '_components/atoms';
import { SecondaryScreenLayout } from '_components/organisms';
import { ICONS, NAVIGATION } from '_constants';
import strings from '_localization';
import { normalize } from '_utilities/screen';
import { Content, Description, Logo, Title } from './ActivateCardPage.styles';

const ActivateCardPage = () => {
  const { navigate } = useNavigation();

  const goToSecurityCheck = () => {
    navigate(NAVIGATION.card.securityCheck);
  };

  return (
    <SecondaryScreenLayout testID="ActivateCard" title={strings.card.activateCard}>
      <Content>
        <Logo
          icon={ICONS.parachuteCardIllustration}
          width={normalize(250)}
          height={normalize(250)}
        />
        <Title>{strings.card.letsActivate}</Title>
        <Description>{strings.card.description}</Description>
        <MainButton onPress={goToSecurityCheck} testID="goToExpirationDateScreen">
          {strings.card.activateCard}
        </MainButton>
      </Content>
    </SecondaryScreenLayout>
  );
};

export default ActivateCardPage;
