import React, { useState, useEffect } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, Button, RefreshControl, TouchableOpacity } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import {host} from "../utils"
import ImageGrid from "./ImageGrid"
import MenuBar from "./MenuBar"

const route = `${host}/api/feed`
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function Feed({ navigation }) {

    return (
        <View style={styles.container} >
            <MenuBar navigation={navigation} />
            <ImageGrid navigation={navigation} route={route} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
})