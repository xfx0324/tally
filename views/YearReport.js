import React from 'react';
import {Icon} from 'react-native-elements';
import {View, Text, StyleSheet, FlatList,AsyncStorage,TextInput} from 'react-native';
import Picker from 'react-native-picker';

class YearReport extends React.Component{
    constructor(){
        super();
        this.state={
            year1:'2020'
        }
    }
    //获取年度数据
    yearData=async()=>{

    }
    //返回
    bac=()=>{
        this.props.navigation.goBack()
    }
    //选择年份
    selectDate = () => {
        let pickerData = [];
        let year = [];
        for (let i = 2010; i <= 2025; i++) {
          year.push(i);
        }
        pickerData.push(year);
        Picker.init({
          pickerData: pickerData,
          selectedValue: ['2020'],
          pickerConfirmBtnText: '确定',
          pickerCancelBtnText: '取消',
          pickerTitleText: '选择年',
          onPickerConfirm: data => {
            this.setState({year1:data})
          },
        })
        Picker.show();
      }
    componentDidMount() {
        this.yearData();
      }
    render(){
        return(
            <View>
                <View style={styles.head}>
                    <Icon name="arrowleft" type="antdesign" onPress={this.bac}></Icon>
                    <Text style={styles.text1}>账单</Text>
                    <Text>{this.state.year1}年</Text>
                    <Icon name="caretdown" type="antdesign" size={16} color="#696969" onPress={this.selectDate}></Icon>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    head:{
        flexDirection:'row',
        backgroundColor:"#ffdb4d",
        height:50,
        paddingTop:15,
        paddingLeft:20
    },
    text1:{
        marginLeft:145,
        marginRight:140,
        fontSize:16
    },
})

export default YearReport;