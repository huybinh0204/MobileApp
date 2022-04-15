import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import Animated from 'react-native-reanimated';

const BaseText = ({ children, variant, ...props }) => {
  const TextComponent = variant === 'animated' ? Animated.Text : Text;
  return <TextComponent {...props}>{children}</TextComponent>;
};

BaseText.propTypes = {
  allowFontScaling: PropTypes.bool,
  variant: PropTypes.any,
};

BaseText.defaultProps = {
  allowFontScaling: false,
  variant: 'normal',
};

export default BaseText;
