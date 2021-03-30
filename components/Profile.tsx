import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, Button, Alert } from 'react-native';
import ImageGrid from './ImageGrid';
import Posts from './Posts';
import { get, host, post } from "../utils"
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ImagePicker from './ImagePicker';
import Follow from './Follow';

const number = 0
const randomNumber2 = Math.random() * number
const randomNumber3 = Math.random() * number
const styles = require('../components/StyleSheet');

export default function Profile({ route, navigation }) {
    const username = route.params.username;
    const imagesRoute = `${host}/api/user-images/${username}`;
    const [posts, setPosts] = useState(0);
    const [profilePicture, setProfilePicture] = useState("https://weramble.blob.core.windows.net/images/empty-user.png");
    const getProfilePicRoute = `${host}/api/get-profile-pic/${username}`;

    function uploadProfilePic(img) {
        const postProfilePicRoute = `${host}/api/post-profile-pic`;
        post(postProfilePicRoute, { username: username, image: img }, () => { })
    }

    useEffect(() => {
        get(getProfilePicRoute, (d) => {
            setProfilePicture(d[0].profilepic)
        })
    }, [])

    return (
        <SafeAreaView style={styles.background}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%", height: "100%" }}>
                <View style={styles.topbar}>
                    <Text style={styles.usernames}>{username} </Text>
                    <Image style={styles.camera} source={require("../assets/camera.png")} />
                </View>
                <View style={styles.barline} />
                <View style={styles.informbar}>
                    <TouchableOpacity style={{ height: 150, width: 100 }} onPress={
                        () => {
                            if (username == global.username)
                                navigation.navigate("ImagePicker", { callback: uploadProfilePic })
                        }}>
                        <Image style={styles.userheadimage}
                            source={{ uri: profilePicture }} />
                    </TouchableOpacity>
                    <Follow user={username} />
                    <View style={styles.container}>
                        <Text>{posts}</Text>
                        <Text style={{ fontWeight: 'bold' }}>Posts</Text>
                    </View>
                    <View style={styles.profileContainer}>
                        <Text>{randomNumber2}</Text>
                        <Text style={{ fontWeight: 'bold' }}>Followers</Text>
                    </View>
                    <View style={styles.profileContainer}>
                        <Text>{randomNumber3}</Text>
                        <Text style={{ fontWeight: 'bold' }}>Following</Text>
                    </View>

                </View>
                <Text>Posts</Text>
                <View style={styles.userpost}>
                    <ImageGrid navigation={navigation} route={imagesRoute} callback={(i) => { setPosts(i) }}></ImageGrid>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

/*const styles = StyleSheet.create({
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
    profileEditPButton: {
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
        // backgroundColor: '#f76260',
        borderRadius: 500,
        top: 20,
        left: 20,
        resizeMode: 'contain'
    },
    username: {
        //top:1,
        left: 30,
        bottom: 40,
        fontSize: 18,
    },
    profileContainer: {
        width: "20%",
        height: "100%",
        margin: 10,
        alignItems: "center",
        justifyContent: "center",

    }
})*/

