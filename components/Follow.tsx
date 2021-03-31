import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { get, host, post } from '../utils';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/**The follow button */
export default function Follow({ user, callback }) {
    const [followed, setFollowed] = useState(false);
    const followOn = <Image style={styles.icon} source={require("../assets/following.png")} ></Image>
    const followOff = <Image style={styles.icon} source={require("../assets/follow.png")} ></Image>
    const followRoute = `${host}/api/follow`
    const followedRoute = `${host}/api/followed/${global.username}/${user}`

    useEffect(() => {
        get(followedRoute, (d) => {
            console.log(d);
            if (d[0].followed > 0)
                setFollowed(true)
            else
                setFollowed(false)
            callback();
        })
    }, [])

    async function postFollow() {
        post(followRoute, {
            follower: global.username,
            following: user,
            followed: !followed
        }, (d) => {
            const res = d[0].followed;
            console.log(res);
            setFollowed(res);
            callback();
        })
    }

    return (
        <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={styles.button} onPress={postFollow}>
                {followed ? followOn : followOff}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        width: windowWidth * (1 / 4),
        height: windowHeight * (1 / 22),
        margin: 2,
        borderRadius: 15,
    },
    button: {
        margin: 8,

    },
})