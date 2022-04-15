import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Button, colors, Label } from './MainButton.styles';

const MainButton = ({ children, disabled, isLoading, onPress, variant, ...rest }) => {
  const isButtonDisabled = disabled || isLoading;

  return (
    <Button disabled={isButtonDisabled} onPress={onPress} variant={variant} {...rest}>
      {isLoading ? (
        <ActivityIndicator color={colors(isButtonDisabled)[variant].content} />
      ) : (
        <Label disabled={isButtonDisabled} variant={variant}>
          {children}
        </Label>
      )}
    </Button>
  );
};

MainButton.defaultProps = {
  disabled: false,
  isLoading: false,
  variant: 'primary',
};

MainButton.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'link', 'critical']),
};

export default MainButton;
