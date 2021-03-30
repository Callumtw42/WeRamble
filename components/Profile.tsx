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
// const styles = require('../components/StyleSheet');

export default function Profile({ route, navigation }) {
    const username = route.params.username;
    const imagesRoute = `${host}/api/user-images/${username}`;
    const [posts, setPosts] = useState(0);
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [profilePicture, setProfilePicture] = useState("https://weramble.blob.core.windows.net/images/empty-user.png");
    const getProfilePicRoute = `${host}/api/get-profile-pic/${username}`;
    const getFollowersRoute = `${host}/api/get-followers/${username}`
    const getFollowingRoute = `${host}/api/get-following/${username}`

    function uploadProfilePic(img) {
        const postProfilePicRoute = `${host}/api/post-profile-pic`;
        post(postProfilePicRoute, { username: username, image: img }, () => { })
    }

    useEffect(() => {
        get(getProfilePicRoute, (d) => {
            console.log(d)
            setProfilePicture(d[0].profilepic)
            getFollows();
        })
    }, [])

    function getFollows() {
        get(getFollowersRoute, (d) => {
            console.log(d)
            setFollowers(d[0].followers);
            get(getFollowingRoute, (d) => {
                console.log(d)
                setFollowing(d[0].following)
            })
        })
    }

    return (
        <SafeAreaView style={styles.background}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%", height: "100%" }}>
                <Text style={styles.usernames}>{username} </Text>
                <View style={styles.informbar}>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity style={{ height: 75, width: 100 }} onPress={
                            () => {
                                if (username == global.username)
                                    navigation.navigate("ImagePicker", { callback: uploadProfilePic })
                            }}>
                            <Image style={styles.userheadimage}
                                source={{ uri: profilePicture }} />
                        </TouchableOpacity>
                        <Follow user={username} callback={getFollows} />
                    </View>
                    <View style={styles.profileContainer}>
                        <Text>{posts}</Text>
                        <Text style={{ fontWeight: 'bold' }}>Posts</Text>
                    </View>
                    <View style={styles.profileContainer}>
                        <Text>{followers}</Text>
                        <Text style={{ fontWeight: 'bold' }}>Followers</Text>
                    </View>
                    <View style={styles.profileContainer}>
                        <Text>{following}</Text>
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

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#a8e6ff"

    },
    iconContainer: {

        flexDirection: "column",
    },
    topbar: {
        flexDirection: "row",
        height: 65,
        justifyContent: 'space-between'
    },
    usernames: {
        textAlign: "left",
        justifyContent: "flex-start",
        // top: 10,
        left: 20,
        fontSize: 20,
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
        justifyContent: "space-between"
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
        // marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 75,
        height: 75,
        // backgroundColor: '#f76260',
        borderRadius: 500,
        // top: 20,
        left: 10,
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
        // height: "100%",
        margin: 5,
        alignItems: "center",
        justifyContent: "center",
        top: 20

    }
})

