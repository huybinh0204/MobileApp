import { useCallback, useEffect } from 'react';
import { AppState } from 'react-native';

export function useAppState({ onChange, onForeground, onBackground }) {
  const handleAppStateChange = useCallback(
    (nextAppState) => {
      if (nextAppState === 'active' && onForeground) {
        onForeground(nextAppState);
      } else if (nextAppState.match(/inactive|background/) && onBackground) {
        onBackground();
      } else if (onChange) {
        onChange(nextAppState);
      }
    },
    [onBackground, onChange, onForeground]
  );

  useEffect(() => {
    const appStateListener = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      appStateListener.remove();
    };
  }, [handleAppStateChange]);
}
