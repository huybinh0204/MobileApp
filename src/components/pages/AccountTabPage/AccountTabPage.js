import { useTheme } from '@emotion/react';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from '_components/atoms';
import { AccountBalance } from '_components/molecules';
import {
  AccountActivity,
  AccountInfoNudge,
  LinkedAccounts,
  MainScreenLayout,
} from '_components/organisms';
import { IDENTIFICATION_TYPES, TOAST_TYPES } from '_constants';
import strings from '_localization';
import { AccountActions, AccountSelectors } from '_store/account';
import { CustomerActions, CustomerSelectors } from '_store/customer';
import { Container } from './AccountTabPage.styles';

const AccountTabPage = () => {
  const { spacing } = useTheme();
  const dispatch = useDispatch();

  const accountExternalId = useSelector(AccountSelectors.getExternalId);
  const customerExternalId = useSelector(CustomerSelectors.getExternalId);

  const unlinkAchError = useSelector(AccountSelectors.getUnlinkAchError);
  const unlinkAchSuccess = useSelector(AccountSelectors.getUnlinkAchSuccess);
  const linkAchError = useSelector(AccountSelectors.getLinkAchError);
  const unlinkCardError = useSelector(AccountSelectors.getUnlinkDebitCardError);
  const unlinkCardSuccess = useSelector(AccountSelectors.getUnlinkDebitCardSuccess);
  const fetchTransactionsError = useSelector(AccountSelectors.getFetchTransactionsError);
  const linkedCardsError = useSelector(AccountSelectors.getLinkedCardsError);
  const linkAccountsError = useSelector(AccountSelectors.getLinkAccountsError);

  let message = null;
  let type = TOAST_TYPES.ERROR;

  if (unlinkAchSuccess || unlinkCardSuccess) {
    message = unlinkAchSuccess
      ? strings.linkAccount.unlinkAccountSuccess
      : strings.linkCard.unlinkCardSuccess;
    type = TOAST_TYPES.SUCCESS;
  }

  if (
    unlinkAchError ||
    unlinkCardError ||
    linkAchError ||
    fetchTransactionsError ||
    linkedCardsError ||
    linkAccountsError
  ) {
    message =
      unlinkAchError ||
      linkAchError ||
      fetchTransactionsError ||
      linkedCardsError ||
      linkAccountsError ||
      strings.linkCard.unlinkCardError;
    type = unlinkAchError?.type || TOAST_TYPES.ERROR;
  }

  const showToastSuccess = unlinkCardSuccess || unlinkAchSuccess;
  const showToastError =
    (unlinkCardError ||
      unlinkAchError ||
      linkAchError ||
      fetchTransactionsError ||
      linkedCardsError ||
      linkAccountsError) !== null;

  const fetchData = useCallback(() => {
    if (accountExternalId) {
      dispatch(AccountActions.fetchAccountInfo(accountExternalId));
    }
    if (customerExternalId) {
      dispatch(
        CustomerActions.checkVerificationStatus(
          customerExternalId,
          IDENTIFICATION_TYPES.PHONE_NUMBER
        )
      );
    }
  }, [dispatch, accountExternalId, customerExternalId]);

  useFocusEffect(fetchData);

  const handleCloseUnlinkCardToast = () => {
    dispatch(AccountActions.setUnlinkAchAccountSuccess(false));
    dispatch(AccountActions.setUnlinkDebitCardSuccess(false));
    dispatch(AccountActions.setUnlinkDebitCardError(false));
    dispatch(AccountActions.setUnlinkAchAccountError(null));
    dispatch(AccountActions.setLinkAchAccountError(null));
    dispatch(AccountActions.setFetchTransactionsError(null));
    dispatch(AccountActions.setAccountLinkedCardsError(null));
    dispatch(AccountActions.setLinkAccountsError(null));
  };

  return (
    <MainScreenLayout testID="AccountsTabPage" title={strings.accounts.header}>
      <Container contentContainerStyle={{ paddingBottom: spacing.s }}>
        <AccountBalance />
        <AccountInfoNudge />
        <AccountActivity />
        <LinkedAccounts />
      </Container>
      <Toast
        header={message?.title}
        content={message?.description}
        show={showToastSuccess || showToastError}
        onClose={handleCloseUnlinkCardToast}
        type={type}
      />
    </MainScreenLayout>
  );
};

export default AccountTabPage;
