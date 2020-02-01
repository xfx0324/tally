import React from 'react';

import {View, Text,StyleSheet} from 'react-native';

class Found extends React.Component{
    render(){
        return (<View style={styles.con}>
            <Text>发现</Text>
        </View>)
    }
}
const styles = StyleSheet.create({
    con: {
        fontSize: 20
    }
})

export default Found;