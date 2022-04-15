import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { MainButton } from '_components/atoms';
import { NAVIGATION } from '_constants';
import strings from '_localization';
import {
  Container,
  Content,
  Description,
  Illustration,
  Legal,
  Title,
} from './WelcomeToKinlyPage.styles';

const WelcomeToKinlyPage = () => {
  const { addListener, navigate } = useNavigation();

  const goToFundScreen = () => {
    navigate(NAVIGATION.auth.fundChoice);
  };

  useFocusEffect(
    useCallback(() => {
      return addListener('beforeRemove', (event) => {
        event.preventDefault(); // Disables go back
      });
    }, [addListener])
  );

  return (
    <Container edges={['bottom']} testID="WelcomeToKinlyPage">
      <Illustration source={require('_assets/illustrations/welcome-to-kinly-illustration.jpg')} />
      <Content>
        <Title>{strings.signUp.welcomeToKinly.title}</Title>
        <Description>{strings.signUp.welcomeToKinly.description}</Description>
        <Legal>{strings.signUp.welcomeToKinly.legal}</Legal>
        <MainButton accessibilityLabel="Continue" onPress={goToFundScreen}>
          {strings.signUp.continue}
        </MainButton>
      </Content>
    </Container>
  );
};

export default WelcomeToKinlyPage;
