import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import Login from "./Login"
import Registration from "./Registration"
import ImagePreview from "./ImagePreview"
import ImageView from "./ImageView"
import Competition from './Competition';
import Camera from "./Camera"
import Feed from "./Feed"
import LiProfile from "./LiProfile" 

const Stack = createStackNavigator();
export default function NavLogin(){
  return(
    <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="ImagePreview" component={ImagePreview} />
        <Stack.Screen name="ImageView" component={ImageView} />
        <Stack.Screen name="Competition" component={Competition} />
          <Stack.Screen name="Feed" component={Feed}/>      
    <Stack.Screen name="Camera" component={Camera}  />
    <Stack.Screen name="Profile" component={LiProfile} />
    </Stack.Navigator>
  )
}
    //  <Stack.Screen name="Feed" component={Feed}/>      
    //<Stack.Screen name="Camera" component={Camera}  />
    //<Stack.Screen name="Profile" component={LiProfile} />