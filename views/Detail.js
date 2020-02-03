import React from 'react';
import SplashScreen from 'react-native-splash-screen'

import {View, Text, StyleSheet} from 'react-native';

class Detail extends React.Component{
    componentDidMount(){
        setTimeout(() => {
            SplashScreen.hide();
          },1500)
    }
    render(){
        return (<View style={styles.con}>
            <Text>明细1</Text>
        </View>)
    }
}

const styles = StyleSheet.create({
    con: {
        fontSize: 20
    }
})

export default Detail;