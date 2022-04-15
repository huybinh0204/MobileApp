import { expectSaga } from 'redux-saga-test-plan';
import { fetchRenderData } from './fundDirectDepositStore_sagas';
import { FundDirectDepositStoreActions } from './fundDirectDepositStore_reducer';

describe('FundDirectDepositStoreSaga', () => {
  const testExternalId = '6012ac52-467d-4c1f-9ec7-9d8b35998a29';
  const mockApi = {
    getRenderData: jest.fn(),
    submitDirectDepositForm: jest.fn(),
  };
  describe('fetchRenderData', () => {
    it('should fetch the render data and dispatch fetchRenderDataSuccess action on success', () => {
      mockApi.getRenderData.mockReturnValue({
        status: 200,
        data: {
          accountNumber: 123456789,
          routingNumber: 123456789,
        },
      });
      return expectSaga(fetchRenderData, mockApi, { externalId: testExternalId })
        .call(mockApi.getRenderData, testExternalId)
        .put(
          FundDirectDepositStoreActions.fetchRenderDataSuccess({
            accountNumber: 123456789,
            routingNumber: 123456789,
          })
        )
        .run();
    });
    it('should fetch the render data and dispatch fetchRenderDataFail action on error', () => {
      mockApi.getRenderData.mockRejectedValue({ status: 500 });
      return expectSaga(fetchRenderData, mockApi, { externalId: testExternalId })
        .call(mockApi.getRenderData, testExternalId)
        .put(FundDirectDepositStoreActions.fetchRenderDataFail())
        .run();
    });
  });
});
