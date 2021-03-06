import React from 'react'
import { View, Text, ScrollView, Image, Dimensions, StyleSheet, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import CommentsList from './CommentsList'
import CommentSection from './CommentSection'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ImageView({ route }) {
    const uri = route.params;
    console.log(uri);
    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: uri }} style={styles.image} />
            <CommentSection uri={uri} />
        </ScrollView >
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
    icon: {
        width: windowWidth * (1 / 12),
        height: windowHeight * (1 / 16),
        margin: 2
    },
})
