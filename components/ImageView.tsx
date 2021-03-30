import React from 'react';
import { Text, Dimensions, Image, ScrollView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import CommentSection from './CommentSection';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/** Displays a single image post in a large format */
export default function ImageView({ navigation, route }) {
    const image = route.params;
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <TouchableOpacity onPress={() => navigation.navigate("Profile", { username: image.uploader })}>
                <Text>{"by: " + image.uploader}</Text>
            </TouchableOpacity>
            < Image source={{ uri: image.uri }} style={styles.image} />
            <CommentSection image={image} />
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
