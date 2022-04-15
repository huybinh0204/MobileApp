import { Dynatrace } from '@dynatrace/react-native-plugin';
import { call, put } from 'redux-saga/effects';
import { EVENTS, EVENT_TYPES, OverdraftState } from '_constants';
import strings from '_localization';
import AppsFlyerService from '_services/AppsFlyerService';
import { RegisterActions } from '_store/register';
import { formatAccountList } from '_utilities/Account';
import { shouldReportError } from '_utilities/dynatrace';
import { AccountActions } from './account_reducer';

export function* linkAchAccount(api, action) {
  const { achData, externalId } = action;
  try {
    yield put(AccountActions.setIsLoadingAchAccount(true));
    yield call(api.linkAch, { ...achData, externalId });
    const { data } = yield call(api.getLinkedAccounts, externalId);
    yield put(AccountActions.getLinkAccountsSuccess(formatAccountList(data.accounts)));
    yield put(AccountActions.setLinkAchAccountSuccess(true));
    yield put(
      RegisterActions.trackEvent(EVENTS.ACCOUNT_ACH_LINK_SUCCESS, EVENT_TYPES.TRACK, {
        account_type: 'bank',
      })
    );
  } catch (e) {
    const errorMessage = e?.errorMessage ?? strings.linkAccount.linkAccountError;
    yield put(AccountActions.setLinkAchAccountError(errorMessage));
    if (shouldReportError(e?.status)) {
      yield call(Dynatrace.reportError, `Link Ach Account Error: ${JSON.stringify(e)}`, 0);
    }
  } finally {
    yield put(AccountActions.setIsLoadingAchAccount(false));
  }
}

export function* getLinkAccounts(api, action) {
  const { externalId } = action;
  try {
    const { data } = yield call(api.getLinkedAccounts, externalId);
    yield put(AccountActions.getLinkAccountsSuccess(formatAccountList(data.accounts)));
  } catch (e) {
    yield put(AccountActions.setLinkAccountsError(strings.accounts.linkAccounts.error));
    if (shouldReportError(e?.status)) {
      yield call(Dynatrace.reportError, `Fetch Linked Accounts Error: ${JSON.stringify(e)}`, 0);
    }
  }
}

export function* fetchAccountInfo(api, action) {
  const { externalId } = action;
  try {
    yield put(AccountActions.setIsLoadingAccountInfo(true));
    const { data: accountInfo } = yield call(api.fetchAccountInfo, externalId);
    yield put(AccountActions.setFetchAccountInfoSuccess(accountInfo));
  } catch (e) {
    const errorMessage = e?.errorMessage ?? strings.accounts.accountInfo.error;
    yield put(AccountActions.setFetchAccountInfoError(errorMessage));
    if (shouldReportError(e?.status)) {
      yield call(Dynatrace.reportError, `Fetch Account Info Error: ${JSON.stringify(e)}`, 0);
    }
  } finally {
    yield put(AccountActions.setIsLoadingAccountInfo(false));
  }
}

export function* linkCard(api, action) {
  const { externalId, data } = action;
  try {
    yield call(api.addAccountCard, externalId, data);
    yield put(AccountActions.setLinkCardSuccess(true));
    yield put(AccountActions.getAccountLinkedCards(externalId));
  } catch (e) {
    const errorMessage = e?.errorMessage ?? strings.linkCard.error;
    yield put(AccountActions.setLinkCardError(errorMessage));
    if (shouldReportError(e?.status)) {
      yield call(Dynatrace.reportError, `Link Card Error: ${JSON.stringify(e)}`, 0);
    }
  }
}

export function* fetchTransactions(api, action) {
  const { externalId, filters } = action;
  try {
    yield put(AccountActions.setIsLoadingTransactions(true));
    const { data } = yield call(api.fetchTransactions, externalId, filters);
    const { transactions, numberOfPages } = data;
    if (filters.maxCount === 3) {
      yield put(AccountActions.setFetchPreviewTransactionsSuccess(transactions));
    } else {
      yield put(AccountActions.setFetchTransactionsSuccess(transactions, numberOfPages));
    }
  } catch (e) {
    const errorMessage = e?.errorMessage ?? strings.accounts.transactions.error;
    yield put(AccountActions.setFetchTransactionsError(errorMessage));
    if (shouldReportError(e?.status)) {
      yield call(Dynatrace.reportError, `Fetch Transactions Error: ${JSON.stringify(e)}`, 0);
    }
  } finally {
    yield put(AccountActions.setIsLoadingTransactions(false));
  }
}

export function* fetchKinlyDebitCards(api, action) {
  const { externalId } = action;
  try {
    yield put(AccountActions.setIsLoadingKinlyDebitCards(true));
    const { data: kinlyDebitCards } = yield call(api.fetchKinlyDebitCards, externalId);
    yield put(AccountActions.setFetchKinlyDebitCardsSuccess(kinlyDebitCards));
  } catch (e) {
    const errorMessage = e?.errorMessage ?? strings.accounts.kinlyDebitCards.error;
    yield put(AccountActions.setFetchKinlyDebitCardsError(errorMessage));
    if (shouldReportError(e?.status)) {
      yield call(Dynatrace.reportError, `Fetch Transactions Error: ${JSON.stringify(e)}`, 0);
    }
  } finally {
    yield put(AccountActions.setIsLoadingKinlyDebitCards(false));
  }
}

export function* getAccountLinkedCards(api, action) {
  const { externalId } = action;
  try {
    const { data } = yield call(api.getAccountLinkedCards, externalId);
    yield put(AccountActions.getAccountLinkedCardsSuccess(data.linkedDebitCards));
  } catch (e) {
    yield put(AccountActions.setAccountLinkedCardsError(strings.accounts.linkDebitCards.error));
    if (shouldReportError(e?.status)) {
      yield call(Dynatrace.reportError, `Fetch Linked Cards Error: ${JSON.stringify(e)}`, 0);
    }
  }
}

export function* unlinkAch(api, action) {
  const { externalId, achAccountId } = action;
  try {
    yield put(AccountActions.setIsLoadingUnlinkAchAccount(true));
    yield call(api.unlinkAch, externalId, achAccountId);
    yield put(AccountActions.setUnlinkAchAccountSuccess(true));
    yield put(AccountActions.removeUnlinkedAchAccount(achAccountId));
    yield put(RegisterActions.trackEvent(EVENTS.ACCOUNT_ACH_UNLINK_SUCCESS, EVENT_TYPES.TRACK));
  } catch (e) {
    const errorMessage = e?.errorMessage ?? strings.linkAccount.unlinkAccountError;
    yield put(AccountActions.setUnlinkAchAccountError(errorMessage));
    if (shouldReportError(e?.status)) {
      yield call(Dynatrace.reportError, `UnlinkAchAccount Error: ${JSON.stringify(e)}`, 0);
    }
  } finally {
    yield put(AccountActions.setIsLoadingUnlinkAchAccount(false));
  }
}

export function* unlinkAccountCard(api, action) {
  const { externalId, cardId } = action;
  try {
    yield put(AccountActions.setIsLoadingUnlinkDebitCard(true));
    yield call(api.unlinkAccountCard, externalId, cardId);
    yield put(AccountActions.removeUnlinkedDebitCard(cardId));
    yield put(AccountActions.setUnlinkDebitCardSuccess(true));
    yield put(
      RegisterActions.trackEvent(EVENTS.ACCOUNT_DEBIT_CARD_UNLINK_SUCCESS, EVENT_TYPES.TRACK)
    );
  } catch (e) {
    yield put(AccountActions.setUnlinkDebitCardError(true));
    if (shouldReportError(e?.status)) {
      yield call(Dynatrace.reportError, `Unlink Card Error: ${JSON.stringify(e)}`, 0);
    }
  } finally {
    yield put(AccountActions.setIsLoadingUnlinkDebitCard(false));
  }
}

export function* confirmLegalAgreement(api, action) {
  const { externalId, agreements } = action;
  try {
    yield put(AccountActions.setIsLoadingLegalAgreement(true));
    yield call(api.confirmLegalAgreement, externalId, agreements);
    yield put(AccountActions.setLegalAgreementSuccess(true));
    yield call(AppsFlyerService.track, EVENTS.AF_BANK_ACCOUNT_CREATION_SUCCESS);
  } catch (e) {
    yield put(AccountActions.setLegalAgreementError(true));
    if (shouldReportError(e?.status)) {
      const error = JSON.stringify(e);
      yield call(Dynatrace.reportError, `Legal Agreement Acceptance Error: ${error}`, 0);
    }
  } finally {
    yield put(AccountActions.setIsLoadingLegalAgreement(false));
  }
}

export function* fetchOverdraftStatus(api, action) {
  const { externalId } = action;
  try {
    yield put(AccountActions.setIsLoadingOverdraftStatus(true));
    const { data: overdraftStatus } = yield call(api.fetchOverdraftStatus, externalId);
    yield put(AccountActions.setFetchOverdraftStatusSuccess(overdraftStatus));
  } catch (e) {
    const errorMessage = e?.errorMessage ?? strings.accounts.overdraft.error;
    yield put(AccountActions.setFetchOverdraftStatusError(errorMessage));
    if (shouldReportError(e?.status)) {
      yield call(Dynatrace.reportError, `Fetch Overdraft Status Error: ${JSON.stringify(e)}`, 0);
    }
  } finally {
    yield put(AccountActions.setIsLoadingOverdraftStatus(false));
  }
}

export function* setOverdraftProtectionState(api, action) {
  const { externalId, overdraftState } = action;
  try {
    yield call(api.setOverdraftProtectionState, externalId, overdraftState);
    yield put(AccountActions.setOverdraftProtectionStateSuccess(overdraftState));
    const event =
      overdraftState === OverdraftState.OPT_IN
        ? EVENTS.OVERDRAFT_PROTECTION_OPTED_IN
        : EVENTS.OVERDRAFT_PROTECTION_OPTED_OUT;
    yield put(RegisterActions.trackEvent(event, EVENT_TYPES.TRACK));
  } catch (e) {
    const errorMessage = e?.errorMessage ?? strings.overdraftProtection.error;
    yield put(AccountActions.setOverdraftProtectionError(errorMessage));
    if (shouldReportError(e?.status)) {
      const error = JSON.stringify(e);
      const odState = overdraftState;
      yield call(Dynatrace.reportError, `Overdraft Protection ${odState} Error: ${error}`, 0);
    }
  }
}

export function* activateCard(api, action) {
  const { externalId, cardId, cardExpiryDate } = action;
  try {
    yield put(AccountActions.setIsLoading(true));
    yield call(api.activateCard, externalId, cardId, cardExpiryDate);
    yield put(AccountActions.setActivateKinlyCardSuccess(true));
    yield put(RegisterActions.trackEvent(EVENTS.ACTIVATE_CARD_SUCCESS, EVENT_TYPES.TRACK));
  } catch (e) {
    const date = String(cardExpiryDate);
    yield put(AccountActions.setActivateKinlyCardError(true));
    if (shouldReportError(e?.status)) {
      const error = JSON.stringify(e);
      yield call(Dynatrace.reportError, `Activate Card With Exp Date: ${date} Error: ${error}`, 0);
    }
  } finally {
    yield put(AccountActions.setIsLoading(false));
  }
}

export function* fetchCardPinChangeToken(api, action) {
  const { externalId, cardId } = action;
  try {
    yield put(AccountActions.setCardPinChangeIsLoading(true));
    const { data } = yield call(api.fetchCardPinChangeToken, externalId, cardId);
    yield put(AccountActions.setCardPinChangeToken(data.pinChangeToken));
  } catch (e) {
    yield put(AccountActions.setCardPinChangeError(true));
    if (shouldReportError(e?.status)) {
      const error = JSON.stringify(e);
      yield call(Dynatrace.reportError, `Fetch Card Pin Change Token Error: ${error}`, 0);
    }
  } finally {
    yield put(AccountActions.setCardPinChangeIsLoading(false));
  }
}

export function* commitCardPinChange(api, action) {
  const { externalId, cardId } = action;
  try {
    yield put(AccountActions.setCardPinChangeIsLoading(true));
    yield call(api.commitCardPinChange, externalId, cardId);
    yield put(AccountActions.setCardPinChangeSuccess(true));
  } catch (e) {
    yield put(AccountActions.setCardPinChangeError(true));
    if (shouldReportError(e?.status)) {
      yield call(Dynatrace.reportError, `Commit Card Pin Change Error: ${JSON.stringify(e)}`, 0);
    }
  } finally {
    yield put(AccountActions.setCardPinChangeIsLoading(false));
  }
}

export function* fetchPlaidLinkToken(api, action) {
  const { userId } = action;
  try {
    yield put(AccountActions.setIsLoadingPlaidLinkToken(true));
    const { data } = yield call(api.fetchPlaidLinkToken, userId);
    yield put(AccountActions.fetchPlaidLinkTokenSuccess(data));
  } catch (e) {
    yield put(AccountActions.fetchPlaidLinkTokenFail(true));
    if (shouldReportError(e?.status)) {
      yield call(Dynatrace.reportError, `Fetch Plaid Token Error: ${JSON.stringify(e)}`, 0);
    }
  } finally {
    yield put(AccountActions.setIsLoadingPlaidLinkToken(false));
  }
}

export function* fetchAtomicFiToken(api, action) {
  const { externalId } = action;
  try {
    yield put(AccountActions.setIsLoadingAtomicFiToken(true));
    const { data } = yield call(api.fetchAtomicFiToken, externalId);
    yield put(AccountActions.fetchAtomicFiTokenSuccess(data));
  } catch (e) {
    // TO-DO: Add error handling
    if (shouldReportError(e?.status)) {
      yield call(Dynatrace.reportError, `Fetch Atomic Fi Token Error: ${JSON.stringify(e)}`, 0);
    }
  } finally {
    yield put(AccountActions.setIsLoadingAtomicFiToken(false));
  }
}
