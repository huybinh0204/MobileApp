import { expectSaga } from 'redux-saga-test-plan';
import { EVENTS, EVENT_TYPES, OverdraftState, OverdraftStatus } from '_constants';
import strings from '_localization';
import { RegisterActions } from '_store/register';
import { formatAccountList } from '_utilities/Account';
import { AccountActions } from './account_reducer';
import {
  activateCard,
  confirmLegalAgreement,
  fetchAccountInfo,
  fetchKinlyDebitCards,
  fetchOverdraftStatus,
  fetchTransactions,
  getLinkAccounts,
  linkAchAccount,
  setOverdraftProtectionState,
  unlinkAccountCard,
} from './account_sagas';

describe('Account Sagas', () => {
  const testExternalId = '6012ac52-467d-4c1f-9ec7-9d8b35998a29';

  const mockApi = {
    linkAch: jest.fn(),
    getLinkedAccounts: jest.fn(),
    fetchAccountInfo: jest.fn(),
    fetchKinlyDebitCards: jest.fn(),
    fetchOverdraftStatus: jest.fn(),
    fetchTransactions: jest.fn(),
    confirmLegalAgreement: jest.fn(),
    setOverdraftProtectionState: jest.fn(),
    unlinkAccountCard: jest.fn(),
    activateCard: jest.fn(),
    unlinkAch: jest.fn(),
  };

  describe('linkAchAccount', () => {
    it('Success request', () => {
      const action = {
        externalId: testExternalId,
        achData: {
          account: {},
          accountId: '11232434',
          publicToken: '4343mnek3r3',
        },
      };

      const accounts = [
        {
          accountId: '26',
          lastFourDigits: '0000',
          accountName: 'Plaid Checking',
        },
      ];

      mockApi.linkAch.mockReturnValue({
        status: 200,
        data: {
          achAccountId: '123',
        },
      });

      mockApi.getLinkedAccounts.mockReturnValue({
        status: 200,
        data: {
          accounts,
        },
      });

      return expectSaga(linkAchAccount, mockApi, action)
        .put(AccountActions.setIsLoadingAchAccount(true))
        .call(mockApi.linkAch, { ...action.achData, externalId: action.externalId })
        .call(mockApi.getLinkedAccounts, action.externalId)
        .put(AccountActions.getLinkAccountsSuccess(formatAccountList(accounts)))
        .put(AccountActions.setLinkAchAccountSuccess(true))
        .put(
          RegisterActions.trackEvent(EVENTS.ACCOUNT_ACH_LINK_SUCCESS, EVENT_TYPES.TRACK, {
            account_type: 'bank',
          })
        )
        .run();
    });

    it('Fails request', () => {
      const action = {
        externalId: testExternalId,
        achData: {
          account: {},
          accountId: '11232434',
          publicToken: '4343mnek3r3',
        },
      };

      mockApi.linkAch.mockRejectedValue({
        status: 500,
        data: 'Error',
      });

      return expectSaga(linkAchAccount, mockApi, action)
        .call(mockApi.linkAch, { ...action.achData, externalId: action.externalId })
        .run();
    });
  });

  describe('getLinkAccounts', () => {
    it('Fails request', () => {
      const action = {
        externalId: testExternalId,
      };

      mockApi.getLinkedAccounts.mockRejectedValue({
        status: 500,
        data: 'some error',
      });

      return expectSaga(getLinkAccounts, mockApi, action)
        .call(mockApi.getLinkedAccounts, action.externalId)
        .run();
    });
  });

  describe('fetchAccountInfo', () => {
    it('Success request', () => {
      const action = {
        externalId: testExternalId,
      };

      const response = {
        balance: 0,
        createdAt: '2021-12-20T17:56:31.325984Z',
        externalId: '87f84418-956b-4481-9417-9a540a45a7f6',
        status: 'ACTIVE',
      };

      mockApi.fetchAccountInfo.mockReturnValue({
        status: 200,
        data: response,
      });

      return expectSaga(fetchAccountInfo, mockApi, action)
        .put(AccountActions.setIsLoadingAccountInfo(true))
        .call(mockApi.fetchAccountInfo, action.externalId)
        .put(AccountActions.setFetchAccountInfoSuccess(response))
        .put(AccountActions.setIsLoadingAccountInfo(false))
        .run();
    });

    it('Fails request', () => {
      const action = {
        externalId: testExternalId,
      };

      mockApi.fetchAccountInfo.mockRejectedValue({
        status: 500,
        data: 'some error',
      });

      return expectSaga(fetchAccountInfo, mockApi, action)
        .put(AccountActions.setIsLoadingAccountInfo(true))
        .call(mockApi.fetchAccountInfo, action.externalId)
        .put(AccountActions.setFetchAccountInfoError(strings.accounts.accountInfo.error))
        .put(AccountActions.setIsLoadingAccountInfo(false))
        .run();
    });
  });

  describe('fetchKinlyDebitCards', () => {
    it('Success request', () => {
      const action = {
        externalId: testExternalId,
      };

      const response = [
        {
          cardLastFour: '2382',
          status: 'READY_TO_ACTIVATE',
          cardId: '2090',
        },
      ];

      mockApi.fetchKinlyDebitCards.mockReturnValue({
        status: 200,
        data: response,
      });

      return expectSaga(fetchKinlyDebitCards, mockApi, action)
        .put(AccountActions.setIsLoadingKinlyDebitCards(true))
        .call(mockApi.fetchKinlyDebitCards, action.externalId)
        .put(AccountActions.setFetchKinlyDebitCardsSuccess(response))
        .put(AccountActions.setIsLoadingKinlyDebitCards(false))
        .run();
    });

    it('Fails request', () => {
      const action = {
        externalId: testExternalId,
      };

      mockApi.fetchKinlyDebitCards.mockRejectedValue({
        status: 500,
        data: 'some error',
      });

      return expectSaga(fetchKinlyDebitCards, mockApi, action)
        .put(AccountActions.setIsLoadingKinlyDebitCards(true))
        .call(mockApi.fetchKinlyDebitCards, action.externalId)
        .put(AccountActions.setFetchKinlyDebitCardsError(strings.accounts.kinlyDebitCards.error))
        .put(AccountActions.setIsLoadingKinlyDebitCards(false))
        .run();
    });
  });

  describe('fetchOverdraftStatus', () => {
    it('Success request', () => {
      const response = {
        accountExists: true,
        state: OverdraftState.OPT_IN,
        status: OverdraftStatus.ACTIVE,
        limit: 100,
        availableBalance: 50,
      };

      const action = {
        externalId: testExternalId,
      };

      mockApi.fetchOverdraftStatus.mockReturnValue({
        status: 200,
        data: response,
      });

      return expectSaga(fetchOverdraftStatus, mockApi, action)
        .put(AccountActions.setIsLoadingOverdraftStatus(true))
        .call(mockApi.fetchOverdraftStatus, action.externalId)
        .put(AccountActions.setFetchOverdraftStatusSuccess(response))
        .put(AccountActions.setIsLoadingOverdraftStatus(false))
        .run();
    });

    it('Fails request', () => {
      const action = {
        externalId: testExternalId,
      };

      mockApi.fetchOverdraftStatus.mockRejectedValue({
        status: 500,
        data: 'some error',
      });

      return expectSaga(fetchOverdraftStatus, mockApi, action)
        .put(AccountActions.setIsLoadingOverdraftStatus(true))
        .call(mockApi.fetchOverdraftStatus, action.externalId)
        .put(AccountActions.setFetchOverdraftStatusError(strings.accounts.overdraft.error))
        .put(AccountActions.setIsLoadingOverdraftStatus(false))
        .run();
    });
  });

  describe('fetchTransactions', () => {
    it('Success request', () => {
      const response = {
        title: 'page 1',
        page: 1,
        numberOfPages: 2,
        transactions: [
          {
            type: 'CREDIT',
            details: 'test credit',
            amount: 200,
            createdDateTime: '2020-10-28T15:43:18Z',
          },
          {
            type: 'DEBIT',
            details: 'test credit',
            amount: 100,
            createdDateTime: '2020-10-28T15:29:12Z',
          },
        ],
      };

      const action = {
        externalId: testExternalId,
        filters: {
          maxCount: 50,
          page: 1,
        },
      };

      mockApi.fetchTransactions.mockReturnValue({
        status: 200,
        data: response,
      });

      return expectSaga(fetchTransactions, mockApi, action)
        .put(AccountActions.setIsLoadingTransactions(true))
        .call(mockApi.fetchTransactions, action.externalId, action.filters)
        .put(
          AccountActions.setFetchTransactionsSuccess(response.transactions, response.numberOfPages)
        )
        .put(AccountActions.setIsLoadingTransactions(false))
        .run();
    });

    it('Fail request', () => {
      const action = {
        externalId: testExternalId,
        filters: {
          maxCount: 50,
          page: 1,
        },
      };

      mockApi.fetchTransactions.mockRejectedValue({
        status: 500,
        data: 'test error',
      });

      return expectSaga(fetchTransactions, mockApi, action)
        .put(AccountActions.setIsLoadingTransactions(true))
        .call(mockApi.fetchTransactions, action.externalId, action.filters)
        .put(AccountActions.setFetchTransactionsError(strings.accounts.transactions.error))
        .put(AccountActions.setIsLoadingTransactions(false))
        .run();
    });
  });

  describe('Send Legal Agreement', () => {
    const agreements = [{ type: 'AC_AG_1' }, { type: 'AC_AG_2' }, { type: 'AC_AG_3' }];

    const action = {
      externalId: '3f5949bf-9b0d-4682-b3e5-66c108d93844',
      agreements,
    };

    it('Should respond status 200', () => {
      mockApi.confirmLegalAgreement.mockReturnValue({
        status: 200,
      });

      return expectSaga(confirmLegalAgreement, mockApi, action)
        .put(AccountActions.setIsLoadingLegalAgreement(true))
        .call(mockApi.confirmLegalAgreement, action.externalId, agreements)
        .put(AccountActions.setLegalAgreementSuccess(true))
        .put(AccountActions.setIsLoadingLegalAgreement(false))
        .run();
    });

    it('Should respond with an error', () => {
      mockApi.confirmLegalAgreement.mockRejectedValue({
        status: 404,
      });

      return expectSaga(confirmLegalAgreement, mockApi, action)
        .put(AccountActions.setIsLoadingLegalAgreement(true))
        .call(mockApi.confirmLegalAgreement, action.externalId, agreements)
        .put(AccountActions.setLegalAgreementError(true))
        .put(AccountActions.setIsLoadingLegalAgreement(false))
        .run();
    });
  });

  describe('setOverdraftProtectionState', () => {
    it('should update store when api call is success', () => {
      const action = {
        externalId: 'some-id',
        overdraftState: OverdraftState.OPT_IN,
        userId: 'user-id',
      };

      mockApi.setOverdraftProtectionState.mockReturnValue({
        status: 200,
      });

      return expectSaga(setOverdraftProtectionState, mockApi, action)
        .call(mockApi.setOverdraftProtectionState, action.externalId, action.overdraftState)
        .put(AccountActions.setOverdraftProtectionStateSuccess(action.overdraftState))
        .put(RegisterActions.trackEvent(EVENTS.OVERDRAFT_PROTECTION_OPTED_IN, EVENT_TYPES.TRACK))
        .run();
    });
    it('should register an error when api call fails', () => {
      const action = {
        externalId: 'some-id',
        overdraftState: OverdraftState.OPT_IN,
      };

      mockApi.setOverdraftProtectionState.mockRejectedValue({
        status: 500,
        error: 'some error',
      });

      return expectSaga(setOverdraftProtectionState, mockApi, action)
        .call(mockApi.setOverdraftProtectionState, action.externalId, action.overdraftState)
        .put(AccountActions.setOverdraftProtectionError(strings.overdraftProtection.error))
        .run();
    });
  });

  describe('unlinkAccountCard', () => {
    it('should unlink card, dispatch action to update store, set success notification and track the success event', () => {
      const action = {
        externalId: 'some-id',
        cardId: 'card-id',
        userId: 'user-id',
      };

      mockApi.unlinkAccountCard.mockReturnValue({
        status: 200,
      });

      return expectSaga(unlinkAccountCard, mockApi, action)
        .put(AccountActions.setIsLoadingUnlinkDebitCard(true))
        .call(mockApi.unlinkAccountCard, action.externalId, action.cardId)
        .put(AccountActions.removeUnlinkedDebitCard(action.cardId))
        .put(AccountActions.setUnlinkDebitCardSuccess(true))
        .put(
          RegisterActions.trackEvent(EVENTS.ACCOUNT_DEBIT_CARD_UNLINK_SUCCESS, EVENT_TYPES.TRACK)
        )
        .run();
    });

    it('should set success notification error when card unlink fails', () => {
      const action = {
        externalId: 'some-id',
        cardId: 'card-id',
        userId: 'user-id',
      };

      mockApi.unlinkAccountCard.mockRejectedValue({
        status: 500,
      });

      return expectSaga(unlinkAccountCard, mockApi, action)
        .call(mockApi.unlinkAccountCard, action.externalId, action.cardId)
        .run();
    });
  });

  describe('activateCard', () => {
    it('should call the success action when the card is activated', () => {
      const action = {
        externalId: 'some-id',
        cardId: 'card-id',
        cardExpiryDate: 'user-id',
      };

      mockApi.activateCard.mockReturnValue({
        status: 200,
      });

      return expectSaga(activateCard, mockApi, action)
        .call(mockApi.activateCard, action.externalId, action.cardId, action.cardExpiryDate)
        .put(AccountActions.setActivateKinlyCardSuccess(true))
        .put(RegisterActions.trackEvent(EVENTS.ACTIVATE_CARD_SUCCESS, EVENT_TYPES.TRACK))
        .run();
    });

    it('should set a notification error when the card is not activated', () => {
      const action = {
        externalId: 'some-id',
        cardId: 'card-id',
        cardExpiryDate: 'user-id',
      };

      mockApi.activateCard.mockRejectedValue({
        status: 500,
      });

      return expectSaga(activateCard, mockApi, action)
        .call(mockApi.activateCard, action.externalId, action.cardId, action.cardExpiryDate)
        .put(AccountActions.setActivateKinlyCardError(true))
        .run();
    });
  });
});
