import ENV from 'react-native-config';
import { getUniqueId } from 'react-native-device-info';

function trackEvent() {
  const sourceAppId = 'ahead_mobile_app';
  const deviceId = getUniqueId();

  return (api) => ({
    sendEvent(event, properties, eventType, userId) {
      const data = {
        sourceAppId,
        eventType,
        event,
        clientId: deviceId,
        userId,
        properties,
      };

      return api.post(ENV.EXPERIENCE_LAYER_URIS_EVENTS, data);
    },
  });
}

export default trackEvent();
