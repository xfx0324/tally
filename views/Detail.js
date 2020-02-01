import React from 'react';
import SplashScreen from 'react-native-splash-screen'

import {View, Text, StyleSheet} from 'react-native';

class Detail extends React.Component{
    componentDidMount(){

        setTimeout(() => {
            SplashScreen.hide();
          }, 1000);
        //setTimeout(1000,function(){
            // SplashScreen.hide(1000);
        //});

    }
    render(){
        return (<View style={styles.con}>
            <Text>明细</Text>
        </View>)
    }
}

const styles = StyleSheet.create({
    con: {
        fontSize: 20
    }
})

export default Detail;