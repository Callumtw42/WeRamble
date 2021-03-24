import React, { useState, useEffect } from 'react'
import { Dimensions, View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { host } from "../utils"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Like({ image }) {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const likeOn = <Image style={styles.icon} source={require("../assets/like-on.png")} ></Image>
    const likeOff = <Image style={styles.icon} source={require("../assets/like-off.png")} ></Image>
    const likeRoute = `${host}/api/like`
    const getLikesRoute = `${host}/api/getlikes/${image.id}/${global.username}`
    let lk = false;

    useEffect(() => {
        getLikes();
    }, [])

    async function postLike() {
        console.log(liked)
        const config = {
            method: 'POST',
            headers: {
                "Content-Type": "application/JSON"
            },
            body: JSON.stringify({ imageid: image.id, user: global.username, like: !liked })
        }
        await fetch(likeRoute, config)
            .then(res => res.json())
            .then(d => getLikes())
            .catch(error => {
                console.error(error);
            });
    }

    async function getLikes() {
        await fetch(getLikesRoute)
            .then(res => res.json())
            .then((d) => {
                const data = d[0];
                console.log(data.likes);
                setLikes(data.likes);
                setLiked(data.liked >0 ? true : false);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function toggleLike() {
        lk = !lk;
        postLike();
    }

    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={toggleLike}>
                {liked ? likeOn : likeOff}
            </TouchableOpacity>
            <Text>{likes}</Text>
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