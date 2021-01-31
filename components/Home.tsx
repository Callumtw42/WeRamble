import React, { useState, useEffect } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, Button, RefreshControl, TouchableOpacity } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { ip, port } from "../utils"

const route = `http://${ip}:${port}/api/feed`
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function Home({ navigation }) {

    const [gallery, setGallery] = useState([])
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, []);

    function displayImages(data) {
        const rows = [];
        let key = 0;
        let i = -1;
        while (i < data.length) {
            let images = []
            for (let j = 0; j < 3; j++) {
                let image = data[++i];
                if (image) {
                    images.push(<Image key={key++} source={{ uri: image.uri }} style={styles.thumbnail} />)
                }
            }
            let row =
                <View key={key++} style={styles.galleryRow}>{images}</View>
            rows.push(row);
        }
        setGallery(rows);
    }

    useEffect(() => {
        fetch(`${route}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    displayImages(data)
                }
            })
            .catch(error => {
                console.error(error)
            })
    }, [refreshing])

    return (
        <View style={styles.container} >
            <View style={styles.camButton}><Button title="Camera" onPress={() => navigation.navigate("Camera")}></Button></View>
            <ScrollView style={styles.scrollView}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={styles.gallery}>{gallery}</View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    thumbnail: {
        width: windowWidth / 3,
        height: windowHeight / 6,

    },
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    galleryRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    gallery: {
        display: 'flex',
        flexDirection: 'column'
    },
    camButton: {
    },
    scrollView: {
    },

})