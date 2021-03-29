import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';


class Test extends React.Component{
    state={
        liked:false
    }
    onLike=()=>{
        this.setState({liked:!this.state.liked})
    }
    render(){
        return(
            <View>
              <View style={{
                  paddingTop:5,
                  flexDirection:"row",
                  alignItems:'flex-start',
                  justifyContent:"flex-start"
              }}>
                <TouchableOpacity
                    onPress={this.onLike}
                    style={{
                        marginBottom:20,
                        borderRadius:5,
                        padding:5,
                        backgroundColor:'#fafafa',
                    }}
                >
                    <Icon name= {this.state.liked === true ? "heart":"heart"}
                    color= {this.state.liked===true? "red":"black"}
                    size={20}/>
                </TouchableOpacity>
                
                </View>
            </View>
        )
    }
}
//export default Test;