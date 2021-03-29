import React from 'react';
import {Text, View,StyleSheet, TouchableOpacity,SafeAreaView, Image, Button,Alert} from 'react-native';
import Posts from './Posts';
   //use those vars to link datebase,
const number = 5000
const randomNumber1 = parseInt(Math.random() * number)
const randomNumber2 = parseInt(Math.random() * number)
const randomNumber3 = parseInt(Math.random() * number)
const username ="OtherUsers"
const Signature ="hello word！！"

function OthersProfile(props) {
    return (

    <SafeAreaView style={styles.background}>
            <View style={styles.topbar}>
                <Text style={styles.usernames}>{username} </Text>

        
            </View>
            <View style={styles.barline} />
            <View style={styles.informbar}>
            
                <Image style={styles.userheadimage}
                        source={{
                        uri:"https://picsum.photos/200/200"}}/>
                <View style={styles.container}>
                        <Text>{randomNumber1}</Text>
                        <Text style={{fontWeight:'bold'}}>Posts</Text>
                </View>
                <View style={styles.container}>
                        <Text>{randomNumber2}</Text>
                        <Text style={{fontWeight:'bold'}}>Followers</Text>    
                </View>
                <View style={styles.container}>
                        <Text>{randomNumber3}</Text>
                        <Text style={{fontWeight:'bold'}}>Following</Text>
                </View>
    
            </View>  
  
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.username}>{Signature}</Text>
            <View style={styles.editpButton}>
            <Button  
            style={styles.Buttons}
            onPress={() => Alert.alert('thanks!')}
            title="follow"
            color="#c1d9d1"/>
            <Button  
            style={styles.Buttons}
            onPress={() => Alert.alert('coming soon')}
            title="Message"
            color="#c1d9d1"/>
            </View>

            <View style={styles.barline}/>
            <View style={styles.userpost1}>
               <Posts></Posts>
            </View>        

                <View style={styles.userpost}>
                <Image 
                source={{
                        width:"31%",
                        height:"100%",
                        uri:"https://picsum.photos/300/100"}} />
                <Image source={{
                    width:"31%",
                    height:"100%",
                        uri:"https://picsum.photos/100/300"}}/>
                <Image source={{
                    width:"31%",
                    height:"100%",
                        uri:"https://picsum.photos/200/200"}}/>
           
             </View> 
              


    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:"white",
        
    },
    topbar:{
        flexDirection:"row",
        height:70,
    },
    usernames:{
        textAlign:"left",
        justifyContent:"flex-start",
        top:20,
        left:10,
        fontSize:25,
    },

    camera:{
        top:10,
        height:50,
        width:50,
        position:"absolute",
        right:10,
    },
    barline:{
        backgroundColor:'#bdbdbd',
        height:0.5,
        width:"100%",
        top:3,
    },
    informbar:{
        flexDirection:"row",
        height:"18%",
    },
    editpButton:{
        flexDirection:"row",
        justifyContent:"space-evenly",
     
    },
    Buttons:{
      
    },
    userpost:{
        top:5,
        justifyContent:'space-evenly',
        flexDirection:"row",
        height:"25%",
    },
    userpost1:{
        top:10,
        flexDirection:"row",
        height:"25%",
    },
    userheadimage:{
        marginRight:10,
        alignItems:'center',
        justifyContent:'center',
        width: "23%",
        height:"60%",
        backgroundColor:'#f76260',
        borderRadius:500,
        top:20,
        left:20,
    },
    username:{
        left:30,
        bottom:40,
        fontSize:18,
    },
    container:{
        width:"20%",
        height:"100%",
        margin:10,
        alignItems:"center",
        justifyContent:"center",
 
    }
})


export default OthersProfile;