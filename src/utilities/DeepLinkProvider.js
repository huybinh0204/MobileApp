import React, { createContext, useCallback, useState } from 'react';

export const DeepLinkContext = createContext({
  deferredDeepLink: null,
  saveDeepLink: () => {},
  clearDeepLink: () => {},
});

export const DeepLinkProvider = ({ children }) => {
  const [deferredDeepLink, setDeferredDeepLink] = useState(null);

  const saveDeepLink = useCallback((deepLink) => {
    setDeferredDeepLink(deepLink);
  }, []);

  const clearDeepLink = useCallback(() => {
    setDeferredDeepLink(null);
  }, []);

  return (
    <DeepLinkContext.Provider value={{ deferredDeepLink, saveDeepLink, clearDeepLink }}>
      {children}
    </DeepLinkContext.Provider>
  );
};
