/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import Main from './components/Main';
import Test from './components/Test';

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

const App: () => React$Node = () => {
  const Stack = createStackNavigator();
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
    </>
  );
}
/*
 return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Login'>
      <Tab.Screen name="Feed" component={Feed} options={{
        tabBarIcon:({color})=>(
        <MaterialCommunityIcons name="home" 
        color = {color} 
        size={26}/> ) }}/>
      <Tab.Screen name="Camera" component={Camera} options={{
        tabBarIcon:({color})=>(
        <MaterialCommunityIcons name="camera" 
        color = {color} 
        size={26}/> ) }}  />
      <Tab.Screen name="Profile" component={LiProfile} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="ImagePreview" component={ImagePreview} />
      <Stack.Screen name="ImageView" component={ImageView} />
      <Stack.Screen name="Competition" component={Competition} />
    </Stack.Navigator>
    </NavigationContainer>
  );
  */
 /* return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Login'>
      <Tab.Screen name="Feed" component={Feed} options={{
        tabBarIcon:({color})=>(
        <MaterialCommunityIcons name="home" 
        color = {color} 
        size={26}/> ) }}/>
      <Tab.Screen name="Camera" component={Camera} options={{
        tabBarIcon:({color})=>(
        <MaterialCommunityIcons name="camera" 
        color = {color} 
        size={26}/> ) }}  />
      <Tab.Screen name="Profile" component={LiProfile} />
    </Stack.Navigator>
    </NavigationContainer>
  );*/

/*
  return(
    <NavigationContainer>
    <Tab.Navigator >
    <Tab.Screen name="Feed" component={Feed} />
    <Tab.Screen name="Camera" component={Camera} />
    <Tab.Screen name="ImagePreview" component={ImagePreview} />
    <Tab.Screen name="Profile" component={LiProfile} />
    <Tab.Screen name="ImageView" component={ImageView} />
    <Tab.Screen name="Competition" component={Competition} />
    </Tab.Navigator>
  </NavigationContainer>
);
*/