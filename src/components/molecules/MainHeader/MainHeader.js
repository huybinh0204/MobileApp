import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { IconSvg } from '_components/atoms';
import { ICONS, NAVIGATION } from '_constants';
import { normalize } from '_utilities/screen';
import { ActionButton, Container, HeaderTitle } from './MainHeader.styles';

const MainHeader = ({ showBackButton, showMenuButton, title }) => {
  const { navigate, goBack } = useNavigation();

  return (
    <Container>
      {showBackButton && (
        <ActionButton testID="BackButton" onPress={goBack}>
          <IconSvg icon={ICONS.backIcon} width={normalize(25)} height={normalize(25)} />
        </ActionButton>
      )}
      {showMenuButton && (
        <ActionButton testID="MenuButton" onPress={() => navigate(NAVIGATION.settings.main)}>
          <IconSvg icon={ICONS.menu} width={normalize(30)} height={normalize(30)} />
        </ActionButton>
      )}
      {title ? (
        <HeaderTitle>{title}</HeaderTitle>
      ) : (
        <IconSvg icon={ICONS.logo} width={normalize(35)} height={normalize(35)} />
      )}
    </Container>
  );
};

MainHeader.defaultProps = {
  showBackButton: false,
  showMenuButton: true,
  title: null,
};

MainHeader.propTypes = {
  showBackButton: PropTypes.bool,
  showMenuButton: PropTypes.bool,
  title: PropTypes.string,
};

export default MainHeader;
