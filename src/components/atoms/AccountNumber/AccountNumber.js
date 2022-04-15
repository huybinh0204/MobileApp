import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import strings from '_localization';
import { FundDirectDepositStoreSelectors } from '_store/pageStore/fundDirectDepositStore';
import { AccountTitle, AccountValue, Container, Item } from './AccountNumber.styles';

const AccountNumber = ({ onPressAccount, onPressRouting, showAccountNumber }) => {
  const { accountNumber, routingNumber } = useSelector(
    FundDirectDepositStoreSelectors.getRenderData
  );

  const formatAccountNumber = () => {
    if (showAccountNumber) {
      return accountNumber;
    }
    return accountNumber ? `${accountNumber?.slice(0, 3)} ••• •••` : '-';
  };

  const formatRoutingNumber = () => {
    return routingNumber
      ? `${routingNumber?.slice(0, 3)} ${routingNumber?.slice(3, 6)} ${routingNumber?.slice(6, 9)}`
      : '-';
  };

  return (
    <Container>
      <Item>
        <AccountTitle>{strings.routing}</AccountTitle>
        <TouchableOpacity
          testID="routingButton"
          disabled={!onPressRouting}
          onPress={() => onPressRouting({ routingNumber })}
        >
          <AccountValue>{formatRoutingNumber()}</AccountValue>
        </TouchableOpacity>
      </Item>
      <Item>
        <AccountTitle>{strings.account}</AccountTitle>
        <TouchableOpacity
          testID="accountButton"
          disabled={!onPressAccount}
          onPress={() => onPressAccount({ accountNumber })}
        >
          <AccountValue>{formatAccountNumber()}</AccountValue>
        </TouchableOpacity>
      </Item>
    </Container>
  );
};

AccountNumber.propTypes = {
  onPressRouting: PropTypes.func,
  onPressAccount: PropTypes.func,
  showAccountNumber: PropTypes.bool,
};

AccountNumber.defaultProps = {
  onPressRouting: null,
  onPressAccount: null,
  showAccountNumber: false,
};

export default AccountNumber;
