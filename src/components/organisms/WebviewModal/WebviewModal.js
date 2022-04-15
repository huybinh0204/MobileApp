import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-native';
import { WebView } from 'react-native-webview';
import { IconSvg } from '_components/atoms';
import { ICONS } from '_constants';
import strings from '_localization';
import { normalize } from '_utilities/screen';
import {
  Container,
  Content,
  DoneText,
  Header,
  HeaderButton,
  LoadingIndicator,
} from './WebviewModal.styles';

const WebviewModal = ({ uri, modalVisible, onClose }) => {
  const [navState, setNavState] = useState({});
  const webViewRef = useRef(null);
  const { colors } = useTheme();
  const activeButtonColor = colors.blue100;
  const inactiveButtonColor = colors.gray100;

  const [colorButtonBack, setColorButtonBack] = useState(colors.gray100);
  const [colorButtonForward, setColorButtonForward] = useState(colors.gray100);

  useEffect(() => {
    setColorButtonBack(navState.canGoBack ? activeButtonColor : inactiveButtonColor);
    setColorButtonForward(navState.canGoForward ? activeButtonColor : inactiveButtonColor);
  }, [navState, activeButtonColor, inactiveButtonColor]);

  const sizeIcon = normalize(20);
  const goback = () => {
    navState.canGoBack && webViewRef.current.goBack();
  };
  const goForward = () => {
    navState.canGoForward && webViewRef.current.goForward();
  };
  const reload = () => {
    webViewRef.current.reload();
  };
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={onClose}
      presentationStyle="pageSheet"
    >
      <Container>
        <Header>
          <HeaderButton disabled={!navState.canGoBack} onPress={goback}>
            <IconSvg
              fill={colorButtonBack}
              icon={ICONS.angleLeft}
              width={sizeIcon}
              height={sizeIcon}
            />
          </HeaderButton>
          <HeaderButton disabled={!navState.canGoForward} onPress={goForward}>
            <IconSvg
              fill={colorButtonForward}
              icon={ICONS.angleRight}
              width={sizeIcon}
              height={sizeIcon}
            />
          </HeaderButton>
          <HeaderButton activeOpacity={1} onPress={reload}>
            <IconSvg fill={colors.blue100} icon={ICONS.reload} width={sizeIcon} height={sizeIcon} />
          </HeaderButton>
          <HeaderButton onPress={onClose}>
            <DoneText>{strings.done}</DoneText>
          </HeaderButton>
        </Header>
        <Content>
          <WebView
            ref={webViewRef}
            startInLoadingState
            bounces={false}
            renderLoading={() => <LoadingIndicator color={colors.alpha500} size="large" />}
            source={{ uri }}
            onNavigationStateChange={setNavState}
            onLoadEnd={setNavState}
          />
        </Content>
      </Container>
    </Modal>
  );
};

WebviewModal.propTypes = {
  uri: PropTypes.string.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default WebviewModal;
