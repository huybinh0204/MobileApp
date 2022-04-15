import PropTypes from 'prop-types';
import React from 'react';
import {
  TransferDetailsItemContainer,
  TransferDetailsItemText,
} from './TransferDetailsItem.styles';

const TransferDetailsItem = ({ label, value, isLastItem }) => {
  return (
    <TransferDetailsItemContainer isLastItem={isLastItem}>
      <TransferDetailsItemText>{label}</TransferDetailsItemText>
      <TransferDetailsItemText>{value}</TransferDetailsItemText>
    </TransferDetailsItemContainer>
  );
};

TransferDetailsItem.defaultProps = {
  isLastItem: false,
};

TransferDetailsItem.propTypes = {
  isLastItem: PropTypes.bool,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default TransferDetailsItem;
