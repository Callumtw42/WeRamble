import React, { useState, useEffect } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, Button, RefreshControl, TouchableOpacity} from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { ip, port } from "../utils"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function ImageGrid({ route, navigation }) {

    const [gallery, setGallery] = useState([])
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    function viewImage(uri) {
        console.log(uri)
        navigation.navigate("ImageView", uri);
    }

    function displayImages(data) {
        const rows = [];
        let key = 0;
        let i = -1;
        while (i < data.length) {
            let images = []
            for (let j = 0; j < 3; j++) {
                let image = data[++i];
                if (image) {
                    images.push(
                        <TouchableOpacity key={key++} onPress={viewImage.bind(this, image.uri)}>
                            <Image source={{ uri: image.uri }} style={styles.thumbnail} />
                        </TouchableOpacity>
                    )
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
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
            <View style={styles.gallery}>{gallery}</View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    thumbnail: {
        width: windowWidth / 3,
        height: windowHeight / 6,

    },
    galleryRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    gallery: {
        display: 'flex',
        flexDirection: 'column'
    }
})