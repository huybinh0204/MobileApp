import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { Bar, Progress } from './ProgressBar.styles';

const ProgressBar = ({ step, numberOfSteps }) => {
  const prevStep = Math.min(0, step - 1);
  const { current: progress } = useRef(new Animated.Value(prevStep));

  const width = progress.interpolate({
    inputRange: [0, numberOfSteps],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    Animated.timing(progress, {
      easing: Easing.ease,
      duration: 600,
      toValue: step,
      useNativeDriver: false,
    }).start();
  }, [progress, step]);

  return (
    <Bar>
      <Progress style={{ width }} />
    </Bar>
  );
};

ProgressBar.propTypes = {
  step: PropTypes.number.isRequired,
  numberOfSteps: PropTypes.number.isRequired,
};

export default ProgressBar;
