import React, { useState } from 'react'
import { Dimensions, View, TextInput, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { ip, port } from '../utils'
import CommentsList from "./CommentsList"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function CommentBox({ commenting, uri }) {

    const [comment, setComment] = useState(false);
    const route = `http://${ip}:${port}/api/${comment}/${global.username}/${uri}`

    function send() {
        fetch(`${route}`)
            .then(res => res.json())
            .then(data => {
                // if (data) {
                //     displayImages(data)
                // }
            })
            .catch(error => {
                console.error(error)
            })
    }

    const sendButton =
        <TouchableOpacity style={styles.button} onPress={() => send}>
            <Image style={styles.sendIcon} source={require('../assets/send.png')}></Image>
        </TouchableOpacity>
    const box = <TextInput style={styles.textInput} onChange={(value) => setComment.bind(this, value)}></TextInput>
    return commenting ? <View style={styles.row}>{[box, sendButton]}</View> : <View></View>
}

export default function CommentSection({ uri }) {

    const [commenting, setCommenting] = useState(false);

    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={() => setCommenting(!commenting)}>
                <Image style={styles.commentIcon} source={require('../assets/comment.png')}></Image>
            </TouchableOpacity>
            <CommentBox commenting={commenting} uri={uri} />
            <CommentsList />
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
    commentIcon: {
        width: windowWidth * (1 / 12),
        height: windowHeight * (1 / 16),
        margin: 2
    },
    sendIcon: {
        width: windowWidth * (1 / 10),
        height: windowHeight * (1 / 20),
        margin: 5
    },
    button: {
        width: windowWidth * (1 / 12),
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    textInput: {
        width: windowWidth * 11 / 12
    }
})