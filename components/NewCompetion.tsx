import { ThemeProvider } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { theme } from '../theme'
import { host, post } from '../utils'
const dummyImage = 'https://weramble.blob.core.windows.net/images/bird.jpg'

export default function NewCompetion() {
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const route = `${host}/api/post-competition`

    function postCompetition() {
        if (name && description)
            post(route, { name: name, hostUser: global.username, image: dummyImage, description: description }, () => { })
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
            <Button onPress={postCompetition} title={"Post Competition"}></Button>
        </View>
    )
}
