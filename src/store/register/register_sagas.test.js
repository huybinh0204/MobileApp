import { expectSaga } from 'redux-saga-test-plan';
import { CustomerSelectors } from '_store/customer';
import { RegisterActions } from './register_reducer';
import { trackEvent } from './register_sagas';

describe('Register Sagas', () => {
  const userId = 'user-id';
  const getUserExternalIdSpy = jest.spyOn(CustomerSelectors, 'getExternalId');
  const mockApi = {
    sendEvent: jest.fn(),
  };
  const action = {
    event: 'SOME_EVENT',
    properties: {},
    eventType: 'SCREEN',
  };

  describe('trackEvent', () => {
    beforeEach(() => {
      mockApi.sendEvent.mockReturnValue({ ok: true });
      getUserExternalIdSpy.mockReturnValue(userId);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('gets the externalUserId from account store and sends it as userId in api call', () => {
      return expectSaga(trackEvent, mockApi, action)
        .select(CustomerSelectors.getExternalId)
        .call(mockApi.sendEvent, action.event, action.properties, action.eventType, userId)
        .put(RegisterActions.trackEventSuccess(action.event))
        .run();
    });

    it('dispatches success action if api call is success', () => {
      return expectSaga(trackEvent, mockApi, action)
        .select(CustomerSelectors.getExternalId)
        .call(mockApi.sendEvent, action.event, action.properties, action.eventType, userId)
        .put(RegisterActions.trackEventSuccess(action.event))
        .run();
    });

    it('dispatches fail action if api call fails', () => {
      const failureResponse = { ok: false, data: 'error' };
      mockApi.sendEvent.mockRejectedValue(failureResponse);

      return expectSaga(trackEvent, mockApi, action)
        .select(CustomerSelectors.getExternalId)
        .call(mockApi.sendEvent, action.event, action.properties, action.eventType, userId)
        .put(RegisterActions.trackEventFails(`${action.event} with ${failureResponse}`))
        .run();
    });
  });
});
