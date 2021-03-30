import React, { useEffect, useState } from 'react';
import { Dimensions, Button, StyleSheet,Image, Text, TextInput, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { host, post } from '../utils';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/** Entire registration page for adding new accounts*/
export default function Registration({ navigation }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const route = `${host}/api/register`

    function register() {
        post(route, {
            email: email,
            password: password,
            username: username
        }, () => { })


        navigation.navigate("Login");
    }

    return (
        <View>
            <Text style={styles.sectionTitle} >E-Mail</Text>
            <TextInput style={styles.input}
                onChangeText={(v) => setEmail(v)} />
            <Text style={styles.sectionTitle}>Username</Text>
            <TextInput style={styles.input}
                onChangeText={(v) => setUsername(v)} />
            <Text style={styles.sectionTitle}>Pasword</Text>
            <TextInput style={styles.input}
                onChangeText={(v) => setPassword(v)} />
            {/* <Button
                title="Register"
                onPress={() => register()}
            /> */}
            
        <TouchableOpacity  onPress={() => register()}>
            <Image style={styles.register} source={require("../assets/sign-up.jpg")} />
        </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    sectionTitle: {
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
        borderRadius:18,
        
      },
    register:{
        top:15,
        width:"60%",
        height:"40%",
        alignSelf: 'center',
        borderRadius:18,
    },
});
