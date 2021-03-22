import React, { useState } from 'react'
import { Dimensions, View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Like() {
    const [like, setLike] = useState(false)
    const likeOn = <Image style={styles.icon} source={require("../assets/like-on.png")} ></Image>
    const likeOff = <Image style={styles.icon} source={require("../assets/like-off.png")} ></Image>
    function toggleLike() {
        setLike(!like)
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