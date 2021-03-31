import 'react-native-gesture-handler';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';



import Registration from './components/Registration'
import Camera from './components/Camera';
import Feed from './components/Feed';
import Login from './components/Login';
import ImagePreview from './components/ImagePreview';
import Profile from './components/Profile';
import ImageView from './components/ImageView';
import Competitions from './components/competition/Competitions';
import NewCompetition from './components/competition/NewCompetition';
import Competition from './components/competition/Competition';
import Submit from './components/competition/Submit';


import { Image, View } from 'react-native';
import ImagePicker from './components/ImagePicker';

//profile


function Home() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator >
      <Tab.Screen name="Feed" component={Feed}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ }) => (
            <Image source={require('./assets/home-variant-outline.png')} />
          ),
        }} />
      <Tab.Screen name="Camera" component={Camera}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ }) => (
            <Image source={require('./assets/camera-wireless-outline.png')} />
          ),
        }} />
      <Tab.Screen name="Competitons" component={Competitions}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ }) => (
            <Image source={require('./assets/trophy-outline.png')} />
          ),
        }} />
      <Tab.Screen name="Profile" component={Profile} initialParams={{ username: global.username }}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ }) => (
            <Image source={require('./assets/account-circle-outline.png')} />
          ),
        }} />

    </Tab.Navigator>
  )
}

const App: () => React$Node = () => {

  const Stack = createStackNavigator();
  return (
    <>
      <NavigationContainer >
        <Stack.Navigator initialRouteName="Login">
          {/*Add screens below*/}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="ImagePreview" component={ImagePreview} />
          <Stack.Screen name="ImageView" component={ImageView} />
          <Stack.Screen name="Competitions" component={Competitions} />
          <Stack.Screen name="NewCompetition" options={{}} component={NewCompetition} />
          <Stack.Screen name="Competition" component={Competition} />
          <Stack.Screen name="Submit" component={Submit} />
          <Stack.Screen name="ImagePicker" component={ImagePicker} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* <NavigationContainer>
      </NavigationContainer> */}
    </>
  )
}
export default App;
