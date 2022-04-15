import { useContext, useEffect } from 'react';
import { Linking } from 'react-native';
import { checkDeepLinkTarget } from '_services/NavigationService';
import { isUrlScheme } from '_utilities/DeepLinking';
import { DeepLinkContext } from '_utilities/DeepLinkProvider';

export const useDeepLinkHandler = () => {
  const { saveDeepLink } = useContext(DeepLinkContext);

  useEffect(() => {
    const handleDeepLink = (deepLink) => {
      if (deepLink && isUrlScheme(deepLink)) {
        const deferredDeepLink = checkDeepLinkTarget(deepLink);
        if (deferredDeepLink) {
          saveDeepLink(deferredDeepLink);
        }
      }
    };

    Linking.getInitialURL().then((initialUrl) => {
      handleDeepLink(initialUrl);
    });

    const urlListener = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url);
    });

    return () => {
      urlListener.remove();
    };
  }, [saveDeepLink]);
};
