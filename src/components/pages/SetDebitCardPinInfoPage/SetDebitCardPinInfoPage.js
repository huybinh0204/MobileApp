import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { IconSvg } from '_components/atoms';
import { SecondaryScreenLayout } from '_components/organisms';
import { ICONS, NAVIGATION } from '_constants';
import strings from '_localization';
import { normalize } from '_utilities/screen';
import { Container, Description, SetPinButton, Title } from './SetDebitCardPinInfoPage.styles';

const SetDebitCardPinInfoPage = () => {
  const { params } = useRoute();
  const { navigate, popToTop, goBack } = useNavigation();

  const { isChangePinVariant } = params;
  const content = isChangePinVariant ? strings.card.changePinInfo : strings.card.setInitialPinInfo;

  const setDebitCardPin = () => {
    navigate(NAVIGATION.card.setDebitCardPinForm, { isChangePinVariant });
  };

  const handleBackPress = () => {
    if (isChangePinVariant) {
      goBack();
    } else {
      popToTop();
    }
  };
  return (
    <SecondaryScreenLayout
      testID="SetDebitCardPinInfoPage"
      onBackPress={handleBackPress}
      title={isChangePinVariant ? content.header : null}
    >
      <Container>
        <IconSvg width={normalize(250)} height={normalize(250)} icon={ICONS.setDebitCardPin} />
        <Title>{content.title}</Title>
        <Description>{content.description}</Description>
        <SetPinButton accessibilityLabel="Set Debit Card Pin" onPress={setDebitCardPin}>
          {content.openForm}
        </SetPinButton>
      </Container>
    </SecondaryScreenLayout>
  );
};

export default SetDebitCardPinInfoPage;
