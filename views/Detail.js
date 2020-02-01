import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

class Detail extends React.Component{
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