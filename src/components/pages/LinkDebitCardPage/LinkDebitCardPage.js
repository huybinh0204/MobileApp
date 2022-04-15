import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { MainButton } from '_components/atoms';
import { SecondaryScreenLayout } from '_components/organisms';
import { ICONS, NAVIGATION } from '_constants';
import strings from '_localization';
import { normalize } from '_utilities/screen';
import {
  BottomContent,
  Illustration,
  MainContainer,
  Subtitle,
  Title,
} from './LinkDebitCardPage.styles';

const LinkDebitCardPage = () => {
  const { navigate } = useNavigation();

  const handlePress = () => {
    navigate(NAVIGATION.accounts.linkCard, { nextNav: NAVIGATION.accounts.takeOutMoney });
  };

  return (
    <SecondaryScreenLayout testID="LinkDebitCardPage">
      <MainContainer>
        <Illustration
          width={normalize(300)}
          height={normalize(300)}
          icon={ICONS.cardJumpingIllustration}
        />
        <Title>{strings.linkCard.flowIntroPage.flowGoal}</Title>
        <Subtitle>{strings.linkCard.flowIntroPage.flowGoalSubtext}</Subtitle>
        <BottomContent>
          <MainButton onPress={handlePress}>{strings.generalCallToActionButtonText}</MainButton>
        </BottomContent>
      </MainContainer>
    </SecondaryScreenLayout>
  );
};

export default LinkDebitCardPage;
