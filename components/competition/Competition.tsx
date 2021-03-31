import React, { useState, useEffect } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, Button, RefreshControl } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { get, host, post } from "../../utils"
import ImageGrid from "../ImageGrid"
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from '../ImagePicker';
import MenuBar from "../MenuBar"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function PickWinner({ callback, hostUser, pickingWinner }) {
    const style = pickingWinner ? styles.pickingWinner : styles.editpButton;
    return (
        (hostUser === global.username)
            ? <View style={style}>
                <TouchableOpacity onPress={() => {
                    callback(!pickingWinner)
                }}>
                    <Text style={{ fontSize: 20 }} >Pick Winner</Text>
                </TouchableOpacity>
            </View>
            : <></>
    )
}

function NormalGrid({ navigation, image, apiRoute }) {
    return (
        <ImageGrid navigation={navigation} onPress={(img) => {
            navigation.navigate("ImageView", img);
        }} route={apiRoute} />
    )
}

function WinnerGrid({ callback, navigation, apiRoute }) {
    return (
        <ImageGrid navigation={navigation} onPress={(img) => {
            callback(img)
        }} route={apiRoute} />
    )
}

export default function Competition({ route, navigation }) {
    console.log(route.params.competition)
    const { name, image, hostUser, description, winner, winninguser } = route.params.competition;
    const getEntriesRoute = `${host}/api/get-competition-entries/${name}`;
    const postEntryRoute = `${host}/api/post-competition-entry`;
    const imageUploadRoute = `${host}/api/upload`;
    const [flag, setFlag] = useState(false);

    function submit(image) {
        if (typeof image === 'string') {
            post(imageUploadRoute, { data: { base64: image }, uploader: global.username }, (d) => {
                const uri = d[0].uri;
                console.log(uri)
                if (typeof uri === 'string')
                    post(postEntryRoute, { name: name, image: uri, uploader: global.username }, () => {
                        navigation.goBack();
                    })
                else (console.error("image not a valid uri. Got: " + uri))
            })
        }
        else (console.error("image not a valid uri. Got: " + image))
    }


    function pickWinner(comp) {
        console.log(comp);
        console.log("Winner Picked")
        post(`${host}/api/post-winner`, { id: comp.id }, (d) => {
            const { uploader, uri } = d[0];
            console.log(uploader)
            console.log(uri)
            navigation.goBack()
        })
    }

    function Grid({ flag }) {
        return (flag)
            ? <WinnerGrid callback={pickWinner} navigation={navigation} apiRoute={getEntriesRoute} />
            : <NormalGrid apiRoute={getEntriesRoute} image={image} navigation={navigation} />
    }
    function Status() {
        return (
            (winner === null)
                ? <>
                    <PickWinner callback={(b) => {
                        setFlag(!flag)
                    }} hostUser={hostUser} pickingWinner={flag} />
                    <View style={styles.editpButton}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("ImagePicker",
                                { callback: (base64) => { submit(base64) } })
                        }}>
                            <Text style={{ fontSize: 20 }} >Submit An Entry</Text>
                        </TouchableOpacity>
                    </View>
                </>
                : <View style={styles.winner}>
                    <Text style={styles.text}>Winner</Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("ImageView", { uri: winner, uploader: winninguser } )
                    }}>
                        <Image style={{ height: 75, width: 75 }} source={{ uri: winner }} />
                    </TouchableOpacity>
                </View >
        )
    }

    return (
        <View style={styles.container} >
            <Text style={styles.text}>{"by: " + hostUser}</Text>
            <Text style={styles.text}>{description}</Text>
            <Status />
            <Grid flag={flag} />
        </View>
    )
}

const styles = StyleSheet.create({
    winner: {
        alignSelf: "center"
    },
    text: {
        fontSize: 20
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "#a8e6ff",
        flex: 1,
    },
    editpButton: {
        margin: 10,
        alignItems: "center",
        borderColor: Colors.black,
        borderWidth: 1,
        width: "70%",
        height: 35,
        alignSelf: 'center',
        borderRadius: 18,
        backgroundColor: '#64c1d1'
    },
    pickingWinner: {
        margin: 10,
        alignItems: "center",
        borderColor: Colors.black,
        borderWidth: 1,
        width: "70%",
        height: 35,
        alignSelf: 'center',
        borderRadius: 18,
        backgroundColor: '#daf542'
    },
})