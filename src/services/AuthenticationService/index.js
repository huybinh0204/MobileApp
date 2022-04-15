import Auth0 from 'react-native-auth0';
import ENV from 'react-native-config';

export default function AuthenticationService(api) {
  const connection = ENV.AUTH0_CONNECTION;

  const { auth, webAuth } = new Auth0({
    clientId: ENV.AUTH0_CLIENT_ID,
    domain: ENV.AUTH0_DOMAIN_URI,
  });

  return {
    fetchCurrentUserData(token) {
      if (!token) {
        throw new Error('token must be set');
      }

      return auth.userInfo({ token });
    },
    getIdentity(userId) {
      if (!userId) {
        throw new Error('userId must be set');
      }

      return api.get(`${ENV.EXPERIENCE_LAYER_URIS_IDENTITIES}/${userId}`);
    },
    setIdentity(userId, email) {
      if (!userId || !email) {
        throw new Error('userId and email must be set');
      }

      return api.post(`${ENV.EXPERIENCE_LAYER_URIS_IDENTITIES}/${userId}`, { email });
    },
    resetPassword(email) {
      if (!email) {
        throw new Error('email must be set');
      }

      return auth.resetPassword({ email, connection });
    },
    signUp(email, password) {
      if (!email || !password) {
        throw new Error('email and password must be set');
      }

      return auth.createUser({ email, password, connection });
    },
    signIn(email, password) {
      if (!email || !password) {
        throw new Error('email and password must be set');
      }

      return auth.passwordRealm({
        username: email,
        password,
        realm: connection,
        scope: 'openid email profile',
      });
    },
    authorize() {
      const parameters = {
        prompt: 'login',
        scope: 'openid email profile',
      };

      const options = {
        skipLegacyListener: true,
      };

      return webAuth.authorize(parameters, options);
    },
    clearSession() {
      const parameters = {};

      const options = {
        skipLegacyListener: true,
      };

      return webAuth.clearSession(parameters, options);
    },
  };
}
