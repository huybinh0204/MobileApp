import { Platform } from 'react-native';

export default {
  ACH_IN: 'ach_in',
  APP_KILL_SWITCH: 'app_kill_switch',
  CHANGE_EMAIL: 'change_email',
  CHANGE_PHONE: 'change_phone',
  CHANGE_PIN: 'change_pin',
  FAQ: 'faq',
  MINIMUM_APP_VERSION: Platform.select({
    android: 'android_minimum_app_version',
    ios: 'ios_minimum_app_version',
  }),
  EMAIL_VERIFICATION: 'email_verification',
  SHOW_ALL_MONTHS_STATEMENT: 'show_all_months_statement',
  UNIVERSAL_LOGIN: 'universal_login',
};
