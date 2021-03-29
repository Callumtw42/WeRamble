import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  View, Text, Dimensions
} from 'react-native';

import Login from "./components/Login"
import Registration from "./components/Registration"
import Camera from "./components/Camera"
import Feed from "./components/Feed"
import ImagePreview from "./components/ImagePreview"
import Profile from "./components/Profile"
import ImageView from "./components/ImageView"
import Competitions from './components/Competitions';
import NewCompetition from './components/NewCompetion';
//profile
import LiProfile from './components/LiProfile';
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
const App: () => React$Node = () => {

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {/*Add screens below*/}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="Feed" component={Feed} />
          <Stack.Screen name="Camera" component={Camera} />
          <Stack.Screen name="ImagePreview" component={ImagePreview} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="ImageView" component={ImageView} />
          <Stack.Screen name="Competitions" component={Competitions} />
          <Stack.Screen name="NewCompetition" component={NewCompetition} />
          <Stack.Screen name="LiProfile" component={LiProfile} />
        </Stack.Navigator>
        </NavigationContainer>

        <NavigationContainer>
        <Tab.Navigator > 
          {/*Add screens below*/}
          <Tab.Screen name="Feed" component={Feed} />
          <Tab.Screen name="Camera" component={Camera} />
          <Tab.Screen name="LiProfile" component={LiProfile} />
        </Tab.Navigator>
      </NavigationContainer>
</>   
)
}
export default App;
