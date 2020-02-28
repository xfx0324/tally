import React from 'react';
import {Icon} from 'react-native-elements';
import {View, Text, StyleSheet, FlatList,AsyncStorage,TextInput} from 'react-native';
import Picker from 'react-native-picker';

class YearReport extends React.Component{
    constructor(){
        super();
        this.state={
            year1:'2020',
            yearIn:0,
            yearOut:0,
            monthArr1:[]
        }
    }
    //获取年度数据
    yearData=async()=>{
        let tallyArrN=JSON.parse(await AsyncStorage.getItem('inTallyS'))
        let tallySearch=[]
        //得到选择的年份的数组
        for(let i=0;i<tallyArrN.length;i++){
            if(tallyArrN[i].year==this.state.year1){
                tallySearch.push(tallyArrN[i])
            }
        }
        //得到年度每个月的收入／支出
        let monthArr=[] //根据选择年份按月份的收入支出数组
        
        for(let i=1;i<13;i++){
            let monthIn=0;
            let monthOut=0;
            for(let j=0;j<tallySearch.length;j++){
                if(tallySearch[j].month==i){
                    monthIn+=tallySearch[j].dayIn
                    monthOut+=tallySearch[j].dayOut
                }
            }
                monthArr.push({month:i,inMoney:monthIn,outMoney:monthOut,surplus:monthIn-monthOut})
        }
        console.log('hhhhhhh',tallySearch,monthArr)
        this.setState({monthArr1:monthArr})
        //得到年度总收入／支出
        let yearInSum=0
        let yearOutSum=0
        for (let i=0;i<monthArr.length;i++){
            yearInSum+=monthArr[i].inMoney
            yearOutSum+=monthArr[i].outMoney
        }
        this.setState({yearIn:yearInSum}) 
        this.setState({yearOut:yearOutSum})
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
                <View style={styles.head1}>
                    <Text style={styles.text2}>结余</Text>
                    <Text style={styles.text3}>{this.state.yearIn-this.state.yearOut}</Text>
                    <View style={styles.head2}>
                        <Text style={styles.text4}>收入</Text>
                        <Text style={styles.text5}>{this.state.yearIn}</Text>
                        <Text style={styles.text6}>|</Text>
                        <Text style={styles.text7}>支出</Text>
                        <Text style={styles.text8}>{this.state.yearOut}</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={styles.section1}>
                        <Text style={styles.text9}>月份</Text>
                        <Text style={styles.text9}>收入</Text>
                        <Text style={styles.text9}>支出</Text>
                        <Text style={styles.text9}>结余</Text>
                    </View>
                    <FlatList keyExtractor={(item, index) => index} extraData={this.state} ItemSeparatorComponent={() => <View style={{height:1,backgroundColor: '#f0f0f5'}}/>} data={this.state.monthArr1} renderItem={({item,index})=>
                    <View style={styles.section2}>
                        <Text style={styles.text9}>{item.month}月</Text>
                        <Text style={styles.text9}>{item.inMoney}</Text>
                        <Text style={styles.text9}>{item.outMoney}</Text>
                        <Text style={styles.text9}>{item.surplus}</Text>
                    </View>}/>
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
        marginLeft:155,
        marginRight:133,
        fontSize:16
    },
    head1:{
        backgroundColor:"#ffdb4d",
        paddingTop:15,
        paddingBottom:10
    },
    text2:{
        width:430,
        textAlign:'center'
    },
    text3:{
        width:430,
        textAlign:'center',
        fontSize:34,
        paddingBottom:10
    },
    head2:{
        flexDirection:'row',
    },
    text4:{
        paddingTop:5,
        flex:3,
        textAlign:'right'
    },
    text5:{
        flex:2,
        fontSize:20
    },
    text6:{
        flex:1,
        textAlign:'center',
        fontSize:20
    },
    text7:{
        flex:2,
        paddingTop:5,
        textAlign:'right'
    },
    text8:{
        flex:3,
        textAlign:'left',
        fontSize:20,
    },
    section1:{
        flexDirection:'row',
        textAlign: 'center',
        borderWidth:1,
        borderColor:'#f0f0f5'
    },
    section2:{
        flexDirection:'row',
        textAlign: 'center',
    },
    text9:{
        paddingTop:7,
        paddingBottom:7,
        marginRight:20,
        flex:1,
        textAlign:'center'
    }
})

export default YearReport;