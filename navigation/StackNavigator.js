import React from "react";
import { createStackNavigator } from "@react-navigation/stack";



import LoginScreen from "../screens/LoginScreen"
import {BottomTabNavigator} from "./TabNavigator";
import About from "../screens/About";


const Stack = createStackNavigator();

const screenOptionStyle = {
  headerShown: false
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName={"Login"}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="About" component={BottomTabNavigator} />

    </Stack.Navigator>
  );
}


const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Login" component={LoginScreen}  options={{
   headerShown: false, 
}}/>
    </Stack.Navigator>
  );
}


export { MainStackNavigator,  LoginStackNavigator };