import PropTypes from 'prop-types';
import React from 'react';
import { Cursor } from 'react-native-confirmation-code-field';
import { Cell, CellContainer, Placeholder, Separator } from './SegmentedTextInput.styles';

const CellContent = ({ isFocused, index, placeholder, symbol }) => {
  if (symbol) return symbol;

  if (isFocused) return <Cursor />;

  return placeholder ? <Placeholder>{placeholder[index]}</Placeholder> : null;
};

const SegmentedTextInputCell = ({
  isFocused,
  index,
  onLayout,
  placeholder,
  separatorIndexes,
  symbol,
}) => (
  <>
    <CellContainer key={`value-${index}`} onLayout={onLayout}>
      <Cell>
        <CellContent
          isFocused={isFocused}
          index={index}
          placeholder={placeholder}
          symbol={symbol}
        />
      </Cell>
    </CellContainer>
    {separatorIndexes.includes(index) ? <Separator key={`separator-${index}`} /> : null}
  </>
);

SegmentedTextInputCell.propTypes = {
  placeholder: null,
  separatorIndexes: [],
};

SegmentedTextInputCell.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  onLayout: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  separatorIndexes: PropTypes.arrayOf(PropTypes.number),
  symbol: PropTypes.string.isRequired,
};

export default SegmentedTextInputCell;
