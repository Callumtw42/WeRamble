/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View, Text, Dimensions
} from 'react-native';

import Login from "./components/Login"
// import Registration from "./components/Register"
import Camera from "./components/Camera"
import Feed from "./components/Feed"
import ImagePreview from "./components/ImagePreview"
import Profile from "./components/Profile"
import ImageView from "./components/ImageView"
import Competition from './components/Competition';

const App: () => React$Node = () => {
  const Stack = createStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {/*Add screens below*/}
          <Stack.Screen name="Login" component={Login} />
          {/* <Stack.Screen name="Register" component={Registration} /> */}
          <Stack.Screen name="Feed" component={Feed} />
          <Stack.Screen name="Camera" component={Camera} />
          <Stack.Screen name="ImagePreview" component={ImagePreview} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="ImageView" component={ImageView} />
          <Stack.Screen name="Competition" component={Competition}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};


export default App;
