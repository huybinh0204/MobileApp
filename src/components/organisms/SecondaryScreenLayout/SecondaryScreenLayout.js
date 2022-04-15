import PropTypes from 'prop-types';
import React from 'react';
import { Platform } from 'react-native';
import SecondaryHeader from '_components/organisms/SecondaryHeader/SecondaryHeader';
import { Container, Content } from './SecondaryScreenLayout.styles';

const SecondaryScreenLayout = ({
  backgroundColor,
  children,
  testID,
  title,
  onBackPress,
  showBackButton,
}) => {
  return (
    <Container backgroundColor={backgroundColor} testID={testID}>
      <SecondaryHeader title={title} onBackPress={onBackPress} showBackButton={showBackButton} />
      <Content enabled={Platform.OS === 'ios'} behavior="padding">
        {children}
      </Content>
    </Container>
  );
};

SecondaryScreenLayout.defaultProps = {
  backgroundColor: null,
  onBackPress: null,
  showBackButton: true,
  testID: 'SecondaryScreenLayout',
  title: null,
};

SecondaryScreenLayout.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  onBackPress: PropTypes.func,
  showBackButton: PropTypes.bool,
  testID: PropTypes.string,
  title: PropTypes.string,
};

export default SecondaryScreenLayout;
