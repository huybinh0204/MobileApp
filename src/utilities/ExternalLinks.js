import { Dynatrace } from '@dynatrace/react-native-plugin';
import { Linking } from 'react-native';

export async function openExternalLink(url) {
  try {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    }
  } catch {
    Dynatrace.reportError(`Invalid URL Error: Can't open ${url}`, 0);
  }
}
