import React from 'react';
import { IconSvg, MainButton } from '_components/atoms';
import { ICONS, NAVIGATION } from '_constants';
import strings from '_localization';
import { normalize } from '_utilities/screen';
import {
  Avatar,
  CloseButton,
  Container,
  Content,
  Description,
  Title,
} from './FinEdWelcomePage.styles';

const FinEdWelcomePage = ({ navigation }) => {
  return (
    <Container>
      <Content>
        <CloseButton onPress={() => navigation.navigate(NAVIGATION.finEd.main)}>
          <IconSvg icon={ICONS.close} width={normalize(24)} height={normalize(24)} />
        </CloseButton>
        <Avatar />
        <Title>{strings.finEdWelcome.title}</Title>
        <Description>{strings.finEdWelcome.description}</Description>
        <MainButton
          onPress={() => navigation.navigate(NAVIGATION.finEd.main)}
          testID="ContinueFinEdWelcome"
        >
          {strings.finEdWelcome.buttonText}
        </MainButton>
      </Content>
    </Container>
  );
};

export default FinEdWelcomePage;
