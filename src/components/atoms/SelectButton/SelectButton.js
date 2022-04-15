import PropTypes from 'prop-types';
import React from 'react';
import { normalize } from '_utilities/screen';
import { Button, Icon, Text } from './SelectButton.styles';

const SelectButton = ({ icon, disabled, selected, label, option, onSelection, ...rest }) => {
  const handlePress = () => {
    onSelection(option);
  };

  return (
    <Button
      activeOpacity={0.5}
      disabled={disabled}
      selected={selected}
      onPress={handlePress}
      {...rest}
    >
      {icon && (
        <Icon testId="SelectButtonIcon" icon={icon} width={normalize(25)} height={normalize(25)} />
      )}
      <Text>{label}</Text>
    </Button>
  );
};

SelectButton.defaultProps = {
  icon: null,
  disabled: false,
  selected: false,
};

SelectButton.propTypes = {
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  label: PropTypes.string.isRequired,
  option: PropTypes.string.isRequired,
  onSelection: PropTypes.func.isRequired,
};

export default SelectButton;
