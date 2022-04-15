import Braze from 'react-native-appboy-sdk';

export const BrazePayloadPath = 'uri';

class BrazeService {
  static changeUser(userId) {
    return Braze.changeUser(userId);
  }
}

export default BrazeService;
