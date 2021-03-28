import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { host } from '../utils';
import ImageGrid from './ImageGrid';
import MenuBar from './MenuBar';
import NavTab from './NavTab';


const route = `${host}/api/feed`
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/**The main image feed*/
 export default function Feed({ navigation }) {

    return (
        <View style={styles.container} > 
          <MenuBar navigation={navigation} />
             {/* <ImageGrid navigation={navigation} route={route} />  */}
             <NavTab></NavTab>

        </View>
    )
}





const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
})

/*
  <MenuBar navigation={navigation} />
*/