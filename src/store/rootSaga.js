import { all, debounce, takeLatest } from 'redux-saga/effects';
import apiClient from '_services/apiClient';
import {
  AccountTypes,
  activateCard,
  commitCardPinChange,
  confirmLegalAgreement,
  fetchAccountInfo,
  fetchAtomicFiToken,
  fetchCardPinChangeToken,
  fetchKinlyDebitCards,
  fetchOverdraftStatus,
  fetchPlaidLinkToken,
  fetchTransactions,
  getAccountLinkedCards,
  getLinkAccounts,
  linkAchAccount,
  linkCard,
  setOverdraftProtectionState,
  unlinkAccountCard,
  unlinkAch,
} from './account';
import {
  AuthenticationTypes,
  fetchCurrentUserData,
  logout,
  resetPassword,
  signIn,
  signUp,
} from './authentication';
import {
  checkVerificationStatus,
  confirmPhoneVerification,
  CustomerTypes,
  fetchCustomer,
  getSuggestedAddresses,
  startPhoneVerification,
  updateAddress,
  updateEmail,
} from './customer';
import { fetchRenderData, FundDirectDepositStoreTypes } from './pageStore/fundDirectDepositStore';
import { RegisterTypes, trackEvent } from './register';
import { achIn, achOut, instantOut, TransferTypes } from './transfer';

export default function* rootSaga() {
  yield all([
    // Authentication
    takeLatest(AuthenticationTypes.SIGN_IN, signIn, apiClient),
    takeLatest(AuthenticationTypes.LOGOUT, logout, apiClient),
    takeLatest(AuthenticationTypes.RESET_PASSWORD, resetPassword, apiClient),
    takeLatest(AuthenticationTypes.SIGN_UP, signUp, apiClient),
    takeLatest(AuthenticationTypes.FETCH_CURRENT_USER_DATA, fetchCurrentUserData, apiClient),
    // Account
    takeLatest(AccountTypes.LINK_ACH_ACCOUNT, linkAchAccount, apiClient),
    takeLatest(AccountTypes.GET_LINK_ACCOUNTS, getLinkAccounts, apiClient),
    takeLatest(AccountTypes.FETCH_ACCOUNT_INFO, fetchAccountInfo, apiClient),
    takeLatest(AccountTypes.LINK_CARD, linkCard, apiClient),
    takeLatest(AccountTypes.FETCH_KINLY_DEBIT_CARDS, fetchKinlyDebitCards, apiClient),
    takeLatest(AccountTypes.FETCH_TRANSACTIONS, fetchTransactions, apiClient),
    takeLatest(AccountTypes.FETCH_OVERDRAFT_STATUS, fetchOverdraftStatus, apiClient),
    takeLatest(AccountTypes.GET_ACCOUNT_LINKED_CARDS, getAccountLinkedCards, apiClient),
    takeLatest(AccountTypes.CONFIRM_LEGAL_AGREEMENT, confirmLegalAgreement, apiClient),
    takeLatest(AccountTypes.SET_OVERDRAFT_PROTECTION_STATE, setOverdraftProtectionState, apiClient),
    takeLatest(AccountTypes.ACTIVATE_CARD, activateCard, apiClient),
    takeLatest(AccountTypes.FETCH_CARD_PIN_CHANGE_TOKEN, fetchCardPinChangeToken, apiClient),
    takeLatest(AccountTypes.COMMIT_CARD_PIN_CHANGE, commitCardPinChange, apiClient),
    takeLatest(AccountTypes.UNLINK_ACH, unlinkAch, apiClient),
    takeLatest(AccountTypes.UNLINK_ACCOUNT_CARD, unlinkAccountCard, apiClient),
    takeLatest(AccountTypes.FETCH_PLAID_LINK_TOKEN, fetchPlaidLinkToken, apiClient),
    takeLatest(AccountTypes.FETCH_ATOMIC_FI_TOKEN, fetchAtomicFiToken, apiClient),
    // Customer
    takeLatest(CustomerTypes.FETCH_CUSTOMER, fetchCustomer, apiClient),
    takeLatest(CustomerTypes.UPDATE_ADDRESS, updateAddress, apiClient),
    takeLatest(CustomerTypes.UPDATE_EMAIL, updateEmail, apiClient),
    takeLatest(CustomerTypes.START_PHONE_VERIFICATION, startPhoneVerification, apiClient),
    takeLatest(CustomerTypes.CONFIRM_PHONE_VERIFICATION, confirmPhoneVerification, apiClient),
    takeLatest(CustomerTypes.CHECK_VERIFICATION_STATUS, checkVerificationStatus, apiClient),
    debounce(300, CustomerTypes.GET_SUGGESTED_ADDRESSES, getSuggestedAddresses, apiClient),
    // Direct Deposit
    takeLatest(FundDirectDepositStoreTypes.FETCH_RENDER_DATA, fetchRenderData, apiClient),
    // Events
    takeLatest(RegisterTypes.TRACK_EVENT, trackEvent, apiClient),
    // Transfers
    takeLatest(TransferTypes.ACH_IN, achIn, apiClient),
    takeLatest(TransferTypes.ACH_OUT, achOut, apiClient),
    takeLatest(TransferTypes.INSTANT_OUT, instantOut, apiClient),
  ]);
}
