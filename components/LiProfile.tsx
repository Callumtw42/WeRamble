import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, Button, Alert } from 'react-native';
import ImageGrid from './ImageGrid';
import Posts from './Posts';
import { host } from "../utils"
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';


const number = 0
const Signature = "hello word！！"
const randomNumber1 = Math.random() * number
const randomNumber2 = Math.random() * number
const randomNumber3 = Math.random() * number

export default function LiProfile({ navigation }) {
    const username = global.username;
    const route = `${host}/api/user-images/${username}`;
    return (

        <SafeAreaView style={styles.background}>
            <ScrollView showsVerticalScrollIndicator={false} style={{width:"100%", height:"100%"}}>
            <View style={styles.topbar}>
                <Text style={styles.usernames}>{username} </Text>
                <TouchableOpacity onPress={() => { navigation.navigate("Camera") }}>
                    <Image style={styles.camera} source={require("../assets/camera.png")} />
                </TouchableOpacity>
            </View>
            <View style={styles.barline} />
            <View style={styles.informbar}>
                <Image style={styles.userheadimage}
                    source={{ uri: "https://picsum.photos/200/200" }} />
                <View style={styles.container}>
                    <Text>{randomNumber1}</Text>
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

            <Text style={styles.username}>{username}</Text>
            <Text style={styles.username}>{Signature}</Text>
            <View style={styles.editpButton}>
                <Button
                    onPress={() => Alert.alert('coming soon')}
                    title="Edit Profile"
                    color="#a6a7a9" />
            </View>

            <View style={styles.barline} />
            <View style={styles.userpost1}>
                <Posts></Posts>
            </View>
            <View style={styles.userpost}>
                {/* <Image source={{
                    width: "31%",
                    height: "100%",
                    uri: "https://picsum.photos/200/100"
                }} />
                <Image source={{
                    width: "31%",
                    height: "100%",
                    uri: "https://picsum.photos/200/300"
                }} />
                <Image source={{
                    width: "31%",
                    height: "100%",
                    uri: "https://picsum.photos/500/500"
                }} /> */}
                <ImageGrid navigation={navigation} route={route} ></ImageGrid>
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

