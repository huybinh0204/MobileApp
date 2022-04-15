import PropTypes from 'prop-types';
import React from 'react';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import SegmentedTextInputCell from './SegmentedTextInputCell';

const SegmentedTextInput = ({
  cellCount,
  placeholder,
  separatorIndexes,
  setValue,
  value,
  ...rest
}) => {
  const ref = useBlurOnFulfill({ value, cellCount });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  return (
    <CodeField
      {...rest}
      {...props}
      ref={ref}
      cellCount={cellCount}
      onChangeText={setValue}
      value={value}
      renderCell={({ index, symbol, isFocused }) => (
        <SegmentedTextInputCell
          isFocused={isFocused}
          index={index}
          key={index}
          onLayout={getCellOnLayoutHandler(index)}
          placeholder={placeholder}
          separatorIndexes={separatorIndexes}
          symbol={symbol}
        />
      )}
    />
  );
};

SegmentedTextInput.defaultProps = {
  placeholder: null,
  separatorIndexes: [],
};

SegmentedTextInput.propTypes = {
  cellCount: PropTypes.number.isRequired,
  placeholder: PropTypes.string,
  separatorIndexes: PropTypes.arrayOf(PropTypes.number),
  setValue: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default SegmentedTextInput;
