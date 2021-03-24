import React from 'react';
import { StyleSheet, View } from 'react-native';

import { host } from '../utils';
import ImageGrid from './ImageGrid';
import MenuBar from './MenuBar';

/** Retrieves users uploads and displays them in a user feed*/
export default function Profile({ navigation }) {
    const username = global.username;
    const route = `${host}/api/user-images/${username}`;
    return (
        <View style={styles.container}>
            <MenuBar navigation={navigation} />
            <ImageGrid navigation={navigation} route={route} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
})