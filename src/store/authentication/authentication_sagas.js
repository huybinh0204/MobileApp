import { Dynatrace } from '@dynatrace/react-native-plugin';
import jwtDecode from 'jwt-decode';
import { call, put, select } from 'redux-saga/effects';
import { AUTH0_ERRORS, EVENTS, EVENT_TYPES, NAVIGATION } from '_constants';
import strings from '_localization';
import AppsFlyerService from '_services/AppsFlyerService';
import BrazeService from '_services/BrazeService';
import { navigate } from '_services/NavigationService';
import { AccountActions } from '_store/account';
import { CustomerActions } from '_store/customer';
import { FundDirectDepositStoreActions } from '_store/pageStore/fundDirectDepositStore';
import { RegisterActions } from '_store/register';
import { TransferActions } from '_store/transfer';
import { ISODateTimeFromNow } from '_utilities/date';
import { shouldReportError } from '_utilities/dynatrace';
import { AuthenticationActions, AuthenticationSelectors } from './authentication_reducer';

export function* signIn(api, { email, password, isEmailVerificationEnabled }) {
  let auth0IdToken = null;

  try {
    yield put(AuthenticationActions.setIsLoading(true));

    const isEmbeddedFlow = email && password;
    const { accessToken, expiresIn, idToken } = isEmbeddedFlow
      ? yield call(api.signIn, email, password) // API call
      : yield call(api.authorize); // Universal Login

    auth0IdToken = idToken;
    const sessionTTL = expiresIn - 30; // add 30 sec margin to prevent the token from expiring during the request
    const expiration = yield call(ISODateTimeFromNow, { seconds: sessionTTL });
    const credentials = yield call(jwtDecode, accessToken);
    const userId = credentials.sub;

    yield call(api.setAuthorization, accessToken, userId);
    yield put(AuthenticationActions.setCredentials({ ...credentials, accessToken, expiration }));
    const { data } = yield call(api.getIdentity, userId);
    const {
      externalId: accountExternalId,
      userExternalId: customerExternalId,
      mustContinueOnboarding,
    } = data;

    if (mustContinueOnboarding) {
      const userData = auth0IdToken ? yield call(jwtDecode, auth0IdToken) : null;
      yield put(CustomerActions.setExternalId(customerExternalId));

      const targetScreen = isEmailVerificationEnabled
        ? NAVIGATION.auth.signUpMailVerification
        : NAVIGATION.auth.signUpPhone;
      yield call(navigate, targetScreen, { email: email ?? userData?.email });

      yield put(RegisterActions.trackEvent(EVENTS.ONBOARDING_RESUMED, EVENT_TYPES.TRACK));
    } else {
      yield call(BrazeService.changeUser, customerExternalId);
      yield call(AppsFlyerService.identify, customerExternalId);
      yield call(Dynatrace.identifyUser, customerExternalId);
      yield put(AccountActions.setExternalId(accountExternalId));
      yield put(CustomerActions.setExternalId(customerExternalId));
      yield put(AuthenticationActions.setIsSignIn(true));
      yield put(RegisterActions.trackEvent(EVENTS.SIGN_IN_SUCCESS, EVENT_TYPES.TRACK));
    }
  } catch (e) {
    if (e?.error === AUTH0_ERRORS.USER_CANCELLED_LOGIN) {
      return;
    }

    const { description, title } = strings.signIn.defaultError;
    let error = e?.errorMessage ?? { title, description: e?.message ?? description };
    if (e?.message === AUTH0_ERRORS.SIGN_IN_OUTSIDE_US) {
      error = strings.signIn.outsideUSError;
    }

    yield put(AuthenticationActions.setAuthenticationError(error));
    if (shouldReportError(e?.status)) {
      yield call(Dynatrace.reportError, `Sign In Error: ${JSON.stringify(e)}`, 0);
    }
  } finally {
    yield put(AuthenticationActions.setIsLoading(false));
  }
}

export function* signUp(api, { email, password }) {
  try {
    yield put(AuthenticationActions.setIsLoading(true));
    yield call(api.signUp, email, password);
    const { accessToken, expiresIn } = yield call(api.signIn, email, password);
    const sessionTTL = expiresIn - 30; // add 30 sec margin to prevent the token from expiring during the request
    const expiration = yield call(ISODateTimeFromNow, { seconds: sessionTTL });
    const credentials = yield call(jwtDecode, accessToken);
    const userId = credentials.sub;
    yield call(api.setAuthorization, accessToken, userId);
    const { data } = yield call(api.setIdentity, userId, email);
    const { userExternalId: customerExternalId } = data;
    yield put(CustomerActions.setExternalId(customerExternalId));
    yield put(AuthenticationActions.setCredentials({ ...credentials, accessToken, expiration }));
    yield put(RegisterActions.trackEvent(EVENTS.AUTH0_SIGN_UP_SUCCESS, EVENT_TYPES.TRACK));
    yield call(AppsFlyerService.track, EVENTS.AF_COMPLETE_AUTH0_REGISTRATION);
  } catch (e) {
    const { description, title } = strings.signUp.authError;
    let error = { title, description: e?.message ?? description };

    if (e?.code === AUTH0_ERRORS.INVALID_SIGN_UP) {
      error = strings.signUp.signUpExistAccountError;
    }

    if (e?.message === AUTH0_ERRORS.NO_SIGN_UP_OUTSIDE_US) {
      error = strings.signUp.signUpBlockSignUpError.outsideUS;
    }
    yield put(AuthenticationActions.setAuthenticationError(error));
    if (shouldReportError(e?.status)) {
      yield call(Dynatrace.reportError, `Sign Up Auth0 Error: ${JSON.stringify(e)}`, 0);
    }
  } finally {
    yield put(AuthenticationActions.setIsLoading(false));
  }
}

export function* fetchCurrentUserData(api) {
  try {
    yield put(AuthenticationActions.setIsLoadingCurrentUserData(true));
    const credentials = yield select(AuthenticationSelectors.getCredentials);
    const accessToken = credentials?.accessToken ?? null;
    const currentUserData = yield call(api.fetchCurrentUserData, accessToken);
    yield put(AuthenticationActions.setCurrentUserData(currentUserData));
  } catch (e) {
    yield put(AuthenticationActions.setCurrentUserDataError(true));
    if (shouldReportError(e?.status)) {
      yield call(Dynatrace.reportError, `Fetch Current User Data Error: ${JSON.stringify(e)}`, 0);
    }
  } finally {
    yield put(AuthenticationActions.setIsLoadingCurrentUserData(false));
  }
}

export function* logout(api, { isUniversalLoginEnabled }) {
  try {
    if (isUniversalLoginEnabled) {
      yield call(api.clearSession);
    }
    yield call(api.clearAuthorization);
    yield put(AuthenticationActions.resetAuthentication());
    yield put(AccountActions.resetAccount());
    yield put(TransferActions.resetTransfer());
    yield put(FundDirectDepositStoreActions.resetRenderData());
    yield call(AppsFlyerService.reset);
  } catch (e) {
    if (e?.error !== AUTH0_ERRORS.USER_CANCELLED_LOGIN) {
      yield call(Dynatrace.reportError, `Sign Out Auth0 Error: ${JSON.stringify(e)}`, 0);
    }
  }
}

export function* resetPassword(api, { email }) {
  try {
    yield put(AuthenticationActions.setIsLoadingResetPassword(true));
    yield call(api.resetPassword, email);
    yield put(AuthenticationActions.setResetPasswordSuccess(true));
    yield put(RegisterActions.trackEvent(EVENTS.RESET_PASSWORD_EMAIL_SENT, EVENT_TYPES.TRACK));
  } catch (e) {
    yield put(AuthenticationActions.setResetPasswordError(true));
    if (shouldReportError(e?.status)) {
      yield call(Dynatrace.reportError, `Reset Password Error: ${JSON.stringify(e)}`, 0);
    }
  } finally {
    yield put(AuthenticationActions.setIsLoadingResetPassword(false));
  }
}
