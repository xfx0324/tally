import React from 'react';

import {View, Text, StyleSheet, Image} from 'react-native';

class My extends React.Component{
    constructor(){
        super();
        this.state={
            // name:AsyncStorage.getItem('userName')==null?'请登陆':AsyncStorage.getItem('userName'),
            // url:AsyncStorage.getItem('userUrl')==null?"require('../imgs/wei.png')":AsyncStorage.getItem('userUrl')
            name:"123",
            url:"require('../imgs/wei.png')"
        }
    }
    render(){
        return (<View>
            <View style={styles.con}>
            <Text>打卡</Text>
            <Image source={require('../imgs/wei.png')} onPress={this.goLogin}/>
            <Text>12</Text>
            </View>
            <View>
            <Text>我的</Text>
            </View>
        </View>
        
        )
    }
    goLogin(){
        this.props.navigation.navigate('login')
    }
}

const styles = StyleSheet.create({
    con: {
        fontSize: 20,
        backgroundColor:"#ffcc33",
        height:300
    }
})

export default My;