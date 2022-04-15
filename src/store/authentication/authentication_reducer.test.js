import {
  AuthenticationActions as Actions,
  AuthenticationReducer as Reducer,
  AuthenticationSelectors as Selectors,
  INITIAL_STATE,
} from './authentication_reducer';

const credentials = {
  updated_at: '2020-09-17T21:36:31.324Z',
  name: 'John Doe',
  email: 'john.doe@lendup.com',
  email_verified: false,
  iss: 'https://auth.aheadmoney.com/',
  sub: 'auth0|example',
  aud: 'example',
  iat: 1600378592,
  exp: 1600414592,
  accessToken: 'example.test.some-fes-test-xam-pel-tes-es-test',
};

const currentUserData = {
  email: 'john.doe@lendup.com',
  email_verified: false,
  name: 'john.doe@lendup.com',
  nickname: 'john.doe',
  picture:
    'https://s.gravatar.com/avatar/4156142fe4f1a731424e114916ca53eb?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fde.png',
  sub: 'auth0|623a129c6d8d737cc12f3413',
  updated_at: '2022-03-22T18:17:00.893Z',
};

describe('Authentication Reducer', () => {
  describe('Actions', () => {
    it('should receive authenticationError', () => {
      const state = Reducer(INITIAL_STATE, Actions.setAuthenticationError('error'));
      expect(state.authenticationError).toEqual('error');
    });

    it('should receive credentials', () => {
      const state = Reducer(INITIAL_STATE, Actions.setCredentials(credentials));
      expect(state.credentials).toEqual(credentials);
    });

    it('should receive isLoading', () => {
      const state = Reducer(INITIAL_STATE, Actions.setIsLoading(true));
      expect(state.isLoading).toEqual(true);
    });

    it('should receive isLoadingResetPassword', () => {
      const state = Reducer(INITIAL_STATE, Actions.setIsLoadingResetPassword(true));
      expect(state.isLoadingResetPassword).toEqual(true);
    });

    it('should receive isLoadingCurrentUserData', () => {
      const state = Reducer(INITIAL_STATE, Actions.setIsLoadingCurrentUserData(true));
      expect(state.isLoadingCurrentUserData).toEqual(true);
    });

    it('should receive isSessionExpired', () => {
      const state = Reducer(INITIAL_STATE, Actions.setIsSessionExpired(true));
      expect(state.isSessionExpired).toEqual(true);
    });

    it('should receive isSignIn', () => {
      const state = Reducer(INITIAL_STATE, Actions.setIsSignIn(true));
      expect(state.isSignIn).toEqual(true);
    });

    it('should receive setResetPasswordError', () => {
      const state = Reducer(INITIAL_STATE, Actions.setResetPasswordError(true));
      expect(state.resetPasswordError).toEqual(true);
    });

    it('should receive setResetPasswordSuccess', () => {
      const state = Reducer(INITIAL_STATE, Actions.setResetPasswordSuccess(true));
      expect(state.resetPasswordSuccess).toEqual(true);
    });

    it('should receive resetAuthentication', () => {
      const state = Reducer(INITIAL_STATE, Actions.resetAuthentication());
      expect(state).toEqual(INITIAL_STATE);
    });

    it('should receive current User Data', () => {
      const state = Reducer(INITIAL_STATE, Actions.setCurrentUserData(currentUserData));
      expect(state.currentUserData).toEqual(currentUserData);
    });

    it('should receive setCurrentUserDataError', () => {
      const state = Reducer(INITIAL_STATE, Actions.setCurrentUserDataError(true));
      expect(state.currentUserDataError).toEqual(true);
    });
  });

  describe('Selectors', () => {
    let mockState;

    beforeEach(() => {
      mockState = {
        auth: {
          authenticationError: 'error',
          credentials,
          currentUserData,
          isLoading: true,
          isLoadingResetPassword: true,
          isLoadingCurrentUserData: true,
          isSessionExpired: true,
          isSignIn: true,
          resetPasswordError: true,
          resetPasswordSuccess: true,
        },
      };
    });

    describe('getAuthentication', () => {
      it('should return true if credentials.accessToken is set', () => {
        const isAuthenticated = Selectors.getAuthentication(mockState);
        expect(isAuthenticated).toBeTruthy();
      });

      it('should return null if credentials.accessToken is not set', () => {
        mockState.auth.credentials = null;
        const isAuthenticated = Selectors.getAuthentication(mockState);
        expect(isAuthenticated).toBeFalsy();
      });
    });

    describe('getAuthenticationError', () => {
      it('should return the authenticationError if is set', () => {
        const authenticationError = Selectors.getAuthenticationError(mockState);
        expect(authenticationError).toEqual('error');
      });

      it('should return null if authenticationError is not set', () => {
        mockState.auth.authenticationError = null;
        const authenticationError = Selectors.getAuthenticationError(mockState);
        expect(authenticationError).toBeNull();
      });
    });

    describe('getCredentials', () => {
      it('should return credentials if is set', () => {
        const currentCredentials = Selectors.getCredentials(mockState);
        expect(currentCredentials).toEqual(mockState.auth.credentials);
      });

      it('should return null if credentials is not set', () => {
        mockState.auth.credentials = null;
        const externalId = Selectors.getCredentials(mockState);
        expect(externalId).toBeNull();
      });
    });

    describe('getIsLoading', () => {
      it('should return true if isLoading is set', () => {
        const isLoading = Selectors.getIsLoading(mockState);
        expect(isLoading).toBeTruthy();
      });

      it('should return false if isLoading is not set', () => {
        mockState.auth.isLoading = false;
        const isLoading = Selectors.getIsLoading(mockState);
        expect(isLoading).toBeFalsy();
      });
    });

    describe('getIsLoadingResetPassword', () => {
      it('should return true if isLoadingResetPassword is set', () => {
        const isLoadingResetPassword = Selectors.getIsLoadingResetPassword(mockState);
        expect(isLoadingResetPassword).toBeTruthy();
      });

      it('should return false if isLoadingResetPassword is not set', () => {
        mockState.auth.isLoadingResetPassword = false;
        const isLoadingResetPassword = Selectors.getIsLoadingResetPassword(mockState);
        expect(isLoadingResetPassword).toBeFalsy();
      });
    });

    describe('getIsSessionExpired', () => {
      it('should return true if isSessionExpired is set', () => {
        const isSessionExpired = Selectors.getIsSessionExpired(mockState);
        expect(isSessionExpired).toBeTruthy();
      });

      it('should return false if isSessionExpired is not set', () => {
        mockState.auth.isSessionExpired = false;
        const isSessionExpired = Selectors.getIsSessionExpired(mockState);
        expect(isSessionExpired).toBeFalsy();
      });
    });

    describe('getIsSignIn', () => {
      it('should return true if isSignIn is set', () => {
        const isSignIn = Selectors.getIsSignIn(mockState);
        expect(isSignIn).toBeTruthy();
      });

      it('should return false if isSignIn is not set', () => {
        mockState.auth.isSignIn = false;
        const isSignIn = Selectors.getIsSignIn(mockState);
        expect(isSignIn).toBeFalsy();
      });
    });

    describe('getResetPasswordError', () => {
      it('should return true if resetPasswordError is set', () => {
        const resetPasswordError = Selectors.getResetPasswordError(mockState);
        expect(resetPasswordError).toBeTruthy();
      });

      it('should return false if resetPasswordError is not set', () => {
        mockState.auth.resetPasswordError = false;
        const resetPasswordError = Selectors.getResetPasswordError(mockState);
        expect(resetPasswordError).toBeFalsy();
      });
    });

    describe('getResetPasswordSuccess', () => {
      it('should return true if resetPasswordSuccess is set', () => {
        const resetPasswordSuccess = Selectors.getResetPasswordSuccess(mockState);
        expect(resetPasswordSuccess).toBeTruthy();
      });

      it('should return false if resetPasswordSuccess is not set', () => {
        mockState.auth.resetPasswordSuccess = false;
        const resetPasswordSuccess = Selectors.getResetPasswordSuccess(mockState);
        expect(resetPasswordSuccess).toBeFalsy();
      });
    });

    describe('getIsLoadingCurrentUserData', () => {
      it('should return true if isLoading is set', () => {
        const isLoading = Selectors.getIsLoadingCurrentUserData(mockState);
        expect(isLoading).toBeTruthy();
      });

      it('should return false if isLoading is not set', () => {
        mockState.auth.isLoadingCurrentUserData = false;
        const isLoading = Selectors.getIsLoadingCurrentUserData(mockState);
        expect(isLoading).toBeFalsy();
      });
    });

    describe('getCurrentUserData', () => {
      it('should return current user data if is set', () => {
        const userData = Selectors.getCurrentUserData(mockState);
        expect(userData).toEqual(mockState.auth.currentUserData);
      });

      it('should return null if current user data is not set', () => {
        mockState.auth.currentUserData = null;
        const userData = Selectors.getCurrentUserData(mockState);
        expect(userData).toBeNull();
      });
    });
  });
});
