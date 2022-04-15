import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import React, { forwardRef, memo, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Easing, interpolate, interpolateColors, timing, useValue } from 'react-native-reanimated';
import { normalize } from '_utilities/screen';
import { AnimatedBackground, Container, Icon, Placeholder, TextInput } from './Input.styles';

const Input = forwardRef(
  ({ error, icon, onBlur, onFocus, onIconPress, placeholder, value, ...rest }, ref) => {
    const theme = useTheme();
    const valueAnimation = useValue(value ? 1 : 0);
    const focusAnimation = useValue(0);
    const [labelWidth, setLabelWidth] = useState(0);

    const {
      beta200,
      beta500,
      epsilon200,
      epsilon500,
      alpha500,
      gradientSunset7Color1,
      gradientSunset7Color2,
    } = theme.colors;

    const handleBlur = () => {
      if (!value) {
        timing(valueAnimation, { toValue: 0, duration: 150, easing: Easing.ease }).start();
      }

      timing(focusAnimation, { toValue: 0, duration: 200, easing: Easing.ease }).start();
      onBlur?.();
    };

    const handleFocus = () => {
      if (!value) {
        timing(valueAnimation, { toValue: 1, duration: 150, easing: Easing.ease }).start();
      }

      timing(focusAnimation, { toValue: 1, duration: 200, easing: Easing.ease }).start();
      onFocus?.();
    };

    const measureLabelWidth = ({ nativeEvent }) => {
      setLabelWidth(nativeEvent.layout.width);
    };

    const borderColor = interpolateColors(focusAnimation, {
      inputRange: [0, 1],
      outputColorRange: [beta200, alpha500],
    });

    const labelColor = interpolateColors(valueAnimation, {
      inputRange: [0, 1],
      outputColorRange: [error ? epsilon200 : beta200, error ? epsilon500 : beta500],
    });

    const backgroundOpacity = interpolate(focusAnimation, {
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const scale = interpolate(valueAnimation, {
      inputRange: [0, 1],
      outputRange: [1, 0.7],
    });

    /*
     * since we're scaling the text but the center keep unchanged,
     * we need to translate half of the subtracted width as well
     */
    const translateX = interpolate(valueAnimation, {
      inputRange: [0, 1],
      outputRange: [0, -labelWidth * 0.15],
    });

    const translateY = interpolate(valueAnimation, {
      inputRange: [0, 1],
      outputRange: [-theme.spacing.s, -theme.spacing.m],
    });

    return (
      <Container style={{ borderColor }}>
        <AnimatedBackground
          colors={[gradientSunset7Color1, gradientSunset7Color2]}
          start={{ x: 0.25, y: 0.5 }}
          end={{ x: 0.75, y: 0.5 }}
          style={{ opacity: backgroundOpacity }}
        />
        <Placeholder
          onLayout={measureLabelWidth}
          style={{ color: labelColor, transform: [{ translateY }, { translateX }, { scale }] }}
          variant="animated"
        >
          {placeholder}
        </Placeholder>
        <TextInput onBlur={handleBlur} onFocus={handleFocus} value={value} ref={ref} {...rest} />
        {icon && (
          <TouchableWithoutFeedback onPress={onIconPress}>
            <Icon icon={icon} width={normalize(26)} height={normalize(26)} />
          </TouchableWithoutFeedback>
        )}
      </Container>
    );
  }
);

Input.defaultProps = {
  icon: null,
};

Input.propTypes = {
  icon: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onIconPress: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default memo(Input);
