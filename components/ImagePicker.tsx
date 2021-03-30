import React, { Component, useState } from 'react'
import { Button, Image, Text, View, StyleSheet } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '../theme';

/** callback contains image with base64 field*/
export default function ImagePicker({ route, navigation }) {
    const [uri, setUri] = useState("");
    const [base64, setBase64] = useState("");
    const { callback } = route.params;

    function pickImage() {
        launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true
        },
            (d) => {
                setUri(d.uri || "")
                setBase64(d.base64 || "")
            })
    }

    function ImageHolder() {
        return (uri.length > 0)
            ? <Image source={{ uri: uri }} style={theme.image}></Image>
            : <Text style={{ fontSize: 24, alignSelf: "center", margin: 20 }}>Image Here</Text>
    }
    return (
        <View style={theme.borderbox}>
            <ImageHolder />
            <TouchableOpacity style={styles.editpButton} onPress={pickImage}>
                <Text style={{ fontSize: 20 }}>Pick Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editpButton} onPress={() => {
                callback(base64);
                navigation.goBack();
            }}>
                <Text style={{ fontSize: 20 }}>Submit</Text>
            </TouchableOpacity>
        </View >
    )
}
const styles = StyleSheet.create({
    container: {

    },
    editpButton: {
        alignItems: "center",
        borderColor: Colors.black,
        borderWidth: 1,
        width: "95%",
        height: 30,
        alignSelf: 'center',
        borderRadius: 18,
        backgroundColor: '#31a8bd',
        margin: 6
    },
})
