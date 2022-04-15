import { Dynatrace } from '@dynatrace/react-native-plugin';
import { call, put } from 'redux-saga/effects';
import strings from '_localization';
import { shouldReportError } from '_utilities/dynatrace';
import { CustomerActions } from './customer_reducer';

export function* fetchCustomer(api, action) {
  const { customerExternalId } = action;
  try {
    yield put(CustomerActions.setIsLoading(true));
    const { data: customer } = yield call(api.fetchCustomer, customerExternalId);
    yield put(CustomerActions.setFetchCustomerSuccess(customer));
  } catch (e) {
    const errorMessage = e?.errorMessage ?? strings.fetchCustomer.error;
    yield put(CustomerActions.setFetchCustomerError(errorMessage));
    if (shouldReportError(e?.status)) {
      yield call(Dynatrace.reportError, `Fetch Customer Error: ${JSON.stringify(e)}`, 0);
    }
  } finally {
    yield put(CustomerActions.setIsLoading(false));
  }
}

export function* updateAddress(api, action) {
  const { customerExternalId, address } = action;
  try {
    yield put(CustomerActions.setIsLoading(true));
    yield call(api.updateAddress, customerExternalId, address);
    yield put(CustomerActions.updateCustomerData({ ...address }));
    yield put(CustomerActions.setUpdateAddressSuccess(true));
  } catch (e) {
    const errorMessage = e?.errorMessage ?? strings.updateAddress.error;
    yield put(CustomerActions.setUpdateAddressError(errorMessage));
    if (shouldReportError(e?.status)) {
      yield call(Dynatrace.reportError, `Customer Address Update Error: ${JSON.stringify(e)}`, 0);
    }
  } finally {
    yield put(CustomerActions.setIsLoading(false));
  }
}

export function* updateEmail(api, action) {
  const { customerExternalId, email } = action;
  try {
    yield put(CustomerActions.setIsLoading(true));
    yield call(api.updateEmail, customerExternalId, email);
    yield put(CustomerActions.updateCustomerData({ email }));
    yield put(CustomerActions.setUpdateEmailSuccess(true));
  } catch (e) {
    const errorMessage = e?.errorMessage ?? strings.updateEmail.error;
    yield put(CustomerActions.setUpdateEmailError(errorMessage));
    if (shouldReportError(e?.status)) {
      yield call(Dynatrace.reportError, `Customer Email Update Error: ${JSON.stringify(e)}`, 0);
    }
  } finally {
    yield put(CustomerActions.setIsLoading(false));
  }
}

export function* startPhoneVerification(api, action) {
  const { customerExternalId, phoneNumber } = action;
  try {
    yield put(CustomerActions.setIsLoading(true));
    yield call(api.startPhoneVerification, customerExternalId, phoneNumber);
    yield put(CustomerActions.setPhoneVerificationSuccess(true));
  } catch (e) {
    const errorMessage = e?.errorMessage ?? strings.phoneVerification.startVerification.error;
    yield put(CustomerActions.setPhoneVerificationError(errorMessage));
    if (shouldReportError(e?.status)) {
      yield call(Dynatrace.reportError, `Phone Verification Error: ${JSON.stringify(e)}`, 0);
    }
  } finally {
    yield put(CustomerActions.setIsLoading(false));
  }
}

export function* confirmPhoneVerification(api, action) {
  const { customerExternalId, code, phoneNumber } = action;
  try {
    yield put(CustomerActions.setIsLoading(true));
    yield call(api.confirmPhoneVerification, code, customerExternalId, phoneNumber);
    yield put(CustomerActions.setConfirmPhoneVerificationSuccess(true));
  } catch (e) {
    const errorMessage = e?.errorMessage ?? strings.phoneVerification.confirmVerification.error;
    yield put(CustomerActions.setConfirmPhoneVerificationError(errorMessage));
    if (shouldReportError(e?.status)) {
      yield call(Dynatrace.reportError, `Phone Verification Error: ${JSON.stringify(e)}`, 0);
    }
  } finally {
    yield put(CustomerActions.setIsLoading(false));
  }
}

export function* checkVerificationStatus(api, action) {
  const { customerExternalId, field } = action;
  try {
    yield put(CustomerActions.setIsLoading(true));
    const { data: status } = yield call(api.checkVerificationStatus, field, customerExternalId);
    yield put(CustomerActions.setVerificationStatus(status.verified));
  } catch (e) {
    const errorMessage = e?.errorMessage ?? strings.phoneVerification.confirmVerification.error;
    yield put(CustomerActions.setVerificationStatusError(errorMessage));

    if (shouldReportError(e?.status)) {
      yield call(Dynatrace.reportError, `Verify ${field} Status Error: ${JSON.stringify(e)}`, 0);
    }
  } finally {
    yield put(CustomerActions.setIsLoading(false));
  }
}

export function* getSuggestedAddresses(api, action) {
  const { address } = action;
  try {
    yield put(CustomerActions.setIsLoading(true));

    if (address.trim().length === 0) {
      yield put(CustomerActions.setSuggestedAddresses([]));
      return;
    }

    const { data } = yield call(api.getSuggestedAddresses, address);
    const suggestedAddresses =
      data?.suggestions?.length > 0
        ? data.suggestions
        : [
            {
              primary_line: address,
              city: '',
              state: '',
              zip_code: '',
            },
          ];
    yield put(CustomerActions.setSuggestedAddresses(suggestedAddresses));
  } catch (e) {
    const errorMessage = e?.errorMessage ?? strings.addressAutocompleteSuggestion.error;
    yield put(CustomerActions.setSuggestedAddressesError(errorMessage));
    if (shouldReportError(e?.status)) {
      yield call(
        Dynatrace.reportError,
        `Address autocomplete suggestion Error: ${JSON.stringify(e)}`,
        0
      );
    }
  } finally {
    yield put(CustomerActions.setIsLoading(false));
  }
}
