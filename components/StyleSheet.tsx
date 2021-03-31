import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
    //styles from login.tsx
    sectionTitle: {
      paddingTop: 20,
      fontSize: 24,
      fontWeight: '600',
      color: Colors.black,
      textAlign: "center",
    },
    smallText: {
      paddingTop: 10,
      paddingBottom: 10,
      textAlign: "center"
    },
    input: {
      borderColor: Colors.black,
      borderWidth: 1,
      width: "80%",
      alignSelf: 'center',
      borderRadius:18,
      color: 'black',
      backgroundColor: 'white' 
    },
    Logins:{
      borderRadius:18,
      width:"60%",
      height:35,
      alignSelf: 'center',
    },
    container: {
      paddingBottom: 100,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#a8e6ff',
      height: windowHeight,
      width: windowWidth
    },
    loginButton: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    logo: {
      flexDirection: 'row',
      alignSelf: 'center',
      width: 300,
      height: 200
    },

    //style form register.tsx
    register: {
        top:15,
        width:"60%",
        height:"40%",
        alignSelf: 'center',
        borderRadius:18,
    },

    //style from competitions.tsx
    image: {
        width: windowWidth / 3,
        height: windowHeight / 6,
        borderRadius: 18,
        margin:2,
    },
    icon: {
        width: windowWidth / 12,
        height: windowHeight / 24,
    },
    borderbox: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
        margin: 4,
        borderRadius: 18,
        backgroundColor:"#bfcde3",
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: "center",
        color: Colors.black
    },
    competitions: {
        margin:8,
    },
    name: {
        margin:5,
        alignSelf:"center",
        color:"#001a40"
    },
    istView: {
        marginLeft:20,
        marginBottom:5,  
    },
    secView: {
        flexDirection:"row",
    },
    description: {
        color:"#575757",
        top:10,
        justifyContent:"center",
        fontSize:15,
        marginTop:5,
        marginLeft:5,
        marginRight:35,
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
        backgroundColor:"#0099ff",
    },

    //styles from newcompetition.tsx
    editpButton: {
        alignItems:"center",
        borderColor: Colors.black,
        borderWidth: 1,
        width: "40%",
        alignSelf: 'center',
        borderRadius:18,
        backgroundColor:'#0099ff'
    },
    buttonsty:{
        top:10,
        flexDirection:"row",
       justifyContent:"space-evenly"
    },

    //styles from imageview.tsx
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

    //styles from liprofile.tsx
    background: {
        flex: 1,
        backgroundColor: "#a8e6ff",
    },
    topbar: {
        flexDirection: "row",
        height: 65,
        justifyContent: 'space-between',
    },
    usernames: {
        textAlign: "left",
        justifyContent: "flex-start",
        top: 10,
        left: 10,
        fontSize: 25,
    },
    camera: {
        margin: 10,
        height: 50,
        width: 50,
    },
    barline: {
        backgroundColor: '#bdbdbd',
        height: 1,
        width: "100%",
        top: 5,
    },
    informbar: {
        flexDirection: "row",
        height: 150,
    },
    profileEditPButton: {
        alignItems:"center",
        borderColor: Colors.black,
        borderWidth: 1,
        width: "80%",
        alignSelf: 'center',
        borderRadius:18,
    },
    userpost1: {
        top: 1,
        flexDirection: "row",
        height: 200,
    },
    userpost: {
        top: 1,
        justifyContent: 'space-evenly',
        flexDirection: "row",
        height: 500,
    },
    userheadimage: {
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        backgroundColor: '#f76260',
        borderRadius: 500,
        top: 20,
        left: 20,
    },
    username: {
        //top:1,
        left: 30,
        bottom: 40,
        fontSize: 18,
    },
    profileContainer: {
        width: "20%",
        height: "100%",
        margin: 10,
        alignItems: "center",
        justifyContent: "center"
    }
  });