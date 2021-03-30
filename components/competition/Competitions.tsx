import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Dimensions, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import { get, host } from '../../utils';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = require('../components/StyleSheet');

const dummy = [
    {
        name: "Competition Name",
        hostUser: "User Name",
        //we need Limit the number of words better within 18-20
        description: "Here is a description of the competition,i write longer for test the func.maybe need loo0000000000000000000000000000000000000oooooooooooooooonger",
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
        get(route, renderCompetitions)
    }, [])

    function renderCompetitions(data) {
        setCompetitions(
            data.map((competition, index) => {
                const { name, hostUser, image, description } = competition;
                return (
                    <View style={styles.borderbox} key={index}>
                        <TouchableOpacity style={styles.competition}
                            onPress={() => {
                                navigation.navigate("Competition",
                                    { name: name, image: image })
                            }}
                        >
                            <View style={styles.istView}>
                                <Text style={styles.name}>{name}</Text>
                                <Text style={{ color: '#324200' }}>{"by " + hostUser}</Text>
                            </View>
                            <View style={styles.secView}>
                                <Image source={{ uri: image }} style={styles.image} />
                                <View style={{ width: "74%" }}>
                                    <Text style={styles.description}>{description}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                )

            })
        )
    }

    return (
        <View  style={{backgroundColor:"#a8e6ff"}}>
            <TouchableOpacity style={styles.topbotton
              
            } onPress={() => navigation.navigate("NewCompetition")}>
                <Text style={styles.title}>New Competition  </Text>
                <Image source={require("../assets/plus.png")} style={styles.icon}></Image>
            </TouchableOpacity>

            <ScrollView style={styles.competitions} showsVerticalScrollIndicator={false} >
                {competitions}
            </ScrollView>
        </View>
    )
}

/*const styles = StyleSheet.create({
    image:
    {
        width: windowWidth / 3,
        height: windowHeight / 6,
        borderRadius: 18,
        margin: 2,
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
        margin: 4,
        borderRadius: 18,
        backgroundColor: "#bfcde3",
    },
    title: {

        fontSize: 18,
        fontWeight: '600',
        textAlign: "center",
    },
    competition: {

    },
    competitions: {
        margin: 3,
    },
    name: {
        margin: 5,
        alignSelf: "center",
        color: "#001a40"
    },
    istView: {
        marginLeft: 20,
        marginBottom: 5,

    },
    secView: {
        flexDirection: "row",
    },
    description: {
        color: "#575757",
        top: 10,
        justifyContent: "center",
        fontSize: 18,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 35,
    },
    editpButton: {
        alignItems: "center",
        borderColor: Colors.black,
        borderWidth: 1,
        width: "40%",
        alignSelf: 'center',
        borderRadius: 18,
        backgroundColor: '#31a8bd'
    },
    topbotton:{        
        alignItems: "center",
        borderColor: Colors.black,
        borderWidth: 1,
        width: "60%",
        height:40,
        borderRadius: 18, 
        flexDirection: "row",
        alignSelf: "center", 
        justifyContent:"center",
        margin: 10, 
        backgroundColor:"#a8e6ff",

    },
})*/
