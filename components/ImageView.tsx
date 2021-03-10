import React from 'react'
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ImageView({ route }) {
    const uri = route.params;
    console.log(uri);
    return (
        <View style={styles.container}>
            <Image source={{ uri: uri }} style={styles.image} />
        </View>
    )
}


const styles = StyleSheet.create({
    image: {
        width: windowWidth,
        height: windowHeight * (2 / 3),
    },
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
})
