import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import React from 'react';
import { Switch as RNSwitch } from 'react-native';

export const Switch = (props) => {
  const { colors } = useTheme();

  return (
    <RNSwitch
      trackColor={{ false: colors.beta100, true: colors.alpha500 }}
      thumbColor={colors.white}
      ios_backgroundColor={colors.beta100}
      {...props}
    />
  );
};

Switch.defaultProps = {
  value: false,
  disabled: false,
};

Switch.propTypes = {
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  onValueChange: PropTypes.func,
};

export default Switch;
