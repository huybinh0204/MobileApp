import PropTypes from 'prop-types';
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBarContainer } from './CustomStatusBar.styles';

const CustomStatusBar = ({ backgroundColor, ...props }) => {
  return Platform.OS === 'ios' ? (
    <StatusBarContainer backgroundColor={backgroundColor}>
      <SafeAreaView edges={['top']}>
        <StatusBar backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </StatusBarContainer>
  ) : (
    <StatusBar backgroundColor={backgroundColor} {...props} />
  );
};

CustomStatusBar.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
};

export default CustomStatusBar;
