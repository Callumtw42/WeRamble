import React, { useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { host, post } from '../../utils'
import ImagePicker from '../ImagePicker'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Submit({ route, navigation }) {
    const postEntryRoute = `${host}/api/post-competition-entry`
    const imageUploadRoute = `${host}/api/upload`
    const [image, setImage] = useState({ uri: "", base64: "" })
    const { name } = route.params;

    function submit(image) {
        if (typeof image.uri === 'string') {
            post(imageUploadRoute, { data: { base64: image.base64 }, uploader: global.username }, (d) => {
                const uri = d[0].uri;
                console.log(uri)
                if (typeof uri === 'string')
                    post(postEntryRoute, { name: name, image: uri, uploader: global.username }, () => {
                        navigation.goBack();
                    })
                else (console.error("image not a valid uri. Got: " + uri))
            })
        }
        else (console.error("image not a valid uri. Got: " + image.uri))
    }

    return (
        <View style={styles.container}>
            <View style={styles.editpButton}>
                <TouchableOpacity onPress={
                    navigation.navigate(
                        "ImagePicker",
                        { callback: () => { submit(image) } }
                    )
                }>
                    <Text>Post Competition</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#a8e6ff",
        flex: 1,
        justifyContent: "center",
    },
    editpButton: {
        alignItems: "center",
        borderColor: Colors.black,
        borderWidth: 1,
        width: "40%",
        alignSelf: 'center',
        borderRadius: 18,
        backgroundColor: '#31a8bd'
    },
})