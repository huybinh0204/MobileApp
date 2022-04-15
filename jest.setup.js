global.__DEV__ = false;

const { ATOMIC_TYPES } = require('_constants');
const mockAtomicTypes = ATOMIC_TYPES;

jest.mock('react-native-localization', () => {
  return require('./test/mocks/react-native-localization-mock');
});

jest.mock('react-native-localize', () => {
  return require('./test/mocks/react-native-localize-mock');
});

jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn().mockResolvedValueOnce(),
  show: jest.fn().mockResolvedValueOnce(),
  getVisibilityStatus: jest.fn().mockResolvedValue('hidden'),
}));

jest.mock('react-native-reanimated', () => {
  const reanimatedMock = require('react-native-reanimated/mock');
  reanimatedMock.useValue = (val) => new reanimatedMock.Value(val);

  return reanimatedMock;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-config', () => ({
  BUILD_VARIANT: 'TEST',
  EXPERIENCE_LAYER_BASE_URL: 'test',
  EXPERIENCE_LAYER_URIS_ACCOUNTS: 'accounts',
  EXPERIENCE_LAYER_URIS_EVENTS: 'events',
  EXPERIENCE_LAYER_URIS_IDENTITIES: 'identities',
  EXPERIENCE_LAYER_URIS_PAGES: 'pages',
  EXPERIENCE_LAYER_URIS_PLAID: 'plaid',
  URL_SCHEME: 'aheadmoneyapptest://',
  APPS_FLYER_URI: 'https://aheadmoney.com',
  AUTH0_CLIENT_ID: 'test',
  AUTH0_DOMAIN_URI: 'test',
  VGS_COLLECT_SCRIPT_URI: 'test',
  VGS_COLLECT_KEY: 'test',
  FIND_ATM_URI: 'https://atm-url',
  FIND_PLACE_TO_DEPOSIT_CASH_URI: 'https://place-to-deposit-cash-url',
  OVERDRAFT_LEGAL_AGREEMENT_URL: 'https://overdraft-tyc-url',
  DEPOSIT_CASH_AGREEMENT_URL: 'https://deposit-cash-tyc-url',
  ELECTRONIC_DISCLOSURE_AGREEMENT_URL: 'https://electronic-communication-agreement-url',
  ACH_IN_LOWER: '0.001',
  ACH_IN_UPPER: '5000',
  ACH_OUT_LOWER: '0.001',
  ACH_OUT_UPPER: '999999',
  INSTANT_OUT_LOWER: '1.25',
  INSTANT_OUT_UPPER: '250',
  TRANSFER_FEE: '0.015',
  MINIMUM_FEE: '0.25',
}));

jest.mock('react-native-share', () => ({
  open: jest.fn().mockResolvedValue({ dismissedAction: false }),
}));

jest.mock('@react-native-community/clipboard', () => ({
  setString: jest.fn(),
}));

jest.mock('react-native-blob-util', () => {
  const blobFetch = jest.fn().mockImplementation(() => {
    const promise = Promise.resolve({ path: jest.fn(() => 'filePath') });
    promise.cancel = jest.fn();
    return promise;
  });

  return {
    fetch: blobFetch,
    config: jest.fn(() => ({
      fetch: blobFetch,
    })),
    fs: {
      dirs: {
        DocumentDir: 'documents',
      },
      unlink: jest.fn(),
    },
  };
});

jest.mock('react-native-device-info', () => ({
  getBuildNumber: jest.fn(() => 'buildNumber'),
  getVersion: jest.fn(() => 'appVersion'),
  getUniqueId: jest.fn(() => 'deviceId'),
  isTablet: jest.fn(() => false),
}));

jest.mock('@dynatrace/react-native-plugin', () => ({
  Dynatrace: {
    identifyUser: jest.fn(),
    reportError: jest.fn(),
    enterAction: jest.fn(() => ({ leaveAction: jest.fn() })),
  },
}));

jest.mock('react-native-appsflyer', () => ({
  initSdk: jest.fn(() => Promise.resolve()),
  logEvent: jest.fn(() => null),
  onDeepLink: jest.fn(() => null),
  setCustomerUserId: jest.fn(() => null),
  stop: jest.fn(() => null),
}));

jest.mock('react-native-randombytes', () => ({}));

jest.mock('@splitsoftware/splitio-react');

jest.mock('react-native-appboy-sdk', () => ({
  changeUser: jest.fn(() => null),
}));

jest.mock('@atomicfi/transact-react-native', () => ({
  Atomic: {
    transact({ onInteraction, ...rest }) {
      onInteraction({ name: mockAtomicTypes.COMPLETE_PAYCHECK });
    },
  },
  Product: {
    DEPOSIT: 'deposit',
  },
  Environment: {
    Sandbox: 'sandbox',
  },
}));
