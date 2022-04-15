import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions(
  {
    // handled by the authentication_sagas
    logout: ['isUniversalLoginEnabled'],
    signUp: ['email', 'password'],
    signIn: { email: null, password: null, isEmailVerificationEnabled: null },
    resetPassword: ['email'],
    fetchCurrentUserData: [],
    // handled by the authentication_reducer
    setAuthenticationError: ['authenticationError'],
    setCredentials: ['credentials'],
    setCurrentUserData: ['currentUserData'],
    setCurrentUserDataError: ['currentUserDataError'],
    setIsLoading: ['isLoading'],
    setIsLoadingCurrentUserData: ['isLoadingCurrentUserData'],
    setIsLoadingResetPassword: ['isLoadingResetPassword'],
    setIsSessionExpired: ['isSessionExpired'],
    setIsSignIn: ['isSignIn'],
    setResetPasswordError: ['resetPasswordError'],
    setResetPasswordSuccess: ['resetPasswordSuccess'],
    resetAuthentication: ['overrides'],
  },
  {
    prefix: '@@BE-AUTHENTICATION/',
  }
);

export const AuthenticationActions = Creators;
export const AuthenticationTypes = Types;

// INITIAL STATE
export const INITIAL_STATE = Immutable({
  authenticationError: null,
  credentials: null,
  currentUserData: null,
  currentUserDataError: null,
  isLoading: false,
  isLoadingCurrentUserData: false,
  isLoadingResetPassword: false,
  isSessionExpired: false,
  isSignIn: false,
  resetPasswordError: false,
  resetPasswordSuccess: false,
});

// SELECTORS
export const AuthenticationSelectors = {
  getAuthentication: (state) => state.auth.credentials?.accessToken,
  getAuthenticationError: (state) => state.auth.authenticationError,
  getCurrentUserData: (state) => state.auth.currentUserData,
  getCurrentUserDataError: (state) => state.auth.currentUserDataError,
  getCredentials: (state) => state.auth.credentials,
  getIsLoading: (state) => state.auth.isLoading,
  getIsLoadingCurrentUserData: (state) => state.auth.isLoadingCurrentUserData,
  getIsLoadingResetPassword: (state) => state.auth.isLoadingResetPassword,
  getIsSessionExpired: (state) => state.auth.isSessionExpired,
  getIsSignIn: (state) => state.auth.isSignIn,
  getResetPasswordError: (state) => state.auth.resetPasswordError,
  getResetPasswordSuccess: (state) => state.auth.resetPasswordSuccess,
};

// ACTION HANDLERS
const resetAuthentication = (_state, { overrides = {} }) => {
  return INITIAL_STATE.merge({ ...overrides });
};

const setAuthenticationError = (state, { authenticationError }) => {
  return state.merge({ authenticationError });
};

const setCredentials = (state, { credentials }) => {
  return state.merge({ credentials });
};

const setCurrentUserDataError = (state, { currentUserDataError }) => {
  return state.merge({ currentUserDataError });
};

const setCurrentUserData = (state, { currentUserData }) => {
  return state.merge({ currentUserData });
};

const setIsLoading = (state, { isLoading }) => {
  return state.merge({ isLoading });
};

const setIsLoadingCurrentUserData = (state, { isLoadingCurrentUserData }) => {
  return state.merge({ isLoadingCurrentUserData });
};

const setIsLoadingResetPassword = (state, { isLoadingResetPassword }) => {
  return state.merge({ isLoadingResetPassword });
};

const setIsSessionExpired = (state, { isSessionExpired }) => {
  return state.merge({ isSessionExpired });
};

const setIsSignIn = (state, { isSignIn }) => {
  return state.merge({ isSignIn });
};

const setResetPasswordError = (state, { resetPasswordError }) => {
  return state.merge({ resetPasswordError });
};

const setResetPasswordSuccess = (state, { resetPasswordSuccess }) => {
  return state.merge({ resetPasswordSuccess });
};

// REDUCER
export const AuthenticationReducer = createReducer(INITIAL_STATE, {
  [Types.SET_AUTHENTICATION_ERROR]: setAuthenticationError,
  [Types.SET_CREDENTIALS]: setCredentials,
  [Types.SET_CURRENT_USER_DATA]: setCurrentUserData,
  [Types.SET_CURRENT_USER_DATA_ERROR]: setCurrentUserDataError,
  [Types.SET_IS_LOADING]: setIsLoading,
  [Types.SET_IS_LOADING_CURRENT_USER_DATA]: setIsLoadingCurrentUserData,
  [Types.SET_IS_LOADING_RESET_PASSWORD]: setIsLoadingResetPassword,
  [Types.SET_IS_SESSION_EXPIRED]: setIsSessionExpired,
  [Types.SET_IS_SIGN_IN]: setIsSignIn,
  [Types.SET_RESET_PASSWORD_ERROR]: setResetPasswordError,
  [Types.SET_RESET_PASSWORD_SUCCESS]: setResetPasswordSuccess,
  [Types.RESET_AUTHENTICATION]: resetAuthentication,
});
