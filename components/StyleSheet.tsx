import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
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
    }
  });