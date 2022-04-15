import React from 'react';
import { useSelector } from 'react-redux';
import { Balance } from '_components/atoms';
import strings from '_localization';
import { AccountSelectors } from '_store/account';
import { BalanceContainer, Description } from './AccountBalance.styles';

const AccountBalance = () => {
  const accountInfo = useSelector(AccountSelectors.getAccountInfo);

  return (
    <BalanceContainer>
      <Balance amount={accountInfo?.balance} />
      <Description>{strings.accountInfo.balanceTitle}</Description>
    </BalanceContainer>
  );
};

export default AccountBalance;
