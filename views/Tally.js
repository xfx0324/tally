import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

class Tally extends React.Component{
    render(){
        return (<View style={styles.con}>
            <Text>记账</Text>
        </View>)
    }
}

const styles = StyleSheet.create({
    con: {
        fontSize: 20
    }
})

export default Tally;