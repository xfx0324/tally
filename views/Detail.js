import React from 'react';
import SplashScreen from 'react-native-splash-screen'
import {Icon} from 'react-native-elements';
import {View, Text, StyleSheet, Button, ScrollView,AsyncStorage,FlatList} from 'react-native';
import Picker from 'react-native-picker';
import Swipeout from 'react-native-swipeout';
class Detail extends React.Component{
    constructor(){
        super();
        this.state={
            dataN:[2020,2],
            tallyArr:[]
        }
    }
    //缓存读取记账明细数组
    getTallyArr=async()=>{
        let tallyArrN=JSON.parse(await AsyncStorage.getItem('inTallyS'))
        this.setState({tallyArr:tallyArrN})
        console.log(tallyArrN)
    }
    selectDate = () => {
        let pickerData = [];
        let year = [];
        let month = [];
        for (let i = 2010; i <= 2025; i++) {
          year.push(i);
        }
        for (let i = 1; i <= 12; i++) {
          month.push(i);
        }
        pickerData.push(year);
        pickerData.push(month);
        Picker.init({
          pickerData: pickerData,
          selectedValue: ['2020', '2'],
          pickerConfirmBtnText: '确定',
          pickerCancelBtnText: '取消',
          pickerTitleText: '选择年月',
          onPickerConfirm: data => {
            this.setState({dataN:data})
          },
        //   onPickerCancel: data => {
        //     console.log('取消：', data);
        //   },
        //   onPickerSelect: data => {
        //     console.log('选择了：', data);
        //   }
        })
        Picker.show();
      }
      componentDidMount(){
        setTimeout(() => {
            SplashScreen.hide();
          },1200)
          this.getTallyArr();
    }
    render(){
        return (
        <View>
            <View style={styles.view1}>
                <View style={styles.view2}>
                    <Text style={styles.title}>鲨鱼记账</Text>
                    <View style={styles.icon}>
                    <Icon name="search1" type="antdesign" size={20} color="#696969"></Icon>
                    </View>
                    <Icon name="calendar" type="antdesign" size={20} color="#696969"></Icon>
                </View>
                <View style={styles.row}>
                    <Text style={styles.cen}>{this.state.dataN[0]}</Text>
                    <Text style={styles.cen}>收入</Text>
                    <Text style={styles.cen}>支出</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.cen1}>{this.state.dataN[1]}月</Text>
                    <Icon name="caretdown" type="antdesign" size={16} color="#696969" onPress={this.selectDate}></Icon>
                    <Text style={styles.cen2}>20.00</Text>
                    <Text style={styles.cen}>10.00</Text>
                </View>    
            </View>
            <View>
                <FlatList keyExtractor={(item, index) => index} extraData={this.state} data={this.state.tallyArr} renderItem={(item,index)=>
                    <View>
                        
                    </View>
                
                }/>
            </View>
        </View>)
    }
}
const styles = StyleSheet.create({
    view1: {
        height:150,
        backgroundColor:"#ffdb4d",
    },
    view2:{
        flexDirection:'row',
        paddingTop:15,
        paddingLeft:170,
        marginBottom:20
    },
    title:{
        fontSize:24
    },
    icon:{
        marginLeft:95,
        marginRight:18
    },
    row:{
        flexDirection:'row',
        marginLeft:20,
        marginTop:10,
    },
    cen:{
        fontSize:16,
        marginRight:100
    },
    cen1:{
        fontSize:16,
    },
    cen2:{
        fontSize:16,
        marginLeft:86,
        marginRight:90
    }

})

export default Detail;