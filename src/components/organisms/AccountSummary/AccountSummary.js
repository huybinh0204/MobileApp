import { useNavigation } from '@react-navigation/core';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Balance } from '_components/atoms';
import { ICONS, NAVIGATION } from '_constants';
import strings from '_localization';
import { AccountSelectors } from '_store/account';
import { CustomerSelectors } from '_store/customer';
import { getTimeBlock } from '_utilities/date';
import { normalize } from '_utilities/screen';
import {
  BankAccountLabel,
  Column,
  Container,
  Content,
  Greeting,
  Illustration,
  UserName,
  ViewAccountButton,
} from './AccountSummary.styles';

const AccountSummary = () => {
  const { navigate } = useNavigation();

  const account = useSelector(AccountSelectors.getAccountInfo);
  const customer = useSelector(CustomerSelectors.getCustomer);
  const dayTime = useMemo(() => getTimeBlock(), []);

  const navigateToAccount = () => {
    navigate(NAVIGATION.accounts.stack, { screen: NAVIGATION.accounts.main });
  };

  return (
    <Container testID="AccountSummary">
      <Greeting>
        {strings.home.greeting[dayTime]} <UserName>{customer?.firstName}</UserName>
      </Greeting>
      <Content>
        <Column>
          <BankAccountLabel>{strings.home.accountBalance}</BankAccountLabel>
          <Balance
            testID="AccountSummaryBalance"
            amount={account?.balance}
            typography="heading3"
            placeholder={`${strings.currencySymbol}--.--`}
          />
          <ViewAccountButton onPress={navigateToAccount}>
            {strings.home.viewAccountButton}
          </ViewAccountButton>
        </Column>
        <Column>
          <Illustration
            icon={ICONS.accountSummary}
            height={normalize(125)}
            width={normalize(150)}
          />
        </Column>
      </Content>
    </Container>
  );
};

export default AccountSummary;
