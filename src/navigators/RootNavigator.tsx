import React from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { ParamListBase, RouteProp } from "@react-navigation/native";

import DashboardStackNavigator from "./DashboardStackNavigator";
import SettingsStackNavigator from "./SettingsStackNavigator";

import { TabRoutes } from "./constants";

const Tab = createBottomTabNavigator();

const IconsByRouteName: {
  [key in TabRoutes]: string;
} = {
  [TabRoutes.DashboardTab]: "home",
  [TabRoutes.SettingsTab]: "settings",
};

type TabIconProps = {
  routeName: TabRoutes;
  focused: boolean;
  color: string;
  size: number;
};

const renderTabIcon = ({ routeName, focused, color, size }: TabIconProps) => {
  const iconName = `${IconsByRouteName[routeName]}${focused ? "" : "-outline"}`;
  return <Ionicons name={iconName} size={size} color={color} />;
};

const RootNavigator = () => {
  const screenOptionsSelector = ({
    route,
  }: {
    route: RouteProp<ParamListBase>;
    navigation: any;
  }): BottomTabNavigationOptions => ({
    headerShown: false,
    tabBarIcon: ({ focused, color, size }) =>
      renderTabIcon({
        routeName: route.name as TabRoutes,
        focused,
        color,
        size,
      }),
  });

  return (
    <Tab.Navigator screenOptions={screenOptionsSelector}>
      <Tab.Screen
        name={TabRoutes.DashboardTab}
        component={DashboardStackNavigator}
      />
      <Tab.Screen
        name={TabRoutes.SettingsTab}
        component={SettingsStackNavigator}
      />
    </Tab.Navigator>
  );
};

export default RootNavigator;
