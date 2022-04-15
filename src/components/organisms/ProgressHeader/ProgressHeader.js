import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { IconSvg, ProgressBar } from '_components/atoms';
import { ICONS } from '_constants';
import { normalize } from '_utilities/screen';
import { ActionButton, HeaderContainer, ProgressBarContainer } from './ProgressHeader.styles';

const ProgressHeader = ({
  step,
  numberOfSteps,
  onBackPress,
  onRightItemPress,
  rightItem,
  rightItemTestID,
  showBackButton,
}) => {
  const { goBack } = useNavigation();

  return (
    <HeaderContainer>
      {showBackButton && (
        <ActionButton onPress={onBackPress ?? goBack} side="left" testID="BackButton">
          <IconSvg icon={ICONS.backIcon} width={normalize(25)} height={normalize(25)} />
        </ActionButton>
      )}
      <ProgressBarContainer>
        <ProgressBar step={step} numberOfSteps={numberOfSteps} />
      </ProgressBarContainer>
      {rightItem && (
        <ActionButton onPress={onRightItemPress} side="right" testID={rightItemTestID}>
          <IconSvg icon={rightItem} width={normalize(25)} height={normalize(25)} />
        </ActionButton>
      )}
    </HeaderContainer>
  );
};

ProgressHeader.defaultProps = {
  numberOfSteps: 10,
  onBackPress: null,
  onRightItemPress: null,
  rightItem: null,
  rightItemTestID: null,
  showBackButton: true,
};

ProgressHeader.propTypes = {
  step: PropTypes.number.isRequired,
  numberOfSteps: PropTypes.number,
  onBackPress: PropTypes.func,
  onRightItemPress: PropTypes.func,
  rightItem: PropTypes.string,
  rightItemTestID: PropTypes.string,
  showBackButton: PropTypes.bool,
};

export default ProgressHeader;
