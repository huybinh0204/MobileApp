import React from 'react';
import { ListCard } from '_components/molecules';
import strings from '_localization';
import { Separator } from './LinkedAccounts.styles';
import LinkedBankAccount from './LinkedBankAccount';
import LinkedDebitCard from './LinkedDebitCard';

const LinkedAccounts = () => (
  <ListCard title={strings.account_linked_accounts}>
    <LinkedBankAccount />
    <Separator />
    <LinkedDebitCard />
  </ListCard>
);

export default LinkedAccounts;
