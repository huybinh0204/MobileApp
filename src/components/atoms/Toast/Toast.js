import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { Easing, useValue } from 'react-native-reanimated';
import IconSvg from '_components/atoms/IconSvg/IconSvg';
import { ICONS, TOAST_TYPES } from '_constants';
import { normalize } from '_utilities/screen';
import {
  Body,
  CloseIcon,
  Container,
  Header,
  Title,
  ToastCard,
  toastVariants,
} from './Toast.styles';

const Toast = ({
  content,
  duration,
  header,
  offset,
  onClose,
  paddingHorizontal,
  show,
  type,
  ...rest
}) => {
  const { addListener } = useNavigation();
  const animation = useValue(0);
  const [height, setHeight] = useState(0);

  const opacity = show ? 1 : 0;

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [2 * height, -offset],
  });

  const measureToastHeight = ({ nativeEvent }) => {
    setHeight(nativeEvent.layout.height);
  };

  const showToast = useCallback(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 200,
      easing: Easing.ease,
    }).start();
  }, [animation]);

  const hideToast = useCallback(() => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 250,
      easing: Easing.in(Easing.ease),
    }).start(({ finished }) => {
      if (finished && onClose) {
        onClose();
      }
    });
  }, [animation, onClose]);

  useEffect(() => {
    let timer;
    let unsubscribe;

    if (show) {
      showToast();
      timer = setTimeout(hideToast, duration);
      unsubscribe = addListener('blur', hideToast);
    }

    return () => {
      clearTimeout(timer);
      unsubscribe?.();
    };
  }, [addListener, duration, hideToast, show, showToast]);

  return (
    <Container
      onLayout={measureToastHeight}
      paddingHorizontal={paddingHorizontal}
      style={{ opacity, transform: [{ translateY }] }}
      {...rest}
    >
      <ToastCard type={type}>
        <Header testID="toastHeader">
          <IconSvg icon={toastVariants[type].icon} width={normalize(20)} height={normalize(20)} />
          <Title numberOfLines={2} type={type}>
            {header}
          </Title>
          <TouchableOpacity
            accessibilityLabel="Close toast"
            accessibilityRole="button"
            testID="toastCloseButton"
            onPress={hideToast}
          >
            <CloseIcon icon={ICONS.closeWhite} type={type} />
          </TouchableOpacity>
        </Header>
        {content ? <Body type={type}>{content}</Body> : null}
      </ToastCard>
    </Container>
  );
};

Toast.defaultProps = {
  content: null,
  header: null,
  duration: 5000,
  offset: normalize(20),
  onClose: null,
  paddingHorizontal: null,
  type: TOAST_TYPES.ERROR,
};

Toast.propTypes = {
  content: PropTypes.string,
  duration: PropTypes.number,
  header: PropTypes.string,
  offset: PropTypes.number,
  onClose: PropTypes.func,
  paddingHorizontal: PropTypes.number,
  show: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(Object.values(TOAST_TYPES)),
};

export default Toast;
