import { Dynatrace } from '@dynatrace/react-native-plugin';
import { call, put } from 'redux-saga/effects';
import { shouldReportError } from '_utilities/dynatrace';
import { FundDirectDepositStoreActions } from './fundDirectDepositStore_reducer';

export function* fetchRenderData(api, action) {
  const { externalId } = action;
  try {
    const { data } = yield call(api.getRenderData, externalId);
    yield put(FundDirectDepositStoreActions.fetchRenderDataSuccess(data));
  } catch (e) {
    const error = JSON.stringify(e);
    yield put(FundDirectDepositStoreActions.fetchRenderDataFail());
    if (shouldReportError(e?.status)) {
      yield call(Dynatrace.reportError, `Fetch Account & Routing Number Error: ${error}`, 0);
    }
  }
}
