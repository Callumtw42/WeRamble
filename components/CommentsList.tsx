import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/** Retrieves all comments made on a post and displays them in a scrollable list */
export default function CommentsList({ comments }) {

    const list = comments.map((comment, index) => {
        return (
            <View key={index} >
                <Text style={styles.username}>{comment.uploader + ":"}</Text>
                <Text>{comment.comment}</Text>
            </View >
        )
    })
    return <View style={styles.container}>{list}</View>
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight * (1 / 3),
        margin: 5,
        zIndex: 100,
    },
    username: {
        fontWeight: 'bold'
    },
})
