import React, { useState, useEffect } from 'react'
import { ip, port } from "../utils"
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  Alert,
  Image
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import bcrypt from "bcryptjs";
import {User} from "components/src/entity/User";



export default function Login({ navigation }) {
  const [username, setUsername] = useState("demo");
  const [password, setPassword] = useState("demo");
  const [error, setError] = useState("");
  const route = `http://${ip}:${port}/api/login`

  function checkResponse(data) {
    if (data) {
      global.username = username;
      navigation.navigate("Feed");
    }
    else { setError("Invalid Details") }
  }

  function login() {
    if (username.length > 0 && password.length > 0) {
      fetch(`${route}/${username}/${password}`)
        .then(res => res.json())
        .then(data => {
          checkResponse(data)
        })
        .catch(error => {
          console.error(error)
        })

        const user = User.findOne({ where: { username }});
        const valid = bcrypt.compare(password, user.password);
        
        if(!valid) {

          return null;
        }
    
        if(!user.confirmed) {
    
          return null;
        }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle} >Username</Text>
      <TextInput
        style={styles.input}
        value={"demo"}
        onChangeText={(v) => setUsername(v)} />
      <Text style={styles.sectionTitle} > Password</Text>
      <TextInput
        style={styles.input}
        value={"demo"}
        onChangeText={(v) => setPassword(v)} />
      <Text style={styles.smallText}
        onPress={() => navigation.navigate('Register')}
      >New User? Register here</Text>
      <Button
        title="Login"
        onPress={() => login()}
      />
      <Text
        style={styles.sectionTitle}
      > {error}</Text>
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
  tinylogo: {
    width: 250,
    height: 200,
  },
  smallText: {
    textAlign: "center",
  },
  input: {
    borderColor: Colors.black,
    borderWidth: 1,
    width: "80%",
    alignSelf: 'center'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }
});
