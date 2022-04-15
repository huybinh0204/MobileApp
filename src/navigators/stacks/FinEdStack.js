import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import FinEdWelcomePage from '_components/pages/FinEdWelcomePage/FinEdWelcomePage';
import { NAVIGATION } from '_constants';
import { FinEdTabScreen } from '_navigators/screens';

const { Screen, Navigator } = createStackNavigator();

const FinEdStack = () => (
  <Navigator initialRouteName={NAVIGATION.finEd.welcome} screenOptions={{ headerShown: false }}>
    <Screen name={NAVIGATION.finEd.main} component={FinEdTabScreen} />
    <Screen name={NAVIGATION.finEd.welcome} component={FinEdWelcomePage} />
  </Navigator>
);

export default FinEdStack;
