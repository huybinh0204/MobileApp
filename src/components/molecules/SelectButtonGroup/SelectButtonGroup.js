import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { SelectButton } from '_components/atoms';
import { SelectButtonGroupContainer, Spacer } from './SelectButtonGroup.styles';

const SelectButtonGroup = ({ options, onSelect, selectedOption }) => {
  const lastItemIndex = options.length - 1;

  return (
    <SelectButtonGroupContainer>
      {options.map(({ disabled, icon, text, value }, index) => (
        <Fragment key={value}>
          <SelectButton
            icon={icon}
            disabled={disabled}
            selected={selectedOption === value}
            label={text}
            option={value}
            onSelection={onSelect}
            testID={value}
          />
          {index !== lastItemIndex && <Spacer />}
        </Fragment>
      ))}
    </SelectButtonGroupContainer>
  );
};

SelectButtonGroup.defaultProps = {
  defaultOption: null,
};

SelectButtonGroup.propTypes = {
  defaultOption: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      disabled: PropTypes.bool,
      icon: PropTypes.string,
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default SelectButtonGroup;
