import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { NAVIGATION } from '_constants';
import { CardTabScreen } from '_navigators/screens';

const { Screen, Navigator } = createStackNavigator();

const CardStack = () => (
  <Navigator initialRouteName={NAVIGATION.card.main} screenOptions={{ headerShown: false }}>
    <Screen name={NAVIGATION.card.main} component={CardTabScreen} />
  </Navigator>
);

export default CardStack;
