import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { NAVIGATION } from '_constants';
import { HomeTabScreen } from '_navigators/screens';

const { Screen, Navigator } = createStackNavigator();

const HomeStack = () => (
  <Navigator initialRouteName={NAVIGATION.home.main} screenOptions={{ headerShown: false }}>
    <Screen name={NAVIGATION.home.main} component={HomeTabScreen} />
  </Navigator>
);

export default HomeStack;
