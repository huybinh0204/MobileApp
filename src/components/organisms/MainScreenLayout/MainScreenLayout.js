import PropTypes from 'prop-types';
import React from 'react';
import { Platform } from 'react-native';
import { MainHeader } from '_components/molecules';
import { Container, Content } from './MainScreenLayout.styles';

const MainScreenLayout = ({
  backgroundColor,
  children,
  showBackButton,
  showMenuButton,
  testID,
  title,
}) => (
  <Container backgroundColor={backgroundColor} testID={testID}>
    <MainHeader showBackButton={showBackButton} showMenuButton={showMenuButton} title={title} />
    <Content enabled={Platform.OS === 'ios'} behavior="padding">
      {children}
    </Content>
  </Container>
);

MainScreenLayout.defaultProps = {
  backgroundColor: null,
  showBackButton: false,
  showMenuButton: true,
  title: null,
};

MainScreenLayout.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  showBackButton: PropTypes.bool,
  showMenuButton: PropTypes.bool,
  testID: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default MainScreenLayout;
