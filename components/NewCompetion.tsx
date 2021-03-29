import { ThemeProvider } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { theme } from '../theme'
import { host, post } from '../utils'
import { launchImageLibrary } from 'react-native-image-picker'
const dummyImage = 'https://weramble.blob.core.windows.net/images/bird.jpg'

export default function NewCompetion() {
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const route = `${host}/api/post-competition`

    function allFieldsFilled() {
        if (name.length > 0
            && description.length > 0
            && image.length > 0)
            return true
        console.log("Fields not filled")
        return false
    }

    function postCompetition(image) {
        if (allFieldsFilled())
            post(route, {
                name: name,
                hostUser: global.username,
                image: image,
                description: description
            }, (d) => { console.log(d) })
    }

    function pickImage() {
        launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true
        },
            (d) => {
                setImage(d.base64)
            })
    }


    return (
        <View>
            <Text>Competition Name</Text>
            <View style={theme.borderbox}>
                <TextInput onChangeText={(v) => { setName(v) }}></TextInput>
            </View>
            <Text>Description</Text>
            <View style={theme.borderbox}>
                <TextInput onChangeText={(v) => { setDescription(v) }}></TextInput>
            </View>
            <Button onPress={pickImage} title={"Pick Image"}></Button>
            <Button onPress={postCompetition} title={"Post Competition"}></Button>
        </View>
    )
}
