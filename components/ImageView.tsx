import React from 'react';
import { Text, Dimensions, Image, ScrollView, StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';


import CommentSection from './CommentSection';

const styles = require('../components/StyleSheet');

/** Displays a single image post in a large format */
export default function ImageView({ navigation, route }) {
    const image = route.params;
    return (
        <ScrollView style={styles.imageViewContainer} showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={styles.postername} onPress={() => navigation.navigate("Profile", { username: image.uploader })}>
                <Text style={{fontSize:20,fontStyle:"italic",fontWeight:"bold",}}>{"Posted by: " + image.uploader}</Text>
            </TouchableOpacity>
            < Image source={{ uri: image.uri }} style={styles.imageViewImage} />
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
    postername: {
        alignItems: "center",

        borderWidth: 0,
        width: "98%",
        borderRadius: 8,
        backgroundColor: '#31a8bd',
        // left:5,
        marginHorizontal:5,
        marginVertical:2,
        // top:5,
    },
    
})*/
