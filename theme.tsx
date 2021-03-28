
import { StyleSheet, Dimensions } from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
        margin: 4
    }
})