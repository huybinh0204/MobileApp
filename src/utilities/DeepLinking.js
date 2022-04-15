import ENV from 'react-native-config';
import { NAVIGATION } from '_constants';

export const linking = {
  prefixes: [ENV.URL_SCHEME, ENV.APPS_FLYER_URI],
  config: {
    screens: {
      MainApp: {
        initialRouteName: NAVIGATION.shared.main,
        screens: {
          [NAVIGATION.card.activateCard]: 'activate-card',
          [NAVIGATION.shared.earlyPaycheck]: 'early-paycheck',
          [NAVIGATION.shared.overdraftSell]: 'set-overdraft',
          [NAVIGATION.shared.addMoney]: 'add-money',
          [NAVIGATION.accounts.linkCard]: 'link-card',
          [NAVIGATION.settings.main]: 'settings',
          [NAVIGATION.shared.main]: {
            initialRouteName: NAVIGATION.home.stack,
            screens: {
              [NAVIGATION.home.stack]: {
                screens: {
                  [NAVIGATION.home.main]: 'home',
                },
              },
              [NAVIGATION.accounts.stack]: {
                screens: {
                  [NAVIGATION.accounts.main]: 'accounts-tab',
                },
              },
              [NAVIGATION.card.stack]: {
                screens: {
                  [NAVIGATION.card.main]: 'card-tab',
                },
              },
            },
          },
        },
      },
      SubApp: {
        initialRouteName: NAVIGATION.auth.welcome,
        screens: {
          [NAVIGATION.auth.signUpMail]: 'sign-up',
          [NAVIGATION.auth.signIn]: 'sign-in',
        },
      },
    },
  },
};

/**
 * @param {string} deepLink
 */
export function getDeepLinkPath(deepLink) {
  return deepLink.replace(ENV.URL_SCHEME, '');
}

/**
 * @param {string} path
 */
export function cleanPath(path) {
  const paramsIndex = path.indexOf('?');
  return paramsIndex === -1 ? path : path.substr(0, paramsIndex);
}

/**
 * @param {string} deepLink
 */
export function isUrlScheme(deepLink) {
  return deepLink.startsWith(ENV.URL_SCHEME);
}
