import { ThemeProvider } from '@react-navigation/native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import React, { useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { theme } from '../theme'
import { host, post } from '../utils'
import { launchImageLibrary } from 'react-native-image-picker'
import { TouchableOpacity } from 'react-native-gesture-handler';

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

    function pickImage() {
        launchImageLibrary({ mediaType: 'photo', includeBase64: true }, (d) => {
            post(route, { data: d.base64, uploader: global.username }, (d) => { console.log(d) })
        })
    }


    return (
        <View style={styles.container}>
            <Text style={styles.Title}>Competition Name</Text>
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={(v) => { setName(v) }}></TextInput>
            </View>
            <Text style={styles.Title}>Description</Text>
            <View >
                <TextInput style={styles.input} onChangeText={(v) => { setDescription(v) }}></TextInput>
            </View>
            {/* <Button onPress={pickImage} title={"Pick Image"}></Button>
            <Button onPress={postCompetition} title={"Post Competition"}></Button> */}
            <View style={styles.buttonsty}>
                <View style={styles.editpButton}>
                    <TouchableOpacity onPress={pickImage}>
                        <Text>Pick Image</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.editpButton}>
                    <TouchableOpacity onPress={postCompetition}>
                        <Text>Post Competition</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        //paddingTop: 10,
        paddingBottom: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#f7def7',
        flex: 1,
    },
    Title: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
        textAlign: "center",
    },
    input: {
        // borderColor: Colors.black,
        // borderWidth: 1,
        width: "80%",
        alignSelf: 'center',
        borderRadius: 18,
        color: 'black',
        backgroundColor: 'white'

    },
    editpButton: {
        alignItems: "center",
        borderColor: Colors.black,
        borderWidth: 1,
        width: "40%",
        alignSelf: 'center',
        borderRadius: 18,
        backgroundColor: '#f0a6f0'
    },
    buttonsty: {
        top: 10,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
})
