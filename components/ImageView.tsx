import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet } from 'react-native';

import CommentSection from './CommentSection';

const styles = require('../components/StyleSheet');

/** Displays a single image post in a large format */
export default function ImageView({ route }) {
    const image = route.params;
    return (
        <ScrollView style={styles.imageViewContainer}>
            <Image source={{ uri: image.uri }} style={styles.imageViewImage} />
            <CommentSection image={image} />
        </ScrollView >
    )
}


/*const styles = StyleSheet.create({
    imageViewImage: {
        width: windowWidth,
        height: windowHeight * (2 / 3),
    },
    imageViewContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#a8e6ff'
    },
    imageViewIcon: {
        width: windowWidth * (1 / 12),
        height: windowHeight * (1 / 16),
        margin: 2
    },
})*/
