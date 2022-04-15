import { Dynatrace } from '@dynatrace/react-native-plugin';
import appsFlyer from 'react-native-appsflyer';
import ENV from 'react-native-config';

export default class AppsFlyerService {
  static init() {
    const options = {
      appId: ENV.APP_STORE_APP_ID,
      devKey: ENV.APPSFLYER_KEY,
      isDebug: ENV.APPSFLYER_DEBUG_MODE === 'enabled',
      onDeepLinkListener: true,
      onInstallConversionDataListener: true,
    };

    return appsFlyer.initSdk(options);
  }

  static identify(user) {
    return appsFlyer.setCustomerUserId(user);
  }

  static reset() {
    return appsFlyer.stop(true);
  }

  static track(event, properties) {
    return appsFlyer.logEvent(event, properties);
  }

  static onDeepLink(callback) {
    return appsFlyer.onDeepLink(callback);
  }

  static setPushNotificationDeepLinkPath(path) {
    const successHandler = () => {};

    const errorHandler = (error) => {
      Dynatrace.reportError(`Error Setting DeepLink Path: ${JSON.stringify(error)}`, 0);
    };

    return appsFlyer.addPushNotificationDeepLinkPath(path, successHandler, errorHandler);
  }
}
