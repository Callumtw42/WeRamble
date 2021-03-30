
import { StyleSheet, Dimensions } from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//const imageHeight = Dimensions.get('image').height;
//const imageWidth = Dimensions.get('image').width;
//the size for border should suit with the image.or border should Slight bigger than image

export const theme = StyleSheet.create({
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
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'black',
        justifyContent:"flex-end",
        borderRadius:18,
        height:"55%",
        margin:4,
        backgroundColor:"#7be4f7",
    }
})