import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Feed from './Feed';
import Camera from './Camera';
import LiProfile from './Profile';


export default function NavTab(){
  const Tab = createBottomTabNavigator();
  return (      
    <View>   
            <Tab.Navigator initialRouteName="Feed" >
                <Tab.Screen name ="Feed" component={Feed}/>
                {/* <Tab.Screen name="Feed" component={Feed}
                    options={{
                        tabBarLabel: 'home',
                        tabBarIcon: ({ color, size }) => (
                          <Icon name="home" color={color} size={size}/>
                        ),
                      }} /> */}

                {/* <Tab.Screen name="Camera" component={Camera}
                   options={{
                    tabBarLabel: 'camera',
                    tabBarIcon: ({ color, size }) => (
                      <Icon name="camera" color={color} size={size} />
                    ),
                  }}/>

                <Tab.Screen name="LiProfile" component={LiProfile} 
                        options={{
                            tabBarLabel: 'explore',
                            tabBarIcon: ({ color, size }) => (
                              <Icon name="globe" color={color} size={size} />
                            ),
                          }} /> */}
            </Tab.Navigator>
       </View>
              )
            }
            