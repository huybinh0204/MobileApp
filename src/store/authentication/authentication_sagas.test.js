import jwtDecode from 'jwt-decode';
import { expectSaga } from 'redux-saga-test-plan';
import { select } from 'redux-saga/effects';
import { EVENTS, EVENT_TYPES } from '_constants';
import strings from '_localization';
import { AccountActions } from '_store/account';
import { CustomerActions } from '_store/customer';
import { FundDirectDepositStoreActions } from '_store/pageStore/fundDirectDepositStore';
import { RegisterActions } from '_store/register';
import { TransferActions } from '_store/transfer';
import { ISODateTimeFromNow } from '_utilities/date';
import { AuthenticationActions, AuthenticationSelectors } from './authentication_reducer';
import {
  fetchCurrentUserData,
  logout,
  resetPassword,
  signIn,
  signUp,
} from './authentication_sagas';

const userCredentials = {
  email: 'dev_aheadtest@a.com',
  password: 'Ahead123',
};

const mockApi = {
  setAuthorization: jest.fn(),
  clearAuthorization: jest.fn(),
  resetPassword: jest.fn(),
  signIn: jest.fn(),
  signUp: jest.fn(),
  getIdentity: jest.fn(),
  setIdentity: jest.fn(),
  fetchCurrentUserData: jest.fn(),
};

describe('Authentication Sagas', () => {
  const realDateTime = Date.now;

  const auth0Response = {
    accessToken:
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InYzZnpabjNoNnFBYnE3MXROWWprRSJ9.eyJpc3MiOiJodHRwczovL2F1dGguYWhlYWRtb25leS5jb20vIiwic3ViIjoiYXV0aDB8NWY5NzI5MDg3NWIyZjYwMDY5YTcwMWQ1IiwiYXVkIjoiaHR0cHM6Ly9hdXRoLmFoZWFkbW9uZXkuY29tIiwiaWF0IjoxNjA1NzI3MzYxLCJleHAiOjE2MDgzMTkzNjEsImF6cCI6IklnSldBenBoZ05rQ3JlZ0JnNkVxMk5XZ0ZIeXVlSUZrIiwiZ3R5IjoicGFzc3dvcmQifQ.JxyO-98KSEpUG0StSIbP2PNf4BSZtgyg6wiETa44rrvqk8fZZku-2Yu8lEoNno35wUI5C7_k3TWLKMdkGBh7f8Ro4nhVAcl7ABaF2J0NPpKtfJZ3s_uQT92rOU5NQkRTnzpcUMFFoheAuQPda2QOfgcP_UCoDL9-FYNIKkX0mHOGou7l8-TRY8kJ_lS1nGiYV-KKY7ydSjb8hHgb4h4XmFyHDDTlF7c0dv00_rWG7LhQngkY7zoo4OSfseRk5RQVFLRWeBnXOn_f6cwra--a8nmjc8-YrK-h_36ofw69lfm0jdQ9Cb6Z6k6rm4MGXkqgku2h7h3GiE4Gn_UMhtTiLg',
    expiresIn: 2592000,
    tokenType: 'Bearer',
  };

  const currentUserData = {
    email: 'dev_aheadtest@a.com',
    email_verified: false,
    name: 'dev_aheadtest@a.com',
    nickname: 'dev_aheadtest',
    sub: 'auth0|623a129c6d8d737cc12f3413',
    updated_at: '2022-03-22T18:17:00.893Z',
  };

  const identity = {
    externalId: '9df570b1-e079-466d-ab7f-33cc5affe7be',
    userExternalId: 'e8030600-8970-434f-85e1-ffb6aa9fefb3',
  };

  beforeEach(() => {
    mockApi.getIdentity.mockResolvedValue({ data: identity });
    mockApi.setIdentity.mockResolvedValue({ data: { userExternalId: identity.externalId } });
    mockApi.resetPassword.mockResolvedValue({});
    mockApi.signIn.mockResolvedValue(auth0Response);
    mockApi.signUp.mockResolvedValue(auth0Response);
    mockApi.fetchCurrentUserData.mockResolvedValue(currentUserData);
  });

  beforeAll(() => {
    Date.now = jest.fn(() => new Date('2021-01-01T00:00:00Z').getTime());
  });

  afterAll(() => {
    Date.now = realDateTime;
  });

  describe('SignUp', () => {
    it('Success', () => {
      const sessionTTL = auth0Response.expiresIn - 30;
      const expiration = ISODateTimeFromNow({ seconds: sessionTTL });
      const credentials = jwtDecode(auth0Response.accessToken);
      const accessToken = auth0Response.accessToken;
      const { email, password } = userCredentials;

      return expectSaga(signUp, mockApi, userCredentials)
        .put(AuthenticationActions.setIsLoading(true))
        .call(mockApi.signUp, email, password)
        .call(mockApi.signIn, email, password)
        .call(mockApi.setAuthorization, accessToken, credentials.sub)
        .call(mockApi.setIdentity, credentials.sub, email)
        .put(AuthenticationActions.setCredentials({ ...credentials, accessToken, expiration }))
        .put(RegisterActions.trackEvent(EVENTS.AUTH0_SIGN_UP_SUCCESS, EVENT_TYPES.TRACK))
        .put(AuthenticationActions.setIsLoading(false))
        .run();
    });

    it('Failure', () => {
      mockApi.signUp.mockRejectedValue('error');

      return expectSaga(signUp, mockApi, userCredentials)
        .put(AuthenticationActions.setIsLoading(true))
        .put(AuthenticationActions.setAuthenticationError(strings.signUp.authError))
        .put(AuthenticationActions.setIsLoading(false))
        .run();
    });
  });

  describe('Fetch Current User Data', () => {
    it('Success', () => {
      const credentials = auth0Response;

      return expectSaga(fetchCurrentUserData, mockApi)
        .put(AuthenticationActions.setIsLoadingCurrentUserData(true))
        .provide([[select(AuthenticationSelectors.getCredentials), credentials]])
        .call(mockApi.fetchCurrentUserData, credentials.accessToken)
        .put(AuthenticationActions.setCurrentUserData(currentUserData))
        .put(AuthenticationActions.setIsLoadingCurrentUserData(false))
        .run();
    });

    it('Failure', () => {
      mockApi.fetchCurrentUserData.mockRejectedValue('error');

      return expectSaga(fetchCurrentUserData, mockApi)
        .put(AuthenticationActions.setIsLoadingCurrentUserData(true))
        .put(AuthenticationActions.setCurrentUserDataError(true))
        .put(AuthenticationActions.setIsLoadingCurrentUserData(false))
        .run();
    });
  });

  describe('Sign In', () => {
    it('Success', () => {
      const sessionTTL = auth0Response.expiresIn - 30;
      const expiration = ISODateTimeFromNow({ seconds: sessionTTL });
      const credentials = jwtDecode(auth0Response.accessToken);
      const accessToken = auth0Response.accessToken;
      const { email, password } = userCredentials;

      return expectSaga(signIn, mockApi, userCredentials)
        .put(AuthenticationActions.setIsLoading(true))
        .call(mockApi.signIn, email, password)
        .call(mockApi.setAuthorization, accessToken, credentials.sub)
        .call(mockApi.getIdentity, credentials.sub)
        .put(AccountActions.setExternalId(identity.externalId))
        .put(CustomerActions.setExternalId(identity.userExternalId))
        .put(AuthenticationActions.setCredentials({ ...credentials, accessToken, expiration }))
        .put(AuthenticationActions.setIsSignIn(true))
        .put(RegisterActions.trackEvent(EVENTS.SIGN_IN_SUCCESS, EVENT_TYPES.TRACK))
        .put(AuthenticationActions.setIsLoading(false))
        .run();
    });

    it('Failure', () => {
      mockApi.signIn.mockRejectedValue('error');
      const { email, password } = userCredentials;

      return expectSaga(signIn, mockApi, { email, password })
        .put(AuthenticationActions.setIsLoading(true))
        .put(AuthenticationActions.setAuthenticationError(strings.signIn.defaultError))
        .put(AuthenticationActions.setIsLoading(false))
        .run();
    });
  });

  describe('Logout', () => {
    it('Success', () => {
      return expectSaga(logout, mockApi, { isUniversalLoginEnabled: false })
        .call(mockApi.clearAuthorization)
        .put(AuthenticationActions.resetAuthentication())
        .put(AccountActions.resetAccount())
        .put(TransferActions.resetTransfer())
        .put(FundDirectDepositStoreActions.resetRenderData())
        .run();
    });
  });

  describe('Reset Password', () => {
    it('Success', () => {
      const { email } = userCredentials;

      return expectSaga(resetPassword, mockApi, { email })
        .put(AuthenticationActions.setIsLoadingResetPassword(true))
        .call(mockApi.resetPassword, email)
        .put(AuthenticationActions.setResetPasswordSuccess(true))
        .put(RegisterActions.trackEvent(EVENTS.RESET_PASSWORD_EMAIL_SENT, EVENT_TYPES.TRACK))
        .put(AuthenticationActions.setIsLoadingResetPassword(false))
        .run();
    });

    it('Failure', () => {
      mockApi.resetPassword.mockRejectedValue('error');
      const { email } = userCredentials;

      return expectSaga(resetPassword, mockApi, { email })
        .put(AuthenticationActions.setIsLoadingResetPassword(true))
        .call(mockApi.resetPassword, email)
        .put(AuthenticationActions.setResetPasswordError(true))
        .put(AuthenticationActions.setIsLoadingResetPassword(false))
        .run();
    });
  });
});
