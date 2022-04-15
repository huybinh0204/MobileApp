import React, { useState } from 'react';
import { WebviewModal } from '_components/organisms';
import strings from '_localization';
import { Container, Content, Description, Illustration, Title } from './FinEdTabPage.styles';
import playlistData from './playlistData';
import PlaylistList from './PlaylistList';

const FinEdTabPage = () => {
  const [isShowWebviewModal, setIsShowWebviewModal] = useState(false);
  const [urlWebview, setUrlWebview] = useState('');

  return (
    <Container testID="FinEdTabPage" edges={['bottom']}>
      <Illustration source={require('_assets/finEd/finEd-background.png')} />
      <Content>
        <Title>{strings.findEd.playlist.title}</Title>
        <Description>{strings.findEd.playlist.description}</Description>
        <PlaylistList
          playlists={playlistData}
          onPressItem={(url) => {
            setIsShowWebviewModal(true);
            setUrlWebview(url);
          }}
        />
      </Content>
      <WebviewModal
        uri={urlWebview}
        modalVisible={isShowWebviewModal}
        onClose={() => setIsShowWebviewModal(false)}
      />
    </Container>
  );
};

export default FinEdTabPage;
