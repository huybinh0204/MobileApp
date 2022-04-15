import { DEBIT_CARD_STATUS, OverdraftState, OverdraftStatus } from '_constants';
import {
  AccountActions as Actions,
  AccountReducer as Reducer,
  AccountSelectors as Selectors,
  INITIAL_STATE,
} from './account_reducer';

describe('Account Reducer', () => {
  describe('Actions', () => {
    it('should receive external id', () => {
      const externalId = '6012ac52-467d-4c1f-9ec7-9d8b35998a29';

      const state = Reducer(INITIAL_STATE, Actions.setExternalId(externalId));
      expect(state.externalId).toEqual(externalId);
    });

    it('should receive accounts list', () => {
      const accountsList = [
        {
          name: 'Plaid Checking 0000',
          id: '26',
          icon: 'bankInactive',
        },
      ];

      const state = Reducer(INITIAL_STATE, Actions.getLinkAccountsSuccess(accountsList));
      expect(state.accountsList).toEqual(accountsList);
    });

    it('should receive account info', () => {
      const accountInfo = { balance: 0 };
      const state = Reducer(INITIAL_STATE, Actions.setFetchAccountInfoSuccess(accountInfo));
      expect(state.accountInfo).toEqual(accountInfo);
    });

    it('should receive account transactions details', () => {
      const numberOfPages = 1;
      const transactions = [
        {
          type: 'CREDIT',
          details: 'test credit',
          amount: 200,
          createdDateTime: '2020-09-18 14:38:05',
        },
        {
          type: 'DEBIT',
          details: 'test credit',
          amount: 100,
          createdDateTime: '2020-09-18 14:38:05',
        },
      ];

      const state = Reducer(
        INITIAL_STATE,
        Actions.setFetchTransactionsSuccess(transactions, numberOfPages)
      );

      expect(state.transactionsDetails).toEqual(transactions);
      expect(state.transactionsNumberOfPages).toEqual(1);
    });

    it('should receive multiple transactions', () => {
      const numberOfPages = 2;

      const transactionsPage1 = [
        {
          type: 'CREDIT',
          details: 'test credit',
          amount: 200,
          createdDateTime: '2020-09-18 14:38:05',
        },
        {
          type: 'DEBIT',
          details: 'test credit',
          amount: 100,
          createdDateTime: '2020-09-18 14:38:05',
        },
      ];

      const transactionsPage2 = [
        {
          type: 'CREDIT',
          details: 'test credit',
          amount: 200,
          createdDateTime: '2020-09-18 14:38:05',
        },
        {
          type: 'DEBIT',
          details: 'test credit',
          amount: 100,
          createdDateTime: '2020-09-18 14:38:05',
        },
      ];

      let state = Reducer(
        INITIAL_STATE,
        Actions.setFetchTransactionsSuccess(transactionsPage1, numberOfPages)
      );

      state = Reducer(state, Actions.setFetchTransactionsSuccess(transactionsPage2, numberOfPages));

      expect(state.transactionsDetails).toHaveLength(4);
    });

    it('should receive account info loading state', () => {
      const state = Reducer(INITIAL_STATE, Actions.setIsLoadingAccountInfo(true));
      expect(state.isLoadingAccountInfo).toBeTruthy();
    });

    it('should receive account transactions loading state', () => {
      const state = Reducer(INITIAL_STATE, Actions.setIsLoadingTransactions(true));
      expect(state.isLoadingTransactions).toBeTruthy();
    });

    it('should reset state', () => {
      const state = Reducer(INITIAL_STATE, Actions.resetAccount());
      expect(state).toEqual(INITIAL_STATE);
    });

    it('should receive external id, card id and expiration date to activate card', () => {
      const externalId = '6012ac52-467d-4c1f-9ec7-9d8b35998a29';
      const cardId = '601';
      const expDate = '2025-12';

      const state = Reducer(INITIAL_STATE, Actions.activateCard(externalId, cardId, expDate));
      expect([state.externalId, cardId, expDate]).toEqual([state.externalId, cardId, expDate]);
    });
  });

  describe('Selectors', () => {
    let mockState;

    beforeEach(() => {
      mockState = {
        account: {
          externalId: '5d65f43a-6eda-4fc4-9d20-6c8faa912bd6',
          accountsList: [
            {
              name: 'Plaid Checking 0000',
              id: '26',
              icon: 'bankInactive',
            },
          ],
          accountInfo: {
            balance: 0,
          },
          transactionsDetails: [
            {
              type: 'CREDIT',
              details: 'test credit',
              amount: 200,
              createdDateTime: '2020-09-18 14:38:05',
            },
            {
              type: 'DEBIT',
              details: 'test credit',
              amount: 100,
              createdDateTime: '2020-09-18 14:38:05',
            },
          ],
          transactionsNumberOfPages: 1,
          isLoadingAccountInfo: false,
          transactionsAreLoaded: true,
          overdraft: {
            accountExists: true,
            state: OverdraftState.OPT_OUT,
            status: OverdraftStatus.ACTIVE,
            limit: 100,
            availableBalance: 50,
          },
          linkAchSuccess: false,
          linkAchError: false,
          isLoadingAchAccount: true,
          // ach
          unlinkAchSuccess: false,
          unlinkAchError: false,
          isLoadingUnlinkAchAccount: false,
          //card
          unlinkDebitCardSuccess: false,
          unlinkDebitCardError: false,
          isLoadingUnlinkDebitCard: false,
        },
      };
    });

    describe('getExternalId', () => {
      it('should return externalId if is setup', () => {
        const externalId = Selectors.getExternalId(mockState);
        expect(externalId).toEqual(mockState.account.externalId);
      });

      it('should return null if externalId is not setup', () => {
        mockState.account.externalId = null;
        const externalId = Selectors.getExternalId(mockState);
        expect(externalId).toBeNull();
      });
    });

    describe('getAccountList', () => {
      it('should return accountsList if is setup', () => {
        const accountsList = Selectors.getAccountList(mockState);
        expect(accountsList).toEqual(mockState.account.accountsList);
      });

      it('should return empty array if accountsList is not setup', () => {
        mockState.account.accountsList = [];
        const accountsList = Selectors.getAccountList(mockState);
        expect(accountsList).toHaveLength(0);
      });
    });

    describe('getAccountInfo', () => {
      it('should return accountInfo if is setup', () => {
        const accountInfo = Selectors.getAccountInfo(mockState);
        expect(accountInfo).toEqual(mockState.account.accountInfo);
      });

      it('should return null if accountInfo is not setup', () => {
        mockState.account.accountInfo = null;
        const accountInfo = Selectors.getAccountInfo(mockState);
        expect(accountInfo).toBeNull();
      });
    });

    describe('getTransactions', () => {
      it('should return transactions if is setup', () => {
        const transactionsDetails = Selectors.getTransactions(mockState);
        expect(transactionsDetails).toEqual(mockState.account.transactionsDetails);
      });

      it('should return empty array if transactions is not setup', () => {
        mockState.account.transactionsDetails = [];
        const transactionsDetails = Selectors.getTransactions(mockState);
        expect(transactionsDetails).toHaveLength(0);
      });
    });

    describe('getTransactionsNumberOfPages', () => {
      it('should return transactionsNumberOfPages if is setup', () => {
        const transactionsNumberOfPages = Selectors.getTransactionsNumberOfPages(mockState);
        expect(transactionsNumberOfPages).toEqual(mockState.account.transactionsNumberOfPages);
      });

      it('should return initial state if transactionsNumberOfPages is not setup', () => {
        mockState.account.transactionsNumberOfPages = INITIAL_STATE.transactionsNumberOfPages;
        const transactionsNumberOfPages = Selectors.getTransactionsNumberOfPages(mockState);
        expect(transactionsNumberOfPages).toEqual(INITIAL_STATE.transactionsNumberOfPages);
      });
    });

    describe('getIsLoadingAccountInfo', () => {
      it('should return false if isLoadingAccountInfo is false', () => {
        const isLoadingAccountInfo = Selectors.getIsLoadingAccountInfo(mockState);
        expect(isLoadingAccountInfo).toBeFalsy();
      });

      it('should return true if isLoadingAccountInfo is true', () => {
        mockState.account.isLoadingAccountInfo = true;
        const isLoadingAccountInfo = Selectors.getIsLoadingAccountInfo(mockState);
        expect(isLoadingAccountInfo).toBeTruthy();
      });
    });

    describe('getIsLoadingTransactions', () => {
      it('should return true if IsLoadingTransactions is active', () => {
        mockState.account.isLoadingTransactions = true;
        const isLoadingTransactions = Selectors.getIsLoadingTransactions(mockState);
        expect(isLoadingTransactions).toBeTruthy();
      });

      it('should return false if IsLoadingTransactions is inactive', () => {
        mockState.account.isLoadingTransactions = false;
        const isLoadingTransactions = Selectors.getIsLoadingTransactions(mockState);
        expect(isLoadingTransactions).toBeFalsy();
      });
    });

    describe('getOverdraft', () => {
      it('should return state, status, limit, available balance and accountExists', () => {
        const overdraft = Selectors.getOverdraft(mockState);
        expect(overdraft.state).toEqual(mockState.account.overdraft.state);
        expect(overdraft.status).toEqual(mockState.account.overdraft.status);
        expect(overdraft.limit).toEqual(mockState.account.overdraft.limit);
        expect(overdraft.availableBalance).toEqual(mockState.account.overdraft.availableBalance);
        expect(overdraft.accountExists).toEqual(mockState.account.overdraft.accountExists);
      });
    });

    describe('Link ACH Account', () => {
      it('should return if link ach has not run', () => {
        const achSuccess = Selectors.getLinkAchSuccess(mockState);
        expect(achSuccess).toBeFalsy();
      });

      it('should return if link ach finished successfully', () => {
        mockState.account.linkAchSuccess = true;
        const achSuccess = Selectors.getLinkAchSuccess(mockState);
        expect(achSuccess).toBeTruthy();
      });

      it('should return false if link ach fails', () => {
        mockState.account.linkAchError = true;
        const achError = Selectors.getLinkAchError(mockState);
        expect(achError).toBeTruthy();
      });

      it('should return truthy if link ach is loading', () => {
        mockState.account.isLoadingAchAccount = true;
        const isLoading = Selectors.getIsLoadingLinkAchAccount(mockState);
        expect(isLoading).toBeTruthy();
      });
    });

    describe('Unlink ACH Account', () => {
      it('should return if unlink ach has not run', () => {
        const achUnlinkSuccess = Selectors.getUnlinkAchSuccess(mockState);
        expect(achUnlinkSuccess).toBeFalsy();
      });

      it('should return if unlink ach finished successfully', () => {
        mockState.account.linkAchSuccess = true;
        const achUnlinkSuccess = Selectors.getLinkAchSuccess(mockState);
        expect(achUnlinkSuccess).toBeTruthy();
      });

      it('should return false if unlink ach fails', () => {
        mockState.account.unlinkAchError = true;
        const achUnlinkAchError = Selectors.getUnlinkAchError(mockState);
        expect(achUnlinkAchError).toBeTruthy();
      });

      it('should return truthy if unlink ach is loading', () => {
        mockState.account.isLoadingUnlinkAchAccount = true;
        const isLoading = Selectors.getIsLoadingUnlinkAchAccount(mockState);
        expect(isLoading).toBeTruthy();
      });
    });

    describe('Unlink Debit Card', () => {
      it('should return if unlink debit card has not run', () => {
        const unlinkDebitCardSuccess = Selectors.getUnlinkDebitCardSuccess(mockState);
        expect(unlinkDebitCardSuccess).toBeFalsy();
      });

      it('should return if unlink debit card finished successfully', () => {
        mockState.account.unlinkDebitCardSuccess = true;
        const unlinkDebitCardSuccess = Selectors.getUnlinkDebitCardSuccess(mockState);
        expect(unlinkDebitCardSuccess).toBeTruthy();
      });

      it('should return false if unlink debit card fails', () => {
        mockState.account.unlinkDebitCardError = true;
        const unlinkDebitCardError = Selectors.getUnlinkDebitCardError(mockState);
        expect(unlinkDebitCardError).toBeTruthy();
      });

      it('should return truthy if unlink ach is loading', () => {
        mockState.account.isLoadingUnlinkDebitCard = true;
        const isLoading = Selectors.getIsLoadingUnlinkDebitCard(mockState);
        expect(isLoading).toBeTruthy();
      });
    });

    describe('getCardForActivation', () => {
      it('should return a card with ready_to_activate status', () => {
        mockState.account.kinlyDebitCards = [
          {
            cardLastFour: '9247',
            status: DEBIT_CARD_STATUS.READY_TO_ACTIVATE,
            cardId: '680',
          },
        ];
        const card = Selectors.getCardForActivation(mockState);
        expect(card).toBeTruthy();
      });
      it('should return undefined when there is no card with the ready_to_activate status', () => {
        mockState.account.kinlyDebitCards = [
          {
            cardLastFour: '9247',
            status: 'Y',
            cardId: '680',
          },
        ];
        const card = Selectors.getCardForActivation(mockState);
        expect(card).toBeFalsy();
      });
    });
  });
});
