import { call, put, select } from 'redux-saga/effects';
import { EVENT_TYPES } from '_constants';
import { CustomerSelectors } from '_store/customer';
import { RegisterActions } from './register_reducer';

export function* trackEvent(api, action) {
  const { event, properties = {}, eventType = EVENT_TYPES.SCREEN } = action;
  const customerExternalId = yield select(CustomerSelectors.getExternalId);
  const userId = customerExternalId ?? 'unknown';

  if (!EVENT_TYPES[eventType]) {
    console.warn(`Invalid argument: ${eventType} is not a valid eventType`);
  }

  try {
    yield call(api.sendEvent, event, properties, eventType, userId);
    yield put(RegisterActions.trackEventSuccess(event));
  } catch (e) {
    yield put(RegisterActions.trackEventFails(`${event} with ${e}`));
  }
}
