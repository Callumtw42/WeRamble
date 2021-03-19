import React from 'react'
import { Button, View, Text, StyleSheet } from 'react-native'

export default function MenuBar({ navigation }) {
    return (
        <View>
            <View style={styles.buttons}>
                <Button title="Feed" onPress={() => navigation.navigate("Feed")}></Button>
                <Button title="Camera" onPress={() => navigation.navigate("Camera")}></Button>
                <Button title="Profile" onPress={() => navigation.navigate("Profile")}></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    galleryRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    gallery: {
        display: 'flex',
        flexDirection: 'column'
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row'
    },
    scrollView: {
    },

})