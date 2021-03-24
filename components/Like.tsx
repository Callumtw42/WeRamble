import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { get, host, post } from '../utils';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/**The like button */
export default function Like({ image }) {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const likeOn = <Image style={styles.icon} source={require("../assets/like-on.png")} ></Image>
    const likeOff = <Image style={styles.icon} source={require("../assets/like-off.png")} ></Image>
    const likeRoute = `${host}/api/like`
    const getLikesRoute = `${host}/api/getlikes/${image.id}/${global.username}`

    useEffect(() => {
        getLikes();
    }, [])

    async function postLike() {
        post(likeRoute, {
            imageid: image.id,
            user: global.username,
            like: !liked
        }, getLikes)
    }

    async function getLikes() {
        get(getLikesRoute, (d) => {
            if (d.length > 0) {
                const data = d[0];
                setLikes(data.likes);
                setLiked(data.liked > 0 ? true : false);
            }
        })
    }

    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={postLike}>
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