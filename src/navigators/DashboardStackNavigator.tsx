import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MainScreen } from "../screens";

const Stack = createNativeStackNavigator();

const DashboardStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={MainScreen} />
    </Stack.Navigator>
  );
};

export default DashboardStackNavigator;
