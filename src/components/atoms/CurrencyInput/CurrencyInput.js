import PropTypes from 'prop-types';
import React, { forwardRef, useState } from 'react';
import Money from '_components/atoms/Money/Money';
import { REGEX } from '_constants';
import { HiddenInput, InputContainer } from './CurrencyInput.styles';

const CurrencyInput = forwardRef(({ amountTestID, onChangeValue, value, ...rest }, ref) => {
  const [textAmount, setTextAmount] = useState('');

  const handleChangeText = (newText) => {
    const formattedText = newText.replace(REGEX.leadingZeros, '').replace(REGEX.nonDigits, '');
    const formattedValue = Number(formattedText) / 100;

    setTextAmount(formattedText);
    onChangeValue(formattedValue);
  };

  return (
    <InputContainer>
      <Money value={value} testID={amountTestID} />
      <HiddenInput
        caretHidden
        keyboardType="number-pad"
        maxLength={8}
        onChangeText={handleChangeText}
        ref={ref}
        selectionColor="transparent"
        value={textAmount}
        {...rest}
      />
    </InputContainer>
  );
});

CurrencyInput.propTypes = {
  onChangeValue: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default CurrencyInput;
