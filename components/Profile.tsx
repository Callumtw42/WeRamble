import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, Button, Alert } from 'react-native';
import ImageGrid from './ImageGrid';
import Posts from './Posts';
import { host } from "../utils"
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const number = 0
const randomNumber2 = Math.random() * number
const randomNumber3 = Math.random() * number

export default function Profile({ route, navigation }) {
    const username = route.params.username;
    const apiRoute = `${host}/api/user-images/${username}`;
    const [posts, setPosts] = useState(0);
    return (

        <SafeAreaView style={styles.background}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%", height: "100%" }}>
                <View style={styles.topbar}>
                    <Text style={styles.usernames}>{username} </Text>
                    <TouchableOpacity onPress={() => { navigation.navigate("Camera") }}>
                        <Image style={styles.camera} source={require("../assets/camera.png")} />
                    </TouchableOpacity>
                </View>
                <View style={styles.barline} />
                <View style={styles.informbar}>
                    <TouchableOpacity>
                        <Image style={styles.userheadimage}
                            source={{ uri: "https://picsum.photos/200/200" }} />
                    </TouchableOpacity>
                    <View style={styles.container}>
                        <Text>{posts}</Text>
                        <Text style={{ fontWeight: 'bold' }}>Posts</Text>
                    </View>
                    <View style={styles.container}>
                        <Text>{randomNumber2}</Text>
                        <Text style={{ fontWeight: 'bold' }}>Followers</Text>
                    </View>
                    <View style={styles.container}>
                        <Text>{randomNumber3}</Text>
                        <Text style={{ fontWeight: 'bold' }}>Following</Text>
                    </View>

                </View>
                <View style={styles.editpButton}>
                    <TouchableOpacity onPress={() => Alert.alert('coming soon')}>
                        <Text>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.barline} />
                <View style={styles.userpost1}>
                    <Posts></Posts>
                </View>
                <View style={styles.userpost}>
                    <ImageGrid navigation={navigation} route={apiRoute} callback={(i) => { setPosts(i) }}></ImageGrid>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "white",

    },
    topbar: {
        flexDirection: "row",
        height: 65,
        justifyContent: 'space-between'
    },
    usernames: {
        textAlign: "left",
        justifyContent: "flex-start",
        top: 10,
        left: 10,
        fontSize: 25,
    },

    camera: {
        margin: 10,
        height: 50,
        width: 50,
    },
    barline: {
        backgroundColor: '#bdbdbd',
        height: 1,
        width: "100%",
        top: 5,
    },
    informbar: {
        flexDirection: "row",
        height: 150,
    },
    editpButton: {
        alignItems: "center",
        borderColor: Colors.black,
        borderWidth: 1,
        width: "80%",
        alignSelf: 'center',
        borderRadius: 18,
    },

    userpost1: {
        top: 1,
        flexDirection: "row",
        height: 200,
    },
    userpost: {
        top: 1,
        justifyContent: 'space-evenly',
        flexDirection: "row",
        height: 500,
    },
    userheadimage: {
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        backgroundColor: '#f76260',
        borderRadius: 500,
        top: 20,
        left: 20,
    },
    username: {
        //top:1,
        left: 30,
        bottom: 40,
        fontSize: 18,
    },
    container: {
        width: "20%",
        height: "100%",
        margin: 10,
        alignItems: "center",
        justifyContent: "center",

    }
})

