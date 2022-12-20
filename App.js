import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import ScanScreen from "./screens/ScanScreen";
import About from "./screens/About";
import LoginScreen from "./screens/LoginScreen";

import {Provider} from 'react-redux'
import { Store } from "./redux/store";


import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Menu from "./screens/Menu";
import Settings from "./screens/Settings";
import AddCard from "./screens/AddCard";
import CheckOut from "./screens/CheckOut";
import OrderStatus from "./screens/OrderStatus"

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Scan" component={ScanScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="About" component={About} options={{ headerShown: false }}/>
      <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}

function App() {

  
  return (
    <Provider store = {Store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Scan"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Menu" component={Menu} options={{ }} />
        <Stack.Screen name="AddCard" component={AddCard} options={{ headerShown: false }} />
        <Stack.Screen name="CheckOut" component={CheckOut}/>
        <Stack.Screen name="OrderStatus" component={OrderStatus}/>

      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
export default App