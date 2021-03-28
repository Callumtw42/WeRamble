import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { host, post } from '../utils';

const apiRoute = `${host}/api/upload`

/**Displays the image captured immediately after taking a picture */
export default function ImagePreview({ route }) {
    const { photo } = route.params

    async function upload() {
        post(apiRoute, { data: photo, uploader: global.username }, () => { })
    }

    return (
        <View style={styles.container}>
            <Image style={styles.container} source={{ uri: photo.uri }} />
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={upload} style={styles.button}>
                    <Text style={{ fontSize: 14 }}> Upload </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'black',
        },
        button: {
            flex: 0,
            backgroundColor: '#fff',
            borderRadius: 5,
            padding: 15,
            paddingHorizontal: 20,
            alignSelf: 'center',
            margin: 20,
        },
    }
)
