import { Dynatrace } from '@dynatrace/react-native-plugin';
import { call, put } from 'redux-saga/effects';
import strings from '_localization';
import { shouldReportError } from '_utilities/dynatrace';
import { TransferActions } from './transfer_reducer';

export function* achIn(api, action) {
  const { data } = action;
  try {
    yield put(TransferActions.setIsLoading(true));
    yield call(api.achIn, data);
    yield put(TransferActions.achInSuccess());
  } catch (e) {
    const achInError = e.errorMessage ?? strings.moneyMovement.genericErrorToast;
    yield put(TransferActions.achInFail(achInError));
    if (shouldReportError(e?.status)) {
      yield call(Dynatrace.reportError, `ACH In Error: ${JSON.stringify(e)}`, 0);
    }
  } finally {
    yield put(TransferActions.setIsLoading(false));
  }
}

export function* achOut(api, action) {
  const { data } = action;
  try {
    yield put(TransferActions.setIsLoading(true));
    yield call(api.achOut, data);
    yield put(TransferActions.achOutSuccess());
  } catch (e) {
    const achOutError = e.errorMessage ?? strings.moneyMovement.genericErrorToast;
    yield put(TransferActions.achOutFail(achOutError));
    if (shouldReportError(e?.status)) {
      yield call(Dynatrace.reportError, `ACH Out Error: ${JSON.stringify(e)}`, 0);
    }
  } finally {
    yield put(TransferActions.setIsLoading(false));
  }
}

export function* instantOut(api, action) {
  const { data } = action;
  try {
    yield put(TransferActions.setIsLoading(true));
    yield call(api.instantOut, data);
    yield put(TransferActions.instantOutSuccess());
  } catch (e) {
    const instantOutError = e.errorMessage ?? strings.moneyMovement.genericErrorToast;
    yield put(TransferActions.instantOutFail(instantOutError));
    if (shouldReportError(e?.status)) {
      yield call(Dynatrace.reportError, `Instant Out Error: ${JSON.stringify(e)}`, 0);
    }
  } finally {
    yield put(TransferActions.setIsLoading(false));
  }
}
