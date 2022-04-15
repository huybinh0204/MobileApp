import { Dynatrace } from '@dynatrace/react-native-plugin';
import { useContext, useEffect } from 'react';
import { isPathReachable, navigationRef } from '_services/NavigationService';
import { DeepLinkContext } from '_utilities/DeepLinkProvider';

export function useDeferredDeepLink(config) {
  const { deferredDeepLink, clearDeepLink } = useContext(DeepLinkContext);

  useEffect(() => {
    if (!deferredDeepLink) {
      return;
    }

    if (isPathReachable(deferredDeepLink.path, config)) {
      navigationRef.current?.dispatch(deferredDeepLink.action);
      clearDeepLink();
    } else {
      Dynatrace.reportError(`Navigate to Deep Link Error: ${deferredDeepLink.path}`, 0);
    }

    return () => {
      clearDeepLink();
    };
  }, [deferredDeepLink, config, clearDeepLink]);
}
