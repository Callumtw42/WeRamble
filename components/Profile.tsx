import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MenuBar from './MenuBar'
import ImageGrid from './ImageGrid'
import {host} from '../utils'

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