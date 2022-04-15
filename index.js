/**
 * @format
 */

import { AppRegistry, LogBox } from "react-native";
import App from './src/App';
import {name as appName} from './app.json';
import 'react-native-get-random-values';
import 'react-native-gesture-handler';
console.disableYellowBox = true;
if (global.HermesInternal) {
  // Polyfills required to use Intl API with Hermes engine
  require('@formatjs/intl-getcanonicallocales/polyfill');
  require('@formatjs/intl-locale/polyfill');
  require('@formatjs/intl-pluralrules/polyfill');
  require('@formatjs/intl-pluralrules/locale-data/en');
  require('@formatjs/intl-numberformat/polyfill');
  require('@formatjs/intl-numberformat/locale-data/en');
  require('@formatjs/intl-datetimeformat/polyfill');
  require('@formatjs/intl-datetimeformat/locale-data/en');
  require('@formatjs/intl-datetimeformat/add-golden-tz');
}
LogBox.ignoreLogs(['Setting a timer', 'new NativeEventEmitter()', 'EventEmitter.removeListener']);

AppRegistry.registerComponent(appName, () => App);
