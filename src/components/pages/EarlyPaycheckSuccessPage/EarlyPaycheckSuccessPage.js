import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import ENV from 'react-native-config';
import BottomSheet from 'react-native-raw-bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { SecondaryScreenLayout } from '_components/organisms';
import { ICONS, NAVIGATION } from '_constants';
import strings from '_localization';
import { AuthenticationActions, AuthenticationSelectors } from '_store/authentication';
import { normalize } from '_utilities/screen';
import {
  BottomSheetButton,
  BottomTitle,
  Button,
  Card,
  CardBody,
  CardContainer,
  CardTitle,
  Container,
  ContentTitle,
  Description,
  DescriptionLink,
  SheetContainer,
  StatusIcon,
  TextLink,
} from './EarlyPaycheckSuccessPage.styles';

const EarlyPaycheckSuccessPage = () => {
  const { navigate } = useNavigation();
  const bottomSheetRef = useRef(null);
  const dispatch = useDispatch();
  const isSignIn = useSelector(AuthenticationSelectors.getIsSignIn);

  const onPress = () => {
    if (isSignIn) {
      navigate(NAVIGATION.shared.main);
    } else {
      dispatch(AuthenticationActions.setIsSignIn(true));
    }
  };

  const handleLink = () => {
    bottomSheetRef?.current.open();
  };

  return (
    <SecondaryScreenLayout>
      <Container>
        <StatusIcon icon={ICONS.checkmarkLines} width={normalize(60)} height={normalize(60)} />
        <ContentTitle>{strings.earlyPaycheck.success.title}</ContentTitle>
        <Card>
          <StatusIcon
            icon={ICONS.overdraftProtection}
            width={normalize(60)}
            height={normalize(60)}
          />
          <CardContainer>
            <CardTitle>{strings.overdraft.sell.title}</CardTitle>
            <CardBody>
              {strings.formatString(strings.earlyPaycheck.success.description, {
                learnMoreLink: (
                  <TextLink onPress={handleLink}>
                    {strings.earlyPaycheck.success.learnMore}
                  </TextLink>
                ),
              })}
            </CardBody>
          </CardContainer>
        </Card>
        <Button onPress={onPress} testID="earlyPaycheckSuccessButton">
          {strings.earlyPaycheck.success.buttonText}
        </Button>
      </Container>
      <BottomSheet closeOnPressMask height={normalize(480)} ref={bottomSheetRef}>
        <SheetContainer>
          <BottomTitle>{strings.overdraftProtection.successBottomSheet.title}</BottomTitle>
          <Description>{strings.overdraftProtection.successBottomSheet.description}</Description>
          <Description>
            {strings.formatString(strings.overdraftProtection.successBottomSheet.disclaimer, {
              disclaimerLink: (
                <DescriptionLink href={ENV.OVERDRAFT_LEGAL_AGREEMENT_URL}>
                  {strings.overdraftProtection.successBottomSheet.disclaimerLinkText}
                </DescriptionLink>
              ),
            })}
          </Description>
          <BottomSheetButton
            onPress={() => bottomSheetRef.current?.close()}
            testID="overdraftProtectionGotItButton"
          >
            {strings.overdraftProtection.successBottomSheet.buttonText}
          </BottomSheetButton>
        </SheetContainer>
      </BottomSheet>
    </SecondaryScreenLayout>
  );
};

export default EarlyPaycheckSuccessPage;
