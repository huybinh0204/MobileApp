import { useTheme } from '@emotion/react';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toast, TransactionItem } from '_components/atoms';
import { AccountBalance, ListItem } from '_components/molecules';
import { SecondaryScreenLayout } from '_components/organisms';
import { TOAST_TYPES } from '_constants';
import strings from '_localization';
import { AccountActions, AccountSelectors } from '_store/account';
import { groupTransactionsByMonth } from '_utilities/Account';
import {
  FullPageSpinner,
  NextPageSpinner,
  SectionHeader,
  SectionList,
} from './AccountTransactionsDetailPage.styles';

const AccountTransactionsDetailPage = () => {
  const { colors } = useTheme();
  const { addListener } = useNavigation();
  const dispatch = useDispatch();

  const accountExternalId = useSelector(AccountSelectors.getExternalId);
  const isLoading = useSelector(AccountSelectors.getIsLoadingTransactions);
  const numberOfPages = useSelector(AccountSelectors.getTransactionsNumberOfPages);
  const transactions = useSelector(AccountSelectors.getTransactions);
  const fetchTransactionsError = useSelector(AccountSelectors.getFetchTransactionsError);
  const [page, setPage] = useState(1);

  const fetchNextPage = () => {
    if (page < numberOfPages) {
      setPage((currentPage) => currentPage + 1);
    }
  };

  const handleCloseToast = () => {
    dispatch(AccountActions.setFetchTransactionsError(null));
  };

  useEffect(() => {
    dispatch(AccountActions.fetchTransactions(accountExternalId, { page, maxCount: 15 }));
  }, [dispatch, accountExternalId, page]);

  useEffect(() => {
    return addListener('blur', () => {
      dispatch(AccountActions.cleanTransactions());
    });
  }, [dispatch, addListener]);

  return (
    <SecondaryScreenLayout title={strings.accounts.allActivity} backgroundColor={colors.background}>
      <AccountBalance />
      {isLoading && transactions.length === 0 ? (
        <FullPageSpinner size="small" color={colors.alpha500} />
      ) : (
        <SectionList
          sections={groupTransactionsByMonth(transactions)}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <TransactionItem key={item.id} transaction={item} />}
          renderSectionHeader={({ section: { title } }) => <SectionHeader>{title}</SectionHeader>}
          ListFooterComponent={
            isLoading && <NextPageSpinner size="small" color={colors.alpha500} />
          }
          ListEmptyComponent={
            <ListItem color={colors.beta900} title={strings.accounts.emptyState} />
          }
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.2}
          refreshing={isLoading}
        />
      )}
      <Toast
        header={fetchTransactionsError?.title}
        content={fetchTransactionsError?.description}
        show={fetchTransactionsError !== null}
        onClose={handleCloseToast}
        type={TOAST_TYPES.ERROR}
      />
    </SecondaryScreenLayout>
  );
};

export default AccountTransactionsDetailPage;
