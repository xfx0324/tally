import React from 'react';
import {Icon} from 'react-native-elements';
import {View, Text, StyleSheet, FlatList} from 'react-native';

class Tally extends React.Component{
    constructor(){
        super();
        this.state={
            outArr:[
                {iconName:"phone",sort:"话费"},
                {iconName:"book",sort:"学习"},
                {iconName:"team",sort:"聚餐"},
                {iconName:"car",sort:"加油费"},
                {iconName:"rest",sort:"饮料"},
                {iconName:"bank",sort:"房租"},
                {iconName:"apple-o",sort:"水果"},
                {iconName:"gift",sort:"礼物"},
                {iconName:"medicinebox",sort:"医疗"},
                {iconName:"customerservice",sort:"音乐"},
                {iconName:"contacts",sort:"人际"},
                {iconName:"smileo",sort:"零食"},
            ],
            inArr:[{iconName:"",sort:""}],
            flag:false
        }
    }
    selectSort= () => {
        this.setState({flag:true})
        console.log(this.state.flag)
    }
    render(){
        return (
        <View>
            <View style={styles.head}>
                <Text>支出</Text>
                <Text>收入</Text>
                <Text>取消</Text>
            </View>
            <View>
            <FlatList numColumns={4} data={this.state.outArr} renderItem={({item}) => <View key={item.sort} style={styles.view}>
                    <View style={styles.iconV}><Icon onPress={this.selectSort} name={item.iconName} type="antdesign" size={34} color="gray"></Icon></View>
                    <Text style={styles.text}>{item.sort}</Text>
                </View>}/>
            </View>
            <View>

            </View>
        </View>)
    }
}

const styles = StyleSheet.create({
    head:{
        height:80,
        backgroundColor:"#ffdb4d",
        flexDirection:'row',
        marginBottom:20
    },
    view: {
        fontSize:16,
        width:85,
        marginLeft:24,
        marginBottom:12
    },
    iconV1:{
        backgroundColor:"#ffdb4d",
        width:64,
        height:64,
        borderRadius:32,
        paddingTop:14,
    },
    iconV:{
        backgroundColor:"#f2f2f2",
        width:64,
        height:64,
        borderRadius:32,
        paddingTop:14,
    },
    text:{
        width:85,
        paddingLeft:17
    }
})

export default Tally;