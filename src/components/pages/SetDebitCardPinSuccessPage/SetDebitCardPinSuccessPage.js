import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { IconSvg, MainButton } from '_components/atoms';
import { SecondaryScreenLayout } from '_components/organisms';
import { ICONS } from '_constants';
import strings from '_localization';
import { normalize } from '_utilities/screen';
import { SuccesPageContainer, SuccesPageTitle } from './SetDebitCardPinSuccessPage.styles';

const SetDebitCardPinSuccessPage = () => {
  const { params } = useRoute();
  const { popToTop } = useNavigation();

  const { isChangePinVariant } = params;

  return (
    <SecondaryScreenLayout testID="SetDebitCardPinSuccessPage" showBackButton={false}>
      <SuccesPageContainer>
        <IconSvg
          width={normalize(250)}
          height={normalize(250)}
          icon={ICONS.cardSuccessActivation}
        />
        <SuccesPageTitle>
          {isChangePinVariant ? strings.card.changePinSuccess : strings.card.setInitialPinSuccess}
        </SuccesPageTitle>
        <MainButton accessibilityLabel="Go To Card Tab" onPress={popToTop}>
          {strings.linkCard.awesome}
        </MainButton>
      </SuccesPageContainer>
    </SecondaryScreenLayout>
  );
};

export default SetDebitCardPinSuccessPage;
