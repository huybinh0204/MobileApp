import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { IconSvg } from '_components/atoms';
import { ICONS } from '_constants';
import { normalize } from '_utilities/screen';
import { ActionButton, HeaderContainer, HeaderTitle } from './SecondaryHeader.styles';

const SecondaryHeader = ({
  onBackPress,
  onRightItemPress,
  rightItem,
  rightItemTestID,
  showBackButton,
  title,
}) => {
  const { goBack } = useNavigation();

  return (
    <HeaderContainer>
      {showBackButton && (
        <ActionButton onPress={onBackPress ?? goBack} side="left" testID="BackButton">
          <IconSvg icon={ICONS.backIcon} width={normalize(25)} height={normalize(25)} />
        </ActionButton>
      )}
      {title !== null && <HeaderTitle>{title}</HeaderTitle>}
      {rightItem && (
        <ActionButton onPress={onRightItemPress} side="right" testID={rightItemTestID}>
          <IconSvg icon={rightItem} width={normalize(25)} height={normalize(25)} />
        </ActionButton>
      )}
    </HeaderContainer>
  );
};

SecondaryHeader.defaultProps = {
  onBackPress: null,
  onRightItemPress: () => {},
  rightItem: null,
  rightItemTestID: null,
  showBackButton: true,
  title: null,
};

SecondaryHeader.propTypes = {
  onBackPress: PropTypes.func,
  onRightItemPress: PropTypes.func,
  rightItem: PropTypes.string,
  rightItemTestID: PropTypes.string,
  showBackButton: PropTypes.bool,
  title: PropTypes.string,
};

export default SecondaryHeader;
