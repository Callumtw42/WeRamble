import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MenuBar from './MenuBar'
import ImageGrid from './ImageGrid'
import { port, ip } from '../utils'

export default function Profile({ navigation }) {
    const username = global.username;
    const route = `http://${ip}:${port}/api/user-images/${username}`;
    return (
        <View style={styles.container}>
            <MenuBar navigation={navigation} />
            <ImageGrid route={route} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
})