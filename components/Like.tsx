import React, { useState } from 'react'
import { Dimensions, View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { host } from "../utils"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Like() {
    const [like, setLike] = useState(false);
    const [likes, setLikes] = useState(0);
    const likeOn = <Image style={styles.icon} source={require("../assets/like-on.png")} ></Image>
    const likeOff = <Image style={styles.icon} source={require("../assets/like-off.png")} ></Image>
    const route = `${host}/api/like/${like}`

    function toggleLike() {
        setLike(!like)
        fetch(route)
            .then(res => res.json())
            .then((data) => setLikes(data))
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={toggleLike}>
                {like ? likeOn : likeOff}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        width: windowWidth * (1 / 10),
        height: windowHeight * (1 / 22),
        margin: 2
    },
    button: {
        margin: 8
    },
})