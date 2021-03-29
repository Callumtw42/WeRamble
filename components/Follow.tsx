import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { get, host, post } from '../utils';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/**the follow button */
export default function Follow({ image }) {

    const [followed, setFollowed] = useState(false);
    const [follows, setFollows] = useState(0);
    const followOn = <Image style={styles.icon} source={require("../assets/following.png")} ></Image>
    const followOff = <Image style={styles.icon} source={require("../assets/follow.png")} ></Image>
    const followRoute = `${host}/api/follow`
    const getFollowsRoute = `${host}/api/getfollows/${image.id}/${global.username}`


    useEffect(() => {

        getFollows();
    }, [])

    async function postFollow() {
        post(followRoute, {

            userFollowed: image.uploader,
            user: global.username,
            follow: !followed
        }, getFollows)
    }

    async function getFollows() {
        get(getFollowsRoute, (d) => {

            if(d.length > 0) {

                const data = d[0];
                setFollows(data.links);
                setFollowed(data.links > 0 ? true : false);
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
        width: windowWidth * (1 / 60),
        height: windowHeight * (1 / 22),
        margin: 2
    },
    button: {
        margin: 8
    },
})