import PropTypes from 'prop-types';
import React from 'react';
import strings from '_localization';
import { formatCurrency } from '_utilities/currency';
import { BalanceText } from './Balance.styles';

const Balance = ({ amount, typography, placeholder }) => {
  const formattedBalance = amount !== null ? formatCurrency(amount) : placeholder;
  const isNegative = amount < 0;

  return (
    <BalanceText isNegative={isNegative} typography={typography}>
      {formattedBalance}
    </BalanceText>
  );
};

Balance.defaultProps = {
  amount: null,
  placeholder: `${strings.currencySymbol}-`,
  typography: 'heading1',
};

Balance.propTypes = {
  amount: PropTypes.number,
  placeholder: PropTypes.string,
  typography: PropTypes.string,
};

export default Balance;
