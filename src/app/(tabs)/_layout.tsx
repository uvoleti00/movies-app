import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import React, { ReactNode } from "react";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const Layout = (): ReactNode => {
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarActiveTintColor: "#334155",
        tabBarLabelStyle: { fontWeight: "500" },
        tabBarIndicatorStyle: { backgroundColor: "#334155", height: 4 },
      }}
    >
      <MaterialTopTabs.Screen name="index" options={{ title: "Movies" }} />
      <MaterialTopTabs.Screen
        name="searchtab"
        options={{ title: "Search Results" }}
      />
      <MaterialTopTabs.Screen name="showstab" options={{ title: "TV Shows" }} />
    </MaterialTopTabs>
  );
};

export default Layout;
