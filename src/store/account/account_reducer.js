import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { DEBIT_CARD_STATUS } from '_constants';

const { Types, Creators } = createActions(
  {
    setExternalId: ['externalId'],
    linkAchAccount: ['achData', 'externalId'],
    setLinkAchAccountSuccess: ['linkAchSuccess'],
    setLinkAchAccountError: ['linkAchError'],
    setIsLoadingAchAccount: ['isLoadingAchAccount'],
    getLinkAccounts: ['externalId'],
    getLinkAccountsSuccess: ['accountsList'],
    setLinkAccountsError: ['linkAccountsError'],
    fetchAccountInfo: ['externalId'],
    setFetchAccountInfoSuccess: ['accountInfo'],
    fetchKinlyDebitCards: ['externalId'],
    setFetchKinlyDebitCardsSuccess: ['kinlyDebitCards'],
    setFetchKinlyDebitCardsError: ['fetchKinlyDebitCardsError'],
    setIsLoadingKinlyDebitCards: ['isLoadingKinlyDebitCards'],
    fetchTransactions: ['externalId', 'filters'],
    setFetchTransactionsSuccess: ['transactions', 'numberOfPages'],
    setFetchPreviewTransactionsSuccess: ['transactions'],
    setFetchTransactionsError: ['fetchTransactionsError'],
    cleanTransactions: [null],
    setIsLoadingAccountInfo: ['isLoadingAccountInfo'],
    setFetchAccountInfoError: ['fetchAccountInfoError'],
    setIsLoadingTransactions: ['isLoadingTransactions'],
    linkCard: ['externalId', 'data'],
    setLinkCardSuccess: ['linkCardSuccess'],
    setLinkCardError: ['linkCardError'],
    getAccountLinkedCards: ['externalId'],
    getAccountLinkedCardsSuccess: ['accountCardsList'],
    setAccountLinkedCardsError: ['linkedCardsError'],
    unlinkAccountCard: ['externalId', 'cardId'],
    removeUnlinkedDebitCard: ['cardId'],
    setUnlinkDebitCardSuccess: ['unlinkDebitCardSuccess'],
    setUnlinkDebitCardError: ['unlinkDebitCardError'],
    setIsLoadingUnlinkDebitCard: ['isLoadingUnlinkDebitCard'],
    unlinkAch: ['externalId', 'achAccountId'],
    setUnlinkAchAccountSuccess: ['unlinkAchSuccess'],
    setUnlinkAchAccountError: ['unlinkAchError'],
    removeUnlinkedAchAccount: ['achAccountId'],
    setIsLoadingUnlinkAchAccount: ['isLoadingUnlinkAchAccount'],
    resetAccount: [null],
    confirmLegalAgreement: ['externalId', 'agreements'],
    setLegalAgreementSuccess: ['legalAgreementSuccess'],
    setLegalAgreementError: ['legalAgreementError'],
    setIsLoadingLegalAgreement: ['isLoadingLegalAgreement'],
    fetchOverdraftStatus: ['externalId'],
    setFetchOverdraftStatusSuccess: ['overdraft'],
    setFetchOverdraftStatusError: ['fetchOverdraftError'],
    setIsLoadingOverdraftStatus: ['isLoadingOverdraftStatus'],
    setOverdraftProtectionState: ['externalId', 'overdraftState'],
    setOverdraftProtectionStateSuccess: ['overdraftState'],
    setOverdraftProtectionError: ['overdraftError'],
    setDirectDepositFormError: ['directDepositFormError'],
    activateCard: ['externalId', 'cardId', 'cardExpiryDate'],
    setActivateKinlyCardSuccess: ['activateKinlyCardSuccess'],
    setActivateKinlyCardError: ['activateKinlyCardError'],
    setIsLoading: ['isLoading'],
    fetchCardPinChangeToken: ['externalId', 'cardId'],
    commitCardPinChange: ['externalId', 'cardId'],
    setCardPinChangeToken: ['cardPinChangeToken'],
    setCardPinChangeSuccess: ['cardPinChangeSuccess'],
    setCardPinChangeError: ['cardPinChangeError'],
    setCardPinChangeIsLoading: ['cardPinChangeIsLoading'],
    fetchPlaidLinkToken: ['userId'],
    fetchPlaidLinkTokenSuccess: ['plaidLinkTokenObject'],
    fetchPlaidLinkTokenFail: ['plaidTokenError'],
    setIsLoadingPlaidLinkToken: ['isLoadingPlaidLinkToken'],
    fetchAtomicFiToken: ['externalId'],
    fetchAtomicFiTokenSuccess: ['atomicFiToken'],
    fetchAtomicFiTokenFail: ['atomicFiTokenError'],
    setIsLoadingAtomicFiToken: ['isLoadingAtomicFiToken'],
  },
  {
    prefix: '@@BE-ACCOUNT/',
  }
);
// FETCH_ATOMIC_IF_TOKEN
export const AccountActions = Creators;
export const AccountTypes = Types;

// INITAL STATE
export const INITIAL_STATE = Immutable({
  externalId: null,
  accountInfo: null,
  fetchAccountInfoError: null,
  accountsList: [],
  linkAccountsError: null,
  transactionsDetails: [],
  isLoadingTransactions: false,
  fetchTransactionsError: null,
  transactionsNumberOfPages: 0,
  isLoadingAccountInfo: false,
  accountCardsList: [],
  linkedCardsError: null,
  kinlyDebitCards: [],
  fetchKinlyDebitCardsError: null,
  isLoadingKinlyDebitCards: false,
  isCardUnlinked: false,
  linkCardSuccess: false,
  linkCardError: null,
  legalAgreementSuccess: false,
  legalAgreementError: false,
  isLoadingLegalAgreement: false,
  overdraft: null,
  fetchOverdraftError: null,
  overdraftError: null,
  isLoadingOverdraftStatus: false,
  directDepositFormError: false,
  linkAchSuccess: false,
  linkAchError: null,
  isLoadingAchAccount: false,
  isLoadingUnlinkDebitCard: false,
  unlinkDebitCardSuccess: false,
  unlinkDebitCardError: false,
  unlinkAchError: null,
  unlinkAchSuccess: false,
  isLoadingUnlinkAchAccount: false,
  activateKinlyCardSuccess: false,
  activateKinlyCardError: false,
  isLoading: false,
  cardPinChangeToken: null,
  cardPinChangeSuccess: false,
  cardPinChangeError: false,
  cardPinChangeIsLoading: false,
  plaidLinkTokenObject: null,
  plaidTokenError: false,
  isLoadingPlaidLinkToken: false,
  atomicFiToken: null,
  atomicFiTokenError: false,
  isLoadingAtomicFiToken: false,
});

// SELECTORS
export const AccountSelectors = {
  getExternalId: (state) => state.account.externalId,
  getAccountList: (state) => state.account.accountsList,
  getLinkAccountsError: (state) => state.account.linkAccountsError,
  getAccountInfo: (state) => state.account.accountInfo,
  getFetchAccountInfoError: (state) => state.account.fetchAccountInfoError,
  getIsLoadingAccountInfo: (state) => state.account.isLoadingAccountInfo,
  getIsLoadingTransactions: (state) => state.account.isLoadingTransactions,
  getTransactions: (state) => state.account.transactionsDetails,
  getTransactionsNumberOfPages: (state) => state.account.transactionsNumberOfPages,
  getFetchTransactionsError: (state) => state.account.fetchTransactionsError,
  getAccountCardsList: (state) => state.account.accountCardsList,
  getLinkedCardsError: (state) => state.account.linkedCardsError,
  getLinkCardSuccess: (state) => state.account.linkCardSuccess,
  getLinkCardError: (state) => state.account.linkCardError,
  getLegalAgreementSuccess: (state) => state.account.legalAgreementSuccess,
  getLegalAgreementError: (state) => state.account.legalAgreementError,
  getIsLoadingLegalAgreement: (state) => state.account.isLoadingLegalAgreement,
  getOverdraft: (state) => state.account.overdraft,
  getFetchOverdraftError: (state) => state.account.fetchOverdraftError,
  getIsLoadingOverdraftStatus: (state) => state.account.isLoadingOverdraftStatus,
  getIsRefreshingOverdraftStatus: (state) =>
    state.account.isLoadingOverdraftStatus && state.account.overdraft !== null,
  getOverdraftError: (state) => state.account.overdraftError,
  getDirectDepositFormError: (state) => state.account.directDepositFormError,
  getLinkAchSuccess: (state) => state.account.linkAchSuccess,
  getLinkAchError: (state) => state.account.linkAchError,
  getIsLoadingLinkAchAccount: (state) => state.account.isLoadingAchAccount,
  getUnlinkAchSuccess: (state) => state.account.unlinkAchSuccess,
  getUnlinkAchError: (state) => state.account.unlinkAchError,
  getIsLoadingUnlinkAchAccount: (state) => state.account.isLoadingUnlinkAchAccount,
  getIsLoadingUnlinkDebitCard: (state) => state.account.isLoadingUnlinkDebitCard,
  getUnlinkDebitCardSuccess: (state) => state.account.unlinkDebitCardSuccess,
  getUnlinkDebitCardError: (state) => state.account.unlinkDebitCardError,
  getKinlyCards: (state) => state.account.kinlyDebitCards,
  getFetchKinlyDebitCardsError: (state) => state.account.fetchKinlyDebitCardsError,
  getIsLoadingKinlyDebitCards: (state) => state.account.isLoadingKinlyDebitCards,
  getIsRefreshingKinlyDebitCards: (state) =>
    state.account.isLoadingKinlyDebitCards && state.account.kinlyDebitCards.lenght > 0,
  getActivateKinlyCardSuccess: (state) => state.account.activateKinlyCardSuccess,
  getActivateKinlyCardError: (state) => state.account.activateKinlyCardError,
  getCardForActivation: (state) =>
    state.account.kinlyDebitCards.find(
      (card) => card.status === DEBIT_CARD_STATUS.READY_TO_ACTIVATE
    ),
  hasDebitCardWaitingToActivate: (state) =>
    state.account.kinlyDebitCards.some(
      (card) => card.status === DEBIT_CARD_STATUS.READY_TO_ACTIVATE
    ),
  hasActiveDebitCards: (state) =>
    state.account.kinlyDebitCards.some((card) => card.status === DEBIT_CARD_STATUS.ACTIVE),
  getIsLoading: (state) => state.account.isLoading,
  getCardPinChangeToken: (state) => state.account.cardPinChangeToken,
  getCardPinChangeSuccess: (state) => state.account.cardPinChangeSuccess,
  getCardPinChangeError: (state) => state.account.cardPinChangeError,
  getCardPinChangeIsLoading: (state) => state.account.cardPinChangeIsLoading,
  getPlaidLinkToken: (state) => state.account.plaidLinkTokenObject?.linkToken ?? null,
  getPlaidLinkTokenError: (state) => state.account.plaidTokenError,
  getIsLoadingPlaidLinkToken: (state) => state.account.isLoadingPlaidLinkToken,
  getAtomicFiToken: (state) => state.account.atomicFiToken?.publicToken ?? null,
  getAtomicFiTokenError: (state) => state.account.atomicFiTokenError,
  getIsLoadingAtomicFiToken: (state) => state.account.isLoadingAtomicFiToken,
};

// ACTION HANDLERS
const setExternalId = (state, { externalId }) => {
  return state.merge({ externalId });
};

const setLinkAchAccountSuccess = (state, { linkAchSuccess }) => {
  return state.merge({ linkAchSuccess });
};

const setLinkAchAccountError = (state, { linkAchError }) => {
  return state.merge({ linkAchError });
};

const setIsLoadingAchAccount = (state, { isLoadingAchAccount }) => {
  return state.merge({ isLoadingAchAccount });
};

const getLinkAccountsSuccess = (state, { accountsList }) => {
  return state.merge({ accountsList });
};

const setLinkAccountsError = (state, { linkAccountsError }) => {
  return state.merge({ linkAccountsError });
};

const setFetchAccountInfoSuccess = (state, { accountInfo }) => {
  return state.merge({ accountInfo });
};

const setFetchAccountInfoError = (state, { fetchAccountInfoError }) => {
  return state.merge({ fetchAccountInfoError });
};

const setFetchKinlyDebitCardsSuccess = (state, { kinlyDebitCards }) => {
  return state.merge({ kinlyDebitCards });
};

const setFetchKinlyDebitCardsError = (state, { fetchKinlyDebitCardsError }) => {
  return state.merge({ fetchKinlyDebitCardsError });
};

const setIsLoadingKinlyDebitCards = (state, { isLoadingKinlyDebitCards }) => {
  return state.merge({ isLoadingKinlyDebitCards });
};

const setLinkCardSuccess = (state, { linkCardSuccess }) => {
  return state.merge({ linkCardSuccess });
};

const setLinkCardError = (state, { linkCardError }) => {
  return state.merge({ linkCardError });
};

const setFetchTransactionsSuccess = (state, { transactions, numberOfPages }) => {
  return state.merge({
    transactionsDetails: [...state.transactionsDetails, ...transactions],
    transactionsNumberOfPages: numberOfPages,
  });
};

const setFetchPreviewTransactionsSuccess = (state, { transactions }) => {
  return state.merge({
    transactionsDetails: transactions,
  });
};

const setFetchTransactionsError = (state, { fetchTransactionsError }) => {
  return state.merge({ fetchTransactionsError });
};

const cleanTransactions = (state) => {
  return state.merge({ transactionsDetails: [], transactionsNumberOfPages: 0 });
};

const setIsLoadingAccountInfo = (state, { isLoadingAccountInfo }) => {
  return state.merge({ isLoadingAccountInfo });
};

const setIsLoadingTransactions = (state, { isLoadingTransactions }) => {
  return state.merge({ isLoadingTransactions });
};

const getAccountLinkedCardsSuccess = (state, { accountCardsList }) => {
  return state.merge({ accountCardsList });
};

const setAccountLinkedCardsError = (state, { linkedCardsError }) => {
  return state.merge({ linkedCardsError });
};

const setUnlinkDebitCardSuccess = (state, { unlinkDebitCardSuccess }) => {
  return state.merge({ unlinkDebitCardSuccess });
};

const setUnlinkDebitCardError = (state, { unlinkDebitCardError }) => {
  return state.merge({ unlinkDebitCardError });
};

const removeUnlinkedDebitCard = (state, { cardId }) => {
  return state.update('accountCardsList', (accountCardsList) => {
    return accountCardsList.filter((card) => card.linkedDebitCardId !== cardId);
  });
};

const setIsLoadingUnlinkDebitCard = (state, { isLoadingUnlinkDebitCard }) => {
  return state.merge({ isLoadingUnlinkDebitCard });
};

const setUnlinkAchAccountSuccess = (state, { unlinkAchSuccess }) => {
  return state.merge({ unlinkAchSuccess });
};

const setUnlinkAchAccountError = (state, { unlinkAchError }) => {
  return state.merge({ unlinkAchError });
};

const removeUnlinkedAchAccount = (state, { achAccountId }) => {
  return state.update('accountsList', (accountsList) => {
    return accountsList.filter((account) => account.id !== achAccountId);
  });
};

const setIsLoadingUnlinkAchAccount = (state, { isLoadingUnlinkAchAccount }) => {
  return state.merge({ isLoadingUnlinkAchAccount });
};

const setLegalAgreementSuccess = (state, { legalAgreementSuccess }) => {
  return state.merge({ legalAgreementSuccess });
};

const setLegalAgreementError = (state, { legalAgreementError }) => {
  return state.merge({ legalAgreementError });
};

const setIsLoadingLegalAgreement = (state, { isLoadingLegalAgreement }) => {
  return state.merge({ isLoadingLegalAgreement });
};

const setFetchOverdraftStatusSuccess = (state, { overdraft }) => {
  return state.merge({ overdraft });
};

const setFetchOverdraftStatusError = (state, { fetchOverdraftError }) => {
  return state.merge({ fetchOverdraftError });
};

const setIsLoadingOverdraftStatus = (state, { isLoadingOverdraftStatus }) => {
  return state.merge({ isLoadingOverdraftStatus });
};

const setOverdraftProtectionStateSuccess = (state, { overdraftState }) => {
  return state.merge({ overdraft: { ...state.overdraft, state: overdraftState } });
};

const setOverdraftProtectionError = (state, { overdraftError }) => {
  return state.merge({ overdraftError });
};

const setDirectDepositFormError = (state, { directDepositFormError }) => {
  return state.merge({ directDepositFormError });
};

const setActivateKinlyCardSuccess = (state, { activateKinlyCardSuccess }) => {
  return state.merge({ activateKinlyCardSuccess });
};

const setIsLoading = (state, { isLoading }) => {
  return state.merge({ isLoading });
};

const setCardPinChangeToken = (state, { cardPinChangeToken }) => {
  return state.merge({ cardPinChangeToken });
};

const setCardPinChangeSuccess = (state, { cardPinChangeSuccess }) => {
  return state.merge({ cardPinChangeSuccess });
};

const setCardPinChangeError = (state, { cardPinChangeError }) => {
  return state.merge({ cardPinChangeError });
};

const setCardPinChangeIsLoading = (state, { cardPinChangeIsLoading }) => {
  return state.merge({ cardPinChangeIsLoading });
};

const setActivateKinlyCardError = (state, { activateKinlyCardError }) => {
  return state.merge({ activateKinlyCardError });
};

const fetchPlaidLinkTokenSuccess = (state, { plaidLinkTokenObject }) => {
  return state.merge({ plaidLinkTokenObject });
};

const fetchPlaidLinkTokenFail = (state, { plaidTokenError }) => {
  return state.merge({ plaidTokenError });
};

const setIsLoadingPlaidLinkToken = (state, { isLoadingPlaidLinkToken }) => {
  return state.merge({ isLoadingPlaidLinkToken });
};

const fetchAtomicFiTokenSuccess = (state, { atomicFiToken }) => {
  return state.merge({ atomicFiToken });
};

const fetchAtomicFiTokenFail = (state, { atomicFiTokenError }) => {
  return state.merge({ atomicFiTokenError });
};

const setIsLoadingAtomicFiToken = (state, { isLoadingAtomicFiToken }) => {
  return state.merge({ isLoadingAtomicFiToken });
};

const resetAccount = () => {
  return INITIAL_STATE;
};

// REDUCER
export const AccountReducer = createReducer(INITIAL_STATE, {
  [Types.SET_EXTERNAL_ID]: setExternalId,
  [Types.SET_LINK_ACH_ACCOUNT_SUCCESS]: setLinkAchAccountSuccess,
  [Types.SET_LINK_ACH_ACCOUNT_ERROR]: setLinkAchAccountError,
  [Types.SET_IS_LOADING_ACH_ACCOUNT]: setIsLoadingAchAccount,
  [Types.RESET_ACCOUNT]: resetAccount,
  [Types.GET_LINK_ACCOUNTS_SUCCESS]: getLinkAccountsSuccess,
  [Types.SET_LINK_ACCOUNTS_ERROR]: setLinkAccountsError,
  [Types.SET_FETCH_ACCOUNT_INFO_SUCCESS]: setFetchAccountInfoSuccess,
  [Types.SET_FETCH_ACCOUNT_INFO_ERROR]: setFetchAccountInfoError,
  [Types.SET_FETCH_KINLY_DEBIT_CARDS_SUCCESS]: setFetchKinlyDebitCardsSuccess,
  [Types.SET_FETCH_KINLY_DEBIT_CARDS_ERROR]: setFetchKinlyDebitCardsError,
  [Types.SET_IS_LOADING_KINLY_DEBIT_CARDS]: setIsLoadingKinlyDebitCards,
  [Types.SET_LINK_CARD_SUCCESS]: setLinkCardSuccess,
  [Types.SET_LINK_CARD_ERROR]: setLinkCardError,
  [Types.SET_FETCH_TRANSACTIONS_SUCCESS]: setFetchTransactionsSuccess,
  [Types.SET_FETCH_PREVIEW_TRANSACTIONS_SUCCESS]: setFetchPreviewTransactionsSuccess,
  [Types.SET_FETCH_TRANSACTIONS_ERROR]: setFetchTransactionsError,
  [Types.CLEAN_TRANSACTIONS]: cleanTransactions,
  [Types.SET_IS_LOADING_ACCOUNT_INFO]: setIsLoadingAccountInfo,
  [Types.SET_IS_LOADING_TRANSACTIONS]: setIsLoadingTransactions,
  [Types.GET_ACCOUNT_LINKED_CARDS_SUCCESS]: getAccountLinkedCardsSuccess,
  [Types.SET_ACCOUNT_LINKED_CARDS_ERROR]: setAccountLinkedCardsError,
  [Types.SET_UNLINK_DEBIT_CARD_SUCCESS]: setUnlinkDebitCardSuccess,
  [Types.SET_UNLINK_DEBIT_CARD_ERROR]: setUnlinkDebitCardError,
  [Types.REMOVE_UNLINKED_DEBIT_CARD]: removeUnlinkedDebitCard,
  [Types.SET_IS_LOADING_UNLINK_DEBIT_CARD]: setIsLoadingUnlinkDebitCard,
  [Types.SET_UNLINK_ACH_ACCOUNT_SUCCESS]: setUnlinkAchAccountSuccess,
  [Types.SET_UNLINK_ACH_ACCOUNT_ERROR]: setUnlinkAchAccountError,
  [Types.REMOVE_UNLINKED_ACH_ACCOUNT]: removeUnlinkedAchAccount,
  [Types.SET_IS_LOADING_UNLINK_ACH_ACCOUNT]: setIsLoadingUnlinkAchAccount,
  [Types.SET_LEGAL_AGREEMENT_SUCCESS]: setLegalAgreementSuccess,
  [Types.SET_LEGAL_AGREEMENT_ERROR]: setLegalAgreementError,
  [Types.SET_IS_LOADING_LEGAL_AGREEMENT]: setIsLoadingLegalAgreement,
  [Types.SET_FETCH_OVERDRAFT_STATUS_SUCCESS]: setFetchOverdraftStatusSuccess,
  [Types.SET_FETCH_OVERDRAFT_STATUS_ERROR]: setFetchOverdraftStatusError,
  [Types.SET_IS_LOADING_OVERDRAFT_STATUS]: setIsLoadingOverdraftStatus,
  [Types.SET_OVERDRAFT_PROTECTION_STATE_SUCCESS]: setOverdraftProtectionStateSuccess,
  [Types.SET_OVERDRAFT_PROTECTION_ERROR]: setOverdraftProtectionError,
  [Types.SET_DIRECT_DEPOSIT_FORM_ERROR]: setDirectDepositFormError,
  [Types.SET_ACTIVATE_KINLY_CARD_SUCCESS]: setActivateKinlyCardSuccess,
  [Types.SET_IS_LOADING]: setIsLoading,
  [Types.SET_CARD_PIN_CHANGE_TOKEN]: setCardPinChangeToken,
  [Types.SET_CARD_PIN_CHANGE_SUCCESS]: setCardPinChangeSuccess,
  [Types.SET_CARD_PIN_CHANGE_ERROR]: setCardPinChangeError,
  [Types.SET_CARD_PIN_CHANGE_IS_LOADING]: setCardPinChangeIsLoading,
  [Types.SET_ACTIVATE_KINLY_CARD_ERROR]: setActivateKinlyCardError,
  [Types.FETCH_PLAID_LINK_TOKEN_SUCCESS]: fetchPlaidLinkTokenSuccess,
  [Types.FETCH_PLAID_LINK_TOKEN_FAIL]: fetchPlaidLinkTokenFail,
  [Types.SET_IS_LOADING_PLAID_LINK_TOKEN]: setIsLoadingPlaidLinkToken,
  [Types.FETCH_ATOMIC_FI_TOKEN_SUCCESS]: fetchAtomicFiTokenSuccess,
  [Types.FETCH_ATOMIC_FI_TOKEN_FAIL]: fetchAtomicFiTokenFail,
  [Types.SET_IS_LOADING_ATOMIC_FI_TOKEN]: setIsLoadingAtomicFiToken,
});
