import React, { useState, useEffect } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, Button, RefreshControl, TouchableOpacity } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { ip, port } from "../utils"
import ImageGrid from "./ImageGrid"
import MenuBar from "./MenuBar"

const route = `http://${ip}:${port}/api/feed`
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function Feed({ navigation }) {


    return (
        <View style={styles.container} >
            <MenuBar navigation={navigation} />
            <ImageGrid route={route} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
})