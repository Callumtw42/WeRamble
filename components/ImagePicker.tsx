import React, { Component, useState } from 'react'
import { Button, Image, Text, View } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker';
import { theme } from '../theme';

/** callback contains image with base64 field*/
export default function ImagePicker({ callback }) {
    const [uri, setUri] = useState("");

    function pickImage() {
        launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true
        },
            (d) => {
                setUri(d.uri || "")
                callback(d)
            })
    }

    function ImageHolder() {
        return (uri.length > 0)
            ? <Image source={{ uri: uri }} style={theme.image}></Image>
            : <Text>Image Here</Text>
    }
    return (
        <View style={theme.borderbox}>
            <ImageHolder />
            <Button onPress={pickImage} title={"Pick Image"}></Button>
        </View>
    )
}
