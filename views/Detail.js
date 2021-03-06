import React from 'react';
import SplashScreen from 'react-native-splash-screen'
import {Icon} from 'react-native-elements';
import {View, Text, StyleSheet, Button, ScrollView, SectionList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import Picker from 'react-native-picker';
import Swipeout from 'react-native-swipeout';
class Detail extends React.Component{
    constructor(){
        super();
        this.state={
            dataN:[2020,5],
            in1:0,
            out1:0,
            tallyAll:[],//全部记账数据
            tallyArr:[],//当月记账数据
            flag:false,//是否登录
        }
    }
    //缓存读取记账明细数组
    getTallyArr=async()=>{
        let nameN=await AsyncStorage.getItem('userName')
        //如果已经登录就读取缓存的记账数据
        if(nameN){
            let tallyArrN=JSON.parse(await AsyncStorage.getItem('inTallyS'))
            console.log(11111,tallyArrN)
            let tallySearch=[]
            let in1Sum=0
            let out1Sum=0
            for(let i=0;i<tallyArrN.length;i++){
                if(this.state.dataN[0]==tallyArrN[i].year&&this.state.dataN[1]==tallyArrN[i].month){
                tallySearch.push(tallyArrN[i])
                }
            }
            for(let j=0;j<tallySearch.length;j++){
                in1Sum+=tallySearch[j].dayIn
                out1Sum+=tallySearch[j].dayOut
            }
            this.setState({in1:in1Sum}) //选择月份的总收入
            this.setState({out1:out1Sum})//选择月份的总支出
            this.setState({tallyArr:tallySearch})
            this.setState({tallyAll:tallyArrN})
            //console.log(tallySearch)
        }
        else{
            this.setState({flag:true})
        }
        
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
          selectedValue: ['2020', '5'],
          pickerConfirmBtnText: '确定',
          pickerCancelBtnText: '取消',
          pickerTitleText: '选择年月',
          onPickerConfirm: data => {
            this.setState({dataN:data})
            this.getTallyArr()
          }
        })
        Picker.show();
      }
      //删除单条记录
      dele=(index,section)=>{
        let deleC=this.state.tallyAll
        let i=deleC.indexOf(section)
        if(section.data.length==1){
            deleC.splice(i,1)
            this.setState({tallyAll:deleC},()=>{
                AsyncStorage.setItem('inTallyS',JSON.stringify(this.state.tallyAll))
                this.getTallyArr()
            })
        }else{
            if(deleC[i].data[index].type=='支出'){
                deleC[i].dayOut-=deleC[i].data[index].money
            }
            else if(deleC[i].data[index].type=='收入'){
                deleC[i].dayIn-=deleC[i].data[index].money
            }
            deleC[i].data.splice(index,1)
            this.setState({tallyAll:deleC},()=>{
                AsyncStorage.setItem('inTallyS',JSON.stringify(this.state.tallyAll))
                this.getTallyArr()
            })
        }
        
      }
      //删除整天记录
      deleA=(section)=>{
        let deleC=this.state.tallyAll
        let i=deleC.indexOf(section)
        // console.log('删除的数据',section,this.state.tallyAll,deleC,i)
        deleC.splice(i,1)
            this.setState({tallyAll:deleC},()=>{
                AsyncStorage.setItem('inTallyS',JSON.stringify(this.state.tallyAll))
                this.getTallyArr()
            })
    }
      componentDidMount(){
        setTimeout(() => {
            SplashScreen.hide();
          },1200)
          this.props.navigation.addListener('didFocus',()=>{
            this.getTallyArr();
         })
    }
    shouldComponentUpdate(){
        // this.getTallyArr();
        return true; 
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
                    <Text style={styles.cen2}>{(this.state.in1).toFixed(2)}</Text>
                    <Text style={styles.cen}>{(this.state.out1).toFixed(2)}</Text>
                </View>    
            </View>
            {this.state.flag?(
                <View>
                    <Text style={styles.no}>登录后数据可以实时备份，更安全哦</Text>
                    <View style={{flex:1,marginTop:140,alignItems:'center'}}>
                        <Icon name='filetext1' type='antdesign' size={30} color="gray"></Icon>
                        <Text style={styles.no1}>暂无数据</Text>
                    </View>  
                </View>):(
                <View style={styles.list}>
                    <SectionList keyExtractor={(item, index) => index} extraData={this.state} sections={this.state.tallyArr} ItemSeparatorComponent={() => <View style={{height:1,marginLeft:50,backgroundColor:'#e6e6e6'}}/>} ListEmptyComponent={()=><View style={{flex:1,marginTop:150,alignItems:'center'}}><Icon name='filetext1' type='antdesign' size={30} color="gray"></Icon><Text>暂无数据</Text></View>}
                renderItem={({item,index,section})=>
                <Swipeout style={styles.swi} autoClose={true} right={[{ text: '删除',type: 'delete',onPress:()=>this.dele(index,section)}]}>
                    <View style={styles.list1}>
                        <View style={styles.iconV}>
                            <Icon name={item.iconName} type="antdesign" size={20} color="gray"></Icon>
                        </View>
                        <Text style={styles.text1}>{item.sort}</Text>
                        <Text style={styles.text2}>{item.type=='支出'?'-'+(item.money):(item.money)}</Text>
                    </View>
                    </Swipeout>}
                    renderSectionHeader={({section})=>
                    <Swipeout style={styles.swi} autoClose={true} right={[{ text: '删除',type: 'delete',onPress:()=>this.deleA(section)}]}>
                    <View style={styles.list2}>
                        <Text style={styles.text3}>{section.title}</Text>
                        <Text style={styles.text4}>{section.week}</Text>
                        <Text style={styles.text5}>收入:{section.dayIn}</Text>
                        <Text style={styles.text6}>支出:{section.dayOut}</Text>
                    </View>
                    </Swipeout>}
                />
            </View>
            )}
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
    },
    no:{
        backgroundColor:'#ffffe5',
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:20,
        color:'#ff5050'
    },
    no1:{
        marginTop:20
    },
    list:{
        marginTop:12,
        marginBottom:300
    },
    swi:{
        backgroundColor:'white'
    },
    list1:{
        marginTop:10,
        marginBottom:5,
        flexDirection:'row',
    },
    list2:{
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#e6e6e6',
        paddingBottom:10,
        paddingTop:10,
    },
    iconV:{
        backgroundColor:'#ffdb4d',
        width:26,
        height:26,
        paddingTop:3,
        borderRadius:13,
        marginRight:15,
        marginLeft:15
    },
    text1:{
        
    },
    text2:{
        marginLeft:320
    },
    text3:{
        color:'#a6a6a6',
        fontSize:13,
        paddingLeft:15,
        paddingRight:10
    },
    text4:{
        color:'#a6a6a6',
        fontSize:13,
    },
    text5:{
        color:'#a6a6a6',
        fontSize:13,
        textAlign:"right",
        width:60,
        textAlign:'left',
        marginLeft:210,
        marginRight:10
    },
    text6:{
        color:'#a6a6a6',
        fontSize:13,
        textAlign:"right"
    }
})
export default Detail;