import { globalAgent } from 'node:http';
import React, { useState } from 'react'
import { Dimensions, View, TextInput, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import {host } from '../utils'
import CommentsList from "./CommentsList"
import Like from './Like';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const route = `${host}/api/postcomment`

function CommentBox({ commenting, image }) {

    const [comment, setComment] = useState("");
    const config = {
        method: 'POST',
        headers: {
            "Content-Type": "application/JSON"
        },
        body: JSON.stringify({ comment: comment, user: global.username, post: image.id })
    }

    function send() {
        fetch(route, config)
            .then(res => res.json())
            .catch(error => {
                console.error(error)
            })
    }

    const sendButton =
        <TouchableOpacity key={0} style={styles.button} onPress={send}>
            <Image style={styles.sendIcon} source={require('../assets/send.png')}></Image>
        </TouchableOpacity>
    const box = <TextInput key={1} style={styles.textInput} onChangeText={(v) => setComment(v)}></TextInput>
    return commenting ? <View style={styles.row}>{[box, sendButton]}</View> : <View></View>
}

export default function CommentSection({ image }) {

    const [commenting, setCommenting] = useState(false);

    return (
        <View>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={() => setCommenting(!commenting)}>
                    <Image style={styles.commentIcon} source={require('../assets/comment.png')}></Image>
                </TouchableOpacity>
                <Like />
            </View>
            <CommentBox commenting={commenting} image={image} />
            <CommentsList image={image} />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: windowWidth,
        height: windowHeight * (2 / 3),
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row'
    },
    commentIcon: {
        width: windowWidth * (1 / 12),
        height: windowHeight * (1 / 16),
        margin: 2
    },
    sendIcon: {
        width: windowWidth * (1 / 10),
        height: windowHeight * (1 / 20),
    },
    button: {
        width: windowWidth * (1 / 12),
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1
    },
    textInput: {
        width: windowWidth * 11 / 12,
    }
})