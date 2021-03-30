import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View,ImageBackground } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/** Retrieves all comments made on a post and displays them in a scrollable list */
export default function CommentsList({ comments }) {

    const list = comments.map((comment, index) => {
        return (
            <View key={index} style={styles.comment}>
                
                <ImageBackground source={require("../assets/bubble.png")} style={styles.image}>
                    <Text style={styles.username}>{comment.uploader + ":"}</Text>
                    <Text  style={styles.commenttext}>{comment.comment}</Text>
                </ImageBackground>
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
        fontWeight: 'bold',
        alignSelf:"center",
    },
    commenttext:{
        left:20,
    },
    comment:{
        margin:1,
    },
    image:{
        height:50,
        width:"98%",
        alignSelf:"center",
    },
})
