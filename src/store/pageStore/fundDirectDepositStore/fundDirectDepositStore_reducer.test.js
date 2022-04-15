import {
  INITIAL_STATE,
  FundDirectDepositStoreSelectors,
  FundDirectDepositStoreActions,
  FundDirectDepositStoreReducer,
} from './fundDirectDepositStore_reducer';

describe('FundDirectDepositStoreReducer', () => {
  describe('Reducers', () => {
    it('should set render data', () => {
      const state = FundDirectDepositStoreReducer(
        INITIAL_STATE,
        FundDirectDepositStoreActions.fetchRenderDataSuccess({
          accountNumber: 123,
          routingNumber: 456,
        })
      );

      expect(state.renderData.accountNumber).toBe(123);
      expect(state.renderData.routingNumber).toBe(456);
    });
    it('should set render data error', () => {
      const state = FundDirectDepositStoreReducer(
        INITIAL_STATE,
        FundDirectDepositStoreActions.fetchRenderDataFail()
      );
      expect(state.renderDataError).toBeTruthy();
    });
    it('should reset render data', () => {
      const state = FundDirectDepositStoreReducer(
        INITIAL_STATE,
        FundDirectDepositStoreActions.resetRenderData()
      );
      expect(state).toBe(INITIAL_STATE);
    });
  });
  describe('Selectors', () => {
    let mockState;

    beforeEach(() => {
      mockState = {
        fundDirectDepositStoreReducer: {
          renderData: {
            accountNumber: 12345678,
            routingNumber: 12345678,
          },
          renderDataError: false,
        },
      };
    });

    it('should get render data', () => {
      const renderData = FundDirectDepositStoreSelectors.getRenderData(mockState);
      expect(renderData.accountNumber).toBe(
        mockState.fundDirectDepositStoreReducer.renderData.accountNumber
      );
      expect(renderData.routingNumber).toBe(
        mockState.fundDirectDepositStoreReducer.renderData.routingNumber
      );
    });
    it('should get render data error', () => {
      const renderDataError = FundDirectDepositStoreSelectors.getRenderDataError(mockState);
      expect(renderDataError).toBe(mockState.fundDirectDepositStoreReducer.renderDataError);
    });
  });
});
