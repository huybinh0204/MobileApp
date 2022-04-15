import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';

/*
 * Animated.createAnimatedComponent only works with class components
 */
class AnimatedLinearGradient extends React.Component {
  render() {
    return <LinearGradient {...this.props} />;
  }
}

export default Animated.createAnimatedComponent(AnimatedLinearGradient);
