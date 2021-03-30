import React, { useState } from 'react'
import { View, Text, Button,StyleSheet } from 'react-native'
import { host, post } from '../../utils'
import ImagePicker from '../ImagePicker'

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
            <ImagePicker callback={setImage} />
            <Button onPress={() => submit(image)} title={"Submit"} />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:"#a8e6ff",
        flex:1,
    },
})