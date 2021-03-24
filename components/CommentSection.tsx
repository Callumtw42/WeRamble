import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { get, host, post } from '../utils';
import CommentsList from './CommentsList';
import Like from './Like';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const route = `${host}/api/postcomment`

/**Input box for writing comments */
function CommentBox({ commenting, image, getComments: getComments, setCommenting }) {

    const [comment, setComment] = useState("");
    function send() {
        if (comment.length > 0) {
            post(route, {
                comment: comment,
                user: global.username,
                post: image.id
            }, (d) => {
                getComments();
                setCommenting(false)
            })
        }
    }

    const sendButton =
        <TouchableOpacity key={0} style={styles.button} onPress={send}>
            <Image style={styles.sendIcon} source={require('../assets/send.png')}></Image>
        </TouchableOpacity>
    const box = <TextInput key={1} style={styles.textInput} onChangeText={(v) => setComment(v)}></TextInput>
    return commenting ? <View style={styles.row}>{[box, sendButton]}</View> : <View></View>
}

/**Contains the comments list, likes and comment button*/
export default function CommentSection({ image }) {

    const [commenting, setCommenting] = useState(false);
    const [comments, setComments] = useState([]);
    const route = `${host}/api/getcomments/${image.id}`;

    function getComments() {
        get(route, setComments);
    }

    useEffect(getComments, []);

    return (
        <View>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={() => setCommenting(!commenting)}>
                    <Image style={styles.commentIcon} source={require('../assets/comment.png')}></Image>
                </TouchableOpacity>
                <Like image={image} />
            </View>
            <CommentBox commenting={commenting} image={image} getComments={getComments} setCommenting={setCommenting} />
            <CommentsList comments={comments} />
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