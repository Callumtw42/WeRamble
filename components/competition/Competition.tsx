import React, { useState, useEffect } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, Button, RefreshControl, TouchableOpacity } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { get, host, post } from "../../utils"
import ImageGrid from "../ImageGrid"
import ImagePicker from '../ImagePicker';
import MenuBar from "../MenuBar"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function Competition({ route, navigation }) {
    console.log(route.params);
    const { name, image } = route.params;
    const getEntriesRoute = `${host}/api/get-competition-entries/${name}`


    return (
        <View style={styles.container} >
            <Button onPress={() => navigation.navigate("Submit", { name: name })} title={"Submit An Entry"} />
            <ImageGrid navigation={navigation} route={getEntriesRoute} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
})