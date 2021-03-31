import { ThemeProvider } from '@react-navigation/native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { theme } from '../../theme'
import { host, post } from '../../utils'
import { launchImageLibrary } from 'react-native-image-picker'
import ImagePicker from '../ImagePicker'
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function NewCompetition({ navigation }) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [base64, setBase64] = useState("")
    const [buyin, setBuyin] = useState(0);
    const postCompetitionRoute = `${host}/api/post-competition`
    const imageUploadRoute = `${host}/api/upload`

    function allFieldsFilled() {
        if (name.length > 0
            && description.length > 0
            && base64.length > 0
            && buyin > 0)
            return true
        console.log("Fields not filled")
        return false
    }

    function postCompetition(uri) {
        if (allFieldsFilled())
            post(postCompetitionRoute, {
                name: name,
                hostUser: global.username,
                image: uri,
                description: description,
                buyin: buyin
            }, (d) => {
                console.log(d)
                navigation.goBack();
            })
    }

    function createCompetition() {
        post(imageUploadRoute, { data: { base64: base64 }, uploader: global.username }, (d) => {
            const uri = d[0].uri;
            if (typeof uri === 'string')
                postCompetition(uri)
            else (console.error("Competition image not a valid uri. Got: " + uri))
        })
    }


    return (
        <ScrollView contentContainerStyle={{ backgroundColor: '#a8e6ff' }}>
            <Text style={styles.Title}>Competition Name</Text>
            <View >
                <TextInput
                    style={styles.input}
                    onChangeText={(v) => { setName(v) }}></TextInput>
            </View>
            <Text style={styles.Title}>Description</Text>
            <View >
                <TextInput style={styles.input} onChangeText={(v) => { setDescription(v) }}></TextInput>
            </View>
            <View style={styles.buyinContainer}>
                <Text style={styles.Title}>Buy In</Text>
                <View style={{ flexDirection: "row" }} >
                    <TouchableOpacity style={styles.increment} onPress={() => setBuyin(buyin + 1)}>
                        <Text style={styles.Title}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.Title}>{buyin}</Text>
                    <TouchableOpacity style={styles.increment} onPress={() => {
                        if (buyin > 0)
                            setBuyin(buyin - 1)
                    }}><Text style={styles.Title}>-</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* <ImagePicker callback={(img) => { setBase64(img.base64) }} /> */}
            <View >
                <TouchableOpacity style={styles.editpButton} onPress={() => { navigation.navigate("ImagePicker", { callback: setBase64 }) }}>
                    <Text >Upload Image</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.editpButton} onPress={createCompetition}>
                    <Text>Post Competition</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    buyinContainer: {
        // justifyContent: 'center',
        alignSelf: 'center',
    },
    increment: {
        alignItems: "center",
        borderColor: Colors.black,
        borderWidth: 1,
        width: 50,
        height: 30,
        alignSelf: 'center',
        borderRadius: 18,
        backgroundColor: '#31a8bd',
        margin: 10,
    },
    buttons: {
        width: 50
    },
    container: {
        backgroundColor: '#a8e6ff',
    },
    Title: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
        textAlign: "center",

    },
    input: {
        borderColor: Colors.black,
        borderWidth: 1,
        width: "80%",
        alignSelf: 'center',
        borderRadius: 18,
        color: 'black',
        backgroundColor: 'white',
        marginBottom: 20,
    },
    editpButton: {
        alignItems: "center",
        borderColor: Colors.black,
        borderWidth: 1,
        width: "40%",
        height: 30,
        alignSelf: 'center',
        borderRadius: 18,
        backgroundColor: '#31a8bd',
        margin: 10,
    },
    buttonsty: {
        top: 10,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
})
