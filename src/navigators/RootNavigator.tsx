import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DashboardStackNavigator from "./DashboardStackNavigator";
import SettingsStackNavigator from "./SettingsStackNavigator";

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Dashboard Stack" component={DashboardStackNavigator} />
      <Tab.Screen name="Settings Stack" component={SettingsStackNavigator} />
    </Tab.Navigator>
  );
};

export default RootNavigator;
