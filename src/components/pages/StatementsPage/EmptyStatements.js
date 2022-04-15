import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ICONS, NAVIGATION } from '_constants';
import strings from '_localization';
import { normalize } from '_utilities/screen';
import {
  EmptyStatementContainer,
  GoToTransactionsButton,
  Illustration,
  MainTitle,
  SecondaryTitle,
} from './StatementsPage.styles';

const EmptyStatements = () => {
  const { navigate } = useNavigation();

  const navigateToTransactions = () => {
    navigate(NAVIGATION.accounts.transactions);
  };

  return (
    <EmptyStatementContainer>
      <Illustration icon={ICONS.checkEmail} width={normalize(250)} height={normalize(250)} />
      <MainTitle>{strings.statements.empty_main_title}</MainTitle>
      <SecondaryTitle>{strings.statements.empty_secondary_title}</SecondaryTitle>
      <GoToTransactionsButton
        accessibilityLabel="emptyStatementsGoToTransactionsButton"
        onPress={navigateToTransactions}
      >
        {strings.statements.empty_go_to_transactions_button}
      </GoToTransactionsButton>
    </EmptyStatementContainer>
  );
};

export default EmptyStatements;
