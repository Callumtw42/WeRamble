import { StyleSheet, View, Text, ScrollView, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { host } from '../utils'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const data = [
    { user: "Bill", comment: "blah blah blah blah blah blah blah blah" },
    { user: "Jane", comment: "blah blah blah" },
    { user: "Jeff", comment: "blah blah blah blah" },
    { user: "Jill", comment: "blah blah blah blah blah blah blah" },
    { user: "Joe", comment: "blah blah blah blah blah blah" },
]


export default function CommentsList({ image, comments }) {


    const gallery = comments.map((comment, index) => {
        return (
            <View key={index} >
                <Text style={styles.username}>{comment.uploader + ":"}</Text>
                <Text>{comment.comment}</Text>
            </View >
        )
    })
    return (<View style={styles.container}>{gallery}</View>)
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
