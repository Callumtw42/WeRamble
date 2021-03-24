import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { host, post } from '../utils';

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
    }

    return (
        <View>
            <Text>E-Mail</Text>
            <TextInput
                onChangeText={(v) => setEmail(v)} />
            <Text>Username</Text>
            <TextInput
                onChangeText={(v) => setUsername(v)} />
            <Text>Pasword</Text>
            <TextInput
                onChangeText={(v) => setPassword(v)} />
            <Button
                title="Register"
                onPress={() => register()}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
});
