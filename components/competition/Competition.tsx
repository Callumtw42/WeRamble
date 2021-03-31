import React, { useState, useEffect } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, Button, RefreshControl } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { get, host, post } from "../../utils"
import ImageGrid from "../ImageGrid"
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from '../ImagePicker';
import MenuBar from "../MenuBar"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function Competition({ route, navigation }) {
    const { name, image, hostUser, description } = route.params;
    const getEntriesRoute = `${host}/api/get-competition-entries/${name}`;
    const postEntryRoute = `${host}/api/post-competition-entry`;
    const imageUploadRoute = `${host}/api/upload`;

    function submit(image) {
        if (typeof image === 'string') {
            post(imageUploadRoute, { data: { base64: image }, uploader: global.username }, (d) => {
                const uri = d[0].uri;
                console.log(uri)
                if (typeof uri === 'string')
                    post(postEntryRoute, { name: name, image: uri, uploader: global.username }, () => {
                        navigation.goBack();
                    })
                else (console.error("image not a valid uri. Got: " + uri))
            })
        }
        else (console.error("image not a valid uri. Got: " + image))
    }

    return (
        <View style={styles.container} >
            <Text>{"by: " + hostUser}</Text>
            <Text>{description}</Text>
            <View style={styles.editpButton}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("ImagePicker",
                        { callback: (base64) => { submit(base64) } })
                }}>
                    <Text style={{ fontSize: 20 }} >Submit An Entry</Text>
                </TouchableOpacity>
            </View>
            <ImageGrid navigation={navigation} route={getEntriesRoute} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "#a8e6ff",
        flex: 1,
    },
    editpButton: {
        margin: 10,
        alignItems: "center",
        borderColor: Colors.black,
        borderWidth: 1,
        width: "70%",
        height: 35,
        alignSelf: 'center',
        borderRadius: 18,
        backgroundColor: '#64c1d1'
    },
})