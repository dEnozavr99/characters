import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SettingsScreen } from "../screens";

const Stack = createNativeStackNavigator();

const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;
