import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, ContactStackNavigator, LoginStackNavigator } from "./StackNavigator";
import ScanScreen from "../screens/ScanScreen";
import About from "../screens/About";
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Scan" component={ScanScreen}  />
      <Tab.Screen name="About" component={About}  />

    </Tab.Navigator>
  );
};

export default {BottomTabNavigator};