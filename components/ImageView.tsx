import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet } from 'react-native';

import CommentSection from './CommentSection';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/** Displays a single image post in a large format */
export default function ImageView({ route }) {
    const image = route.params;
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Image source={{ uri: image.uri }} style={styles.image} />
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
