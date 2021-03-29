import 'react-native-gesture-handler';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import Registration from './components/Registration'

import Camera from './components/Camera';
import Feed from './components/Feed';
import LiProfile from './components/LiProfile';
import Login from './components/Login';
import ImagePreview from './components/ImagePreview';
import Profile from './components/Profile';
import ImageView from './components/ImageView';
import Competitions from './components/Competitions';
import NewCompetition from './components/NewCompetion';

//profile


function Home() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator >
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Camera" component={Camera} />
      <Tab.Screen name="LiProfile" component={LiProfile} />
    </Tab.Navigator>
  )
}

const App: () => React$Node = () => {

  const Stack = createStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {/*Add screens below*/}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="ImagePreview" component={ImagePreview} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="ImageView" component={ImageView} />
          <Stack.Screen name="Competitions" component={Competitions} />
          <Stack.Screen name="NewCompetition" component={NewCompetition} />
          <Stack.Screen name="LiProfile" component={LiProfile} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* <NavigationContainer>
      </NavigationContainer> */}
    </>
  )
}
export default App;
