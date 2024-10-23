import React from "react";
import { Text } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DashboardStackNavigator from "./DashboardStackNavigator";

const Tab = createBottomTabNavigator();

const AnalyticsScreen = () => <Text>Analytics screen</Text>;

const RootNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={DashboardStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
    </Tab.Navigator>
  );
};

export default RootNavigator;
