import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DashboardScreen } from "../screens";

const Stack = createNativeStackNavigator();

const DashboardStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
};

export default DashboardStackNavigator;
