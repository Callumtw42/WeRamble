import  { Component } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';

import Login from "./Login"
import Registration from "./Registration"
import ImagePreview from "./ImagePreview"
import ImageView from "./ImageView"
import Competition from './Competition';
import Camera from "./Camera"
import Feed from "./Feed"
import LiProfile from "./LiProfile" 
import NavLogin from "./NavLogin" 
import NavTab from "./NavTab" 

const Stack = createStackNavigator();

const Main = ({ navigation }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name="NavLogin" component={NavLogin} />
        <Stack.Screen name="NavTab" component={NavTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Main;

