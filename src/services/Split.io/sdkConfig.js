import ENV from 'react-native-config';
import { getUniqueId } from 'react-native-device-info';

export default {
  core: {
    authorizationKey: ENV.SPLIT_IO_KEY,
    key: getUniqueId(),
  },
  debug: ENV.SPLIT_IO_DEBUG_MODE === 'enabled',
  startup: {
    readyTimeout: 5,
  },
};
