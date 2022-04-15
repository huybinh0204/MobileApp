// import { Dynatrace } from '@dynatrace/react-native-plugin';
// import { SplitFactory } from '@splitsoftware/splitio-react';
import React, { useEffect } from 'react';
import { Linking, Platform, UIManager, Text } from 'react-native';
import { hide } from 'react-native-bootsplash';
import ENV from 'react-native-config';
import { Provider } from 'react-redux';
// import ErrorBoundary from '_components/organisms/ErrorBoundary/ErrorBoundary';
// import { RootNavigator } from '_navigators';
import AppsFlyerService from '_services/AppsFlyerService';
import { BrazePayloadPath } from '_services/BrazeService';
// import splitSdkConfig from '_services/Split.io/sdkConfig';
import { store } from '_store';
// import { DeepLinkProvider } from '_utilities/DeepLinkProvider';
import Theme from '_utilities/Theme';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const App = () => {
  useEffect(() => {
    hide({ fade: true });
  }, []);

  useEffect(() => {
    AppsFlyerService.setPushNotificationDeepLinkPath([BrazePayloadPath]);

    const removeDeepLinkListener = AppsFlyerService.onDeepLink(({ data }) => {
      const screen = data?.deep_link_value;
      if (screen) {
        Linking.openURL(ENV.URL_SCHEME + screen);
      }
    });

    // AppsFlyerService.init().catch((e) => {
    //   Dynatrace.reportError(`AppsFlyer Init Error: ${JSON.stringify(e)}`, 0);
    // });

    return () => {
      removeDeepLinkListener();
    };
  }, []);

  return (
    <Provider store={store}>
      <Theme>
        <Text>222222444444</Text>
        {/*<ErrorBoundary>*/}
        {/*  <SplitFactory config={splitSdkConfig} updateOnSdkUpdate>*/}
        {/*    <DeepLinkProvider>*/}
        {/*      <RootNavigator />*/}
        {/*    </DeepLinkProvider>*/}
        {/*  </SplitFactory>*/}
        {/*</ErrorBoundary>*/}
      </Theme>
    </Provider>
  );
};

export default App;
