import PropTypes from 'prop-types';
import React from 'react';
import strings from '_localization';
import { formatCurrency, transactionTypes } from '_utilities/currency';
import { castToLocalTZ } from '_utilities/date';
import {
  Container,
  TitleContainer,
  TransactionAmount,
  TransactionSub,
  TransactionTitle,
} from './TransactionItem.styles';

const transactionState = {
  SETTLED: 'SETTLED',
  UNSETTLED: 'UNSETTLED',
};

const TransactionItem = ({ transaction, isLastItem }) => {
  const { id, details, createdDateTime, type, amount, accountTransactionState } = transaction;

  const amountPrefix = type === transactionTypes.CREDIT ? '+' : '-';
  const formattedAmount = `${amountPrefix}${formatCurrency(amount)}`;
  const processing =
    accountTransactionState === transactionState.UNSETTLED
      ? ` - ${strings.accounts.processing}`
      : '';

  return (
    <Container key={id} isLastItem={isLastItem}>
      <TitleContainer>
        <TransactionTitle>{details}</TransactionTitle>
        <TransactionSub>{`${castToLocalTZ(createdDateTime)}${processing}`}</TransactionSub>
      </TitleContainer>
      <TransactionAmount type={type}>{formattedAmount}</TransactionAmount>
    </Container>
  );
};

TransactionItem.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.string,
    details: PropTypes.string,
    createdDateTime: PropTypes.string,
    type: PropTypes.string,
    amount: PropTypes.number,
    accountTransactionState: PropTypes.string,
  }).isRequired,
  isLastItem: PropTypes.bool,
};

TransactionItem.defaultProps = {
  isLastItem: false,
};

export default TransactionItem;
