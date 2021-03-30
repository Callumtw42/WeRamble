import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { get, host, post } from '../utils';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/**The follow button */
export default function Follow({ image }) {
    const [followed, setFollowed] = useState(false);
    const [follows, setFollows] = useState(0);
    const followOn = <Image style={styles.icon} source={require("../assets/following.png")} ></Image>
    const followOff = <Image style={styles.icon} source={require("../assets/follow.png")} ></Image>
    const likeRoute = `${host}/api/follow`
    const getLikesRoute = `${host}/api/getlikes/${image.id}/${global.username}`

    useEffect(() => {
        getFollows();
    }, [])

    async function postFollow() {
        post(likeRoute, {
            imageid: image.id,
            user: global.username,
            like: !followed
        }, getFollows)
    }

    async function getFollows() {
        get(getLikesRoute, (d) => {
            if (d.length > 0) {
                const data = d[0];
                setFollows(data.likes);
                setFollowed(data.liked > 0 ? true : false);
            }
        })
    }

    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={postFollow}>
                {followed ? followOn : followOff}
            </TouchableOpacity>
            <Text>{follows}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        width: windowWidth * (1 / 4),
        height: windowHeight * (1 / 22),
        margin: 2
    },
    button: {
        margin: 8
    },
})