import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { MainButton } from '_components/atoms';
import { SecondaryScreenLayout } from '_components/organisms';
import { ICONS } from '_constants';
import strings from '_localization';
import { normalize } from '_utilities/screen';
import {
  ButtonContainer,
  Icon,
  OverdraftOptInSuccessContainer,
  SuccessTitle,
} from './OverdraftOptInSuccessPage.styles';

const OverdraftOptInSuccessPage = () => {
  const { popToTop } = useNavigation();

  const handlePress = () => {
    popToTop();
  };

  return (
    <SecondaryScreenLayout showBackButton={false} testID="OverdraftOptInSuccessPage">
      <OverdraftOptInSuccessContainer>
        <Icon width={normalize(250)} height={normalize(250)} icon={ICONS.cardSuccessActivation} />
        <SuccessTitle>{strings.overdraft.optInSuccess.title}</SuccessTitle>
        <ButtonContainer>
          <MainButton onPress={handlePress} testID="overdraftOptInSuccessButton">
            {strings.fund.success.gotIt}
          </MainButton>
        </ButtonContainer>
      </OverdraftOptInSuccessContainer>
    </SecondaryScreenLayout>
  );
};

export default OverdraftOptInSuccessPage;
