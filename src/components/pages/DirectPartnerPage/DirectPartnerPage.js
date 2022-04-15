import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { MainButton, IconSvg } from '_components/atoms';
import { SecondaryHeader, WebviewModal } from '_components/organisms';
import strings from '_localization';
import {
  Container,
  DescriptionInfo,
  ImageHeader,
  NamePartner,
  ScrollView,
  TitleInfo,
  Top,
  WrapButton,
  WrapInfo,
  WrappContent,
  LogoContainer,
} from './DirectPartnerPage.styles';
import { normalize } from '_utilities/screen';

const DirectPartnerPage = () => {
  const [isShowWebviewModal, setIsShowWebviewModal] = useState(false);
  const { params } = useRoute();

  const onApply = () => {
    setIsShowWebviewModal(true);
  };
  return (
    <Container>
      <ImageHeader source={params.banner} />
      <Top />
      <SecondaryHeader />
      <WrappContent>
        <LogoContainer>
          <IconSvg icon={params.logo} width={normalize(100)} height={normalize(100)} />
        </LogoContainer>
        <NamePartner>{params.name}</NamePartner>
        <ScrollView>
          <WrapInfo>
            <TitleInfo>{params.title}</TitleInfo>
            <DescriptionInfo>{params.longDescription}</DescriptionInfo>
          </WrapInfo>
          <WrapButton>
            <MainButton onPress={onApply}>{strings.settings.applyNow}</MainButton>
          </WrapButton>
          <WebviewModal
            uri={params.url}
            modalVisible={isShowWebviewModal}
            onClose={() => setIsShowWebviewModal(false)}
          />
        </ScrollView>
      </WrappContent>
    </Container>
  );
};

export default DirectPartnerPage;
