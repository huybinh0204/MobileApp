import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { NAVIGATION } from '_constants';
import { AccountsTabScreen } from '_navigators/screens';

const { Screen, Navigator } = createStackNavigator();

const AccountsStack = () => (
  <Navigator initialRouteName={NAVIGATION.accounts.main} screenOptions={{ headerShown: false }}>
    <Screen name={NAVIGATION.accounts.main} component={AccountsTabScreen} />
  </Navigator>
);

export default AccountsStack;
