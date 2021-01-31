import fs from 'react-native-fs';
import React from 'react'
import { ip, port, request } from '../utils'
import { View, Image, TouchableOpacity, StyleSheet, Dimensions, Text, ImageBase } from 'react-native'
import { isThisTypeNode } from 'typescript';

// const apiRoute = `http://${ip}:${port}/api/upload`
const apiRoute = `http://${ip}:${port}/api/upload`

export default function ImagePreview({ route }) {
    const { photo } = route.params

    async function upload() {
        console.log(photo.uri)
        const data = new FormData()
        data.append('file', photo)

        fetch(apiRoute, {
            method: 'POST',
            headers: {
                // Content-Type may need to be completely **omitted**
                // or you may need something
                "Content-Type": "application/JSON"
            },
            body: JSON.stringify({ data: photo })
        }).then(
            response => response.json() // if the response is a JSON object
        ).then(
            success => console.log(success) // Handle the success response object
        ).catch(
            error => console.log(error) // Handle the error response object
        );
    }

    return (
        <View style={styles.container}>
            <Image style={styles.container} source={{ uri: photo.uri }} />
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={upload} style={styles.button}>
                    <Text style={{ fontSize: 14 }}> Upload </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'black',
        },
        button: {
            flex: 0,
            backgroundColor: '#fff',
            borderRadius: 5,
            padding: 15,
            paddingHorizontal: 20,
            alignSelf: 'center',
            margin: 20,
        },
    }
)
