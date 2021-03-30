import React, { useEffect, useState } from 'react';
import { Dimensions, Button, Image,StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { get, host } from '../utils';

//const windowWidth = Dimensions.get('window').width;
//const windowHeight = Dimensions.get('window').height;
const styles = require('../components/StyleSheet');

/** The entire login page */
export default function Login({ navigation }) {
  const [username, setUsername] = useState("demo");
  const [password, setPassword] = useState("demo");
  const [error, setError] = useState("");
  const route = `${host}/api/login/${username}/${password}`

  function login(data) {
    if (data) {
      global.username = username;
      console.log(username);
      navigation.navigate("Home");
    }
    else { setError("Invalid Details") }
  }

  function authenticate() {
    console.log(username)
    console.log(password)
    console.log(route)
    if (username.length > 0 && password.length > 0) {
      get(route, (d) => login(d))
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/WeRamble.png")}
      />
      <Text style={styles.sectionTitle} >Username</Text>
      <TextInput
        style={styles.input}
        defaultValue={"demo"}
        onChangeText={(v) => setUsername(v)} />
      <Text style={styles.sectionTitle} > Password</Text>
      <TextInput
        style={styles.input}
        defaultValue={"demo"}
        onChangeText={(v) => setPassword(v)} />
      <Text style={styles.smallText}
        onPress={() => navigation.navigate('Registration')}
      >New User? Register here</Text>
      {/* <Button 
        title="Login"
        onPress={() => authenticate()}
      /> */}
      <TouchableOpacity onPress={() => authenticate()}>
    <Image style={styles.Logins} source={require("../assets/login.png")} />
        </TouchableOpacity>
      <Text
        style={styles.sectionTitle}
      > {error}</Text>
    </View>
  )
}

/*const styles = StyleSheet.create({
  sectionTitle: {
    paddingTop: 20,
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    textAlign: "center",
  },
  smallText: {
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center"
  },
  input: {
    borderColor: Colors.black,
    borderWidth: 1,
    width: "80%",
    alignSelf: 'center',
    borderRadius:18,
    color: 'black',
    backgroundColor: 'white'
    
  },
  Logins:{
    borderRadius:18,
    width:"60%",
    height:35,
    alignSelf: 'center',
  },
  container: {
    paddingBottom: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#a8e6ff',
    height: windowHeight,
    width: windowWidth
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: 300,
    height: 200
  }
});*/
