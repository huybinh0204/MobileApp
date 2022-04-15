import { SplitContext, useClient } from '@splitsoftware/splitio-react';
import { useContext, useMemo } from 'react';
import { getVersion } from 'react-native-device-info';

export function useTreatment(flag, key = null) {
  const { isReady } = useContext(SplitContext);
  const client = useClient(key);

  const appVersion = useMemo(() => getVersion(), []);
  const treatment = client.getTreatment(flag, { appVersion });

  return isReady ? treatment : null;
}
