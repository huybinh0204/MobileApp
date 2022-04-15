import { Platform } from 'react-native';
import ENV from 'react-native-config';
import { openExternalLink } from '_utilities/ExternalLinks';
import Version from '_utilities/Version';

export default class UpdatesService {
  /**
   * @param {string} minimumVersionString
   * @param {string} currentVersionString
   * @returns {boolean}
   */
  static shouldForceUpdate(minimumVersionString, currentVersionString) {
    const minimumVersion = new Version(minimumVersionString);
    const currentVersion = new Version(currentVersionString);
    return minimumVersion.isGreaterThan(currentVersion);
  }

  /**
   * Opens the App page on corresponding store.
   */
  static async openStore() {
    const storeURL = Platform.select({ android: ENV.PLAY_STORE_URL, ios: ENV.APP_STORE_URL });
    await openExternalLink(storeURL);
  }
}
