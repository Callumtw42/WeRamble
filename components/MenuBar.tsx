import { Button, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React,{ Component } from 'react';
import Feed from './Feed';
import Camera from './Camera';
import { TableInheritance } from 'typeorm';

const Tab=createBottomTabNavigator();

/** Navigation buttons to different pages from the feed*/
export default function MenuBar ({ navigation }) {
    return (
        <View>
            <View style={styles.buttons}>
                <Button title="Feed" onPress={() => navigation.navigate("Feed")}></Button>
                <Button title="Camera" onPress={() => navigation.navigate("Camera")}></Button>
                <Button title="Profile" onPress={() => navigation.navigate("Profile")}></Button>
                <Button title="Competitions" onPress={() => navigation.navigate("Competitions")}></Button>
                <Button title="LiProfile" onPress={() => navigation.navigate("LiProfile")}></Button>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    galleryRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    gallery: {
        display: 'flex',
        flexDirection: 'column'
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row'
    },
    scrollView: {
    },

})