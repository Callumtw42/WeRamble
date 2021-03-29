import { ThemeProvider } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Image, Text, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { theme } from '../theme'
import { host, post } from '../utils'
import { launchImageLibrary } from 'react-native-image-picker'

export default function NewCompetion() {
    const [name, setName] = useState("")
    const [base64, setBase64] = useState("")
    const [uri, setUri] = useState("");
    const [description, setDescription] = useState("")
    const postCompetitionRoute = `${host}/api/post-competition`
    const imageUploadRoute = `${host}/api/upload`

    function allFieldsFilled() {
        if (name.length > 0
            && description.length > 0
            && base64.length > 0)
            return true
        console.log("Fields not filled")
        return false
    }

    function postCompetition() {
        if (allFieldsFilled())
            post(postCompetitionRoute, {
                name: name,
                hostUser: global.username,
                image: uri,
                description: description
            }, (d) => {
                console.log(d)
            })
    }

    function createCompetition() {
        post(imageUploadRoute, { data: { base64: base64 }, uploader: global.username }, (d) => {
            const uri = d[0].uri;
            if (typeof uri === 'string')
                postCompetition()
            else (console.error("Competition image not a valid uri. Got: " + uri))
        })
    }

    function pickImage() {
        launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true
        },
            (d) => {
                setUri(d.uri)
                setBase64(d.base64)
            })
    }

    function ImageHolder() {
        return (uri.length > 0)
            ? <Image source={{ uri: uri }} style={theme.image}></Image>
            : <Text>Image Here</Text>
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
            <View style={theme.borderbox}>
                <ImageHolder></ImageHolder>
            </View>
            <Button onPress={pickImage} title={"Pick Image"}></Button>
            <Button onPress={createCompetition} title={"Post Competition"}></Button>
        </View>
    )
}
