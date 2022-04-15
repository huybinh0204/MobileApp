import PropTypes from 'prop-types';
import React from 'react';
import { Platform } from 'react-native';
import ProgressHeader from '_components/organisms/ProgressHeader/ProgressHeader';
import { Container, Content } from './OnboardingScreenLayout.styles';

const OnboardingScreenLayout = ({
  children,
  step,
  numberOfSteps,
  testID,
  onBackPress,
  showBackButton,
}) => {
  return (
    <Container testID={testID}>
      <ProgressHeader
        step={step}
        numberOfSteps={numberOfSteps}
        onBackPress={onBackPress}
        showBackButton={showBackButton}
      />
      <Content enabled={Platform.OS === 'ios'} behavior="padding">
        {children}
      </Content>
    </Container>
  );
};

OnboardingScreenLayout.defaultProps = {
  numberOfSteps: 10,
  onBackPress: null,
  showBackButton: true,
  testID: 'OnboardingScreenLayout',
};

OnboardingScreenLayout.propTypes = {
  children: PropTypes.node.isRequired,
  step: PropTypes.number.isRequired,
  numberOfSteps: PropTypes.number,
  onBackPress: PropTypes.func,
  showBackButton: PropTypes.bool,
  testID: PropTypes.string,
};

export default OnboardingScreenLayout;
