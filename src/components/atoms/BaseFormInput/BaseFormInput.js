import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import IconSvg from '_components/atoms/IconSvg/IconSvg';
import { normalize } from '_utilities/screen';
import {
  IconLeftContainer,
  IconRightContainer,
  InputContainer,
  TextInput,
} from './BaseFormInput.styles';

const BaseFormInput = memo(({ actionLeft, actionRight, iconLeft, iconRight, ...rest }) => {
  const { colors } = useTheme();

  return (
    <InputContainer>
      {iconLeft ? (
        <TouchableWithoutFeedback onPress={actionLeft}>
          <IconLeftContainer>
            <IconSvg icon={iconLeft} width={normalize(32)} height={normalize(32)} />
          </IconLeftContainer>
        </TouchableWithoutFeedback>
      ) : null}
      <TextInput
        paddingLeft={!!iconLeft}
        paddingRight={!!iconRight}
        placeholderTextColor={colors.beta100}
        allowFontScaling={false}
        {...rest}
      />
      {iconRight ? (
        <TouchableWithoutFeedback onPress={actionRight}>
          <IconRightContainer>
            <IconSvg icon={iconRight} width={normalize(32)} height={normalize(32)} />
          </IconRightContainer>
        </TouchableWithoutFeedback>
      ) : null}
    </InputContainer>
  );
});

BaseFormInput.defaultProps = {
  actionLeft: () => null,
  actionRight: () => null,
  iconLeft: null,
  iconRight: null,
};

BaseFormInput.propTypes = {
  actionLeft: PropTypes.func,
  actionRight: PropTypes.func,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
};

export default BaseFormInput;
