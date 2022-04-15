import PropTypes from 'prop-types';
import React from 'react';
import { formatCurrency } from '_utilities/currency';
import { MoneyAmount } from './Money.styles';

const Money = ({ value, testID }) => {
  const moneyValue = formatCurrency(value);

  return (
    <MoneyAmount isZero={value === 0} numberOfLines={1} testID={testID}>
      {moneyValue}
    </MoneyAmount>
  );
};

Money.defaultProps = {
  value: 0,
  testID: 'Money',
};

Money.propTypes = {
  value: PropTypes.number,
  testID: PropTypes.string,
};

export default Money;
