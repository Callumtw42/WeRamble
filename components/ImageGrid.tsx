import React, { useEffect, useState } from 'react';
import { Dimensions, Image, RefreshControl, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { get } from '../utils';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

/**retrieves images from the database and displays them in a grid callback contains number of images*/
export default function ImageGrid({ route, navigation, callback = (i) => { } }) {

    const [gallery, setGallery] = useState([])
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    function viewImage(image) {
        navigation.navigate("ImageView", image);
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
                        <TouchableOpacity key={key++} onPress={viewImage.bind(this, image)}>
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
        get(route, (d) => {
            callback(d.length);
            displayImages(d);
        })
    }, [refreshing])

    return (
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
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