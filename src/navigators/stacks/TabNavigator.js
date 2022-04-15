import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import { TabItem } from '_components/atoms';
import { ICONS, NAVIGATION } from '_constants';
import { useDeferredDeepLink } from '_hooks';
import AccountsStack from '_navigators/stacks/AccountsStack';
import CardStack from '_navigators/stacks/CardStack';
import FinEdStack from '_navigators/stacks/FinEdStack';
import HomeStack from '_navigators/stacks/HomeStack';
import { linking } from '_utilities/DeepLinking';

const { Screen, Navigator } = createBottomTabNavigator();

const TabNavigator = () => {
  useDeferredDeepLink(linking.config.screens.MainApp);

  return (
    <Navigator
      initialRouteName={NAVIGATION.home.stack}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' && hasNotch() ? 90 : 75,
        },
        tabBarButton: ({ accessibilityState, onPress }) => {
          let icon = ICONS.circledExclamation;
          let title = 'Unknown';

          switch (route.name) {
            case NAVIGATION.home.stack:
              icon = accessibilityState.selected ? ICONS.home : ICONS.homeInactive;
              title = 'Home';
              break;
            case NAVIGATION.accounts.stack:
              icon = accessibilityState.selected ? ICONS.accounts : ICONS.accountsInactive;
              title = 'Accounts';
              break;
            case NAVIGATION.card.stack:
              icon = accessibilityState.selected ? ICONS.card : ICONS.cardInactive;
              title = 'Card';
              break;
            case NAVIGATION.finEd.stack:
              icon = accessibilityState.selected ? ICONS.finEd : ICONS.finEdInactive;
              title = 'Learn';
              break;
          }

          return (
            <TabItem
              icon={icon}
              isActive={accessibilityState.selected}
              onPress={onPress}
              testID={`${title}Tab`}
              title={title}
            />
          );
        },
      })}
    >
      <Screen name={NAVIGATION.home.stack} component={HomeStack} />
      <Screen name={NAVIGATION.accounts.stack} component={AccountsStack} />
      <Screen name={NAVIGATION.card.stack} component={CardStack} />
      <Screen name={NAVIGATION.finEd.stack} component={FinEdStack} />
    </Navigator>
  );
};

export default TabNavigator;
