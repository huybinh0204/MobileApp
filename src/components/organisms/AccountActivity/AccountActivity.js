import { useTheme } from '@emotion/react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { DateTime } from 'luxon';
import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MainButton, TransactionItem } from '_components/atoms';
import { ListCard, ListItem } from '_components/molecules';
import { NAVIGATION } from '_constants';
import strings from '_localization';
import { AccountActions, AccountSelectors } from '_store/account';
import { ButtonContainer } from './AccountActivity.styles';

const AccountActivity = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const accountExternalId = useSelector(AccountSelectors.getExternalId);
  const isLoading = useSelector(AccountSelectors.getIsLoadingTransactions);
  const transactions = useSelector(AccountSelectors.getTransactions);

  const isTransactionsEmpty = transactions.length === 0;
  const monthToDate = useMemo(() => DateTime.now().minus({ days: 30 }).toISO(), []);

  const navigateToTransactionsList = () => {
    dispatch(AccountActions.cleanTransactions());
    navigate(NAVIGATION.accounts.transactions);
  };

  const fetchRecentTransactions = useCallback(() => {
    if (accountExternalId) {
      dispatch(
        AccountActions.fetchTransactions(accountExternalId, {
          page: 1,
          maxCount: 3,
          startDate: monthToDate,
        })
      );
    }
  }, [accountExternalId, monthToDate, dispatch]);

  useFocusEffect(fetchRecentTransactions);

  return (
    <ListCard title={strings.accounts.nudgeTitle} testID="AccountActivity">
      {isTransactionsEmpty && isLoading && <ActivityIndicator color={colors.alpha500} />}
      {isTransactionsEmpty && !isLoading ? (
        <ListItem color={colors.beta900} title={strings.accounts.nudgeEmptyState} />
      ) : (
        transactions.map((transaction, index) => (
          <TransactionItem
            key={transaction.id}
            isLastItem={index === transactions.length - 1}
            transaction={transaction}
          />
        ))
      )}
      <ButtonContainer isTransactionsEmpty={isTransactionsEmpty}>
        <MainButton onPress={navigateToTransactionsList} variant="secondary">
          {strings.accounts.nudgeActionTitle}
        </MainButton>
      </ButtonContainer>
    </ListCard>
  );
};

export default AccountActivity;
