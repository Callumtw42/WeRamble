import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Dimensions, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import { get, host } from '../utils';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const dummy = [
    {
        name: "Competition Name",
        hostUser: "User Name",
        description: "Here is a description of the competition",
        image: "https://weramble.blob.core.windows.net/images/tiger.jpg"
    },

    {
        name: "Competition Name",
        hostUser: "User Name",
        description: "Here is a description of the competition",
        image: "https://weramble.blob.core.windows.net/images/tiger.jpg"
    },

    {
        name: "Competition Name",
        hostUser: "User Name",
        description: "Here is a description of the competition",
        image: "https://weramble.blob.core.windows.net/images/tiger.jpg"
    },
    {
        name: "Competition Name",
        hostUser: "User Name",
        description: "Here is a description of the competition",
        image: "https://weramble.blob.core.windows.net/images/tiger.jpg"
    },
    {
        name: "Competition Name",
        hostUser: "User Name",
        description: "Here is a description of the competition",
        image: "https://weramble.blob.core.windows.net/images/tiger.jpg"
    }
]

export default function Competitions({ navigation }) {
    const [competitions, setCompetitions] = useState([]);
    const route = `${host}/api/competitions`

    useEffect(() => {
        console.log(route)
        get(route, renderCompetitions)
    }, [])

    function renderCompetitions(data) {
        setCompetitions(
            dummy.map((competition, index) => {
                const { name, hostUser, image, description } = competition;
                return (
                    <View style={styles.borderbox} key={index}>
                        <TouchableOpacity >
                            <Text>{name}</Text>
                            <Text>{"by " + hostUser}</Text>
                            <Text>{description}</Text>
                            <Image source={{ uri: image }} style={styles.image} />
                        </TouchableOpacity>
                    </View>
                )

            })
        )
    }

    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("NewCompetition")}>
                <Text>New Competition</Text>
                <Image source={require("../assets/plus.png")} style={styles.icon}></Image>
            </TouchableOpacity>
            <ScrollView>
                {competitions}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    image:
    {
        width: windowWidth / 3,
        height: windowHeight / 6,
    },
    icon:
    {
        width: windowWidth / 12,
        height: windowHeight / 24,
    },
    borderbox: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
        margin: 4
    }
})