import React from 'react';
import {Icon} from 'react-native-elements';
import {View, Text, StyleSheet, FlatList,AsyncStorage,TextInput} from 'react-native';
import Picker from 'react-native-picker';
class Tally extends React.Component{
    constructor(){
        super();
        this.state={
            outArr:[],
            inArr:[],
            flag:false,//判断是支出还是收入的
            flagClick:false,//点击图标类别之后弹出记账输入框
            nameClick:'',//点击的图标名称
            sortClick:'',//点击的图标类别名称
            text:'',//输入框支出或着收入的金额
            dataN:['2020','2','1'],
        }

    }
    //读取缓存的收入/支出类别
    getArr=async()=>{
        let inArrN=await AsyncStorage.getItem('inArrS')
        let outArrN=await AsyncStorage.getItem('outArrS')
        this.setState({inArr:JSON.parse(inArrN)})
        this.setState({outArr:JSON.parse(outArrN)})
    }
     //支出view
     outMoney=()=>{
        this.setState({flag:false})
        console.log("支出")
    }
    //收入view
    inMoney=()=>{
        this.setState({flag:true})
        console.log("收入")
    }
    //取消
    cancel=()=>{
        // this.props.navigation.goBack()
        // console.log('quxiao')
    }
    //选择支出类型
    // selectSortOut= (index) => {
    //     let seleOutArr=this.state.outArr
    //     for(let i=0;i<seleOutArr.length;i++){
    //         seleOutArr[i].iconFlag=false
    //     }
    //     seleOutArr[index].iconFlag=true
    //     this.setState({outArr:seleOutArr})
    //     console.log("out",index)
    // }
    
    //选择收入/支出类型
    selectSort= (index,fl) => {
        if(fl){
            let seleInArr=this.state.inArr
        for(let i=0;i<seleInArr.length;i++){
            seleInArr[i].iconFlag=false
        }
        seleInArr[index].iconFlag=true
        this.setState({nameClick:seleInArr[index].iconName})
        this.setState({sortClick:seleInArr[index].sort})
        this.setState({inArr:seleInArr})
        }
        else{
            let seleOutArr=this.state.outArr
        for(let i=0;i<seleOutArr.length;i++){
            seleOutArr[i].iconFlag=false
        }
        seleOutArr[index].iconFlag=true
        this.setState({nameClick:seleOutArr[index].iconName})
        this.setState({sortClick:seleOutArr[index].sort})
        this.setState({outArr:seleOutArr})
        }
        this.setState({flagClick:true})
         console.log("in2",this.state.flagClick)
    }
    //输入框的值
    handleChange = (value)=>{
        this.setState({ text: value})
    }
    //选择记账日期
    selectDate = () => {
        let pickerData = [];
        let year = [];
        let month = [];
        let day=[];
        for (let i = 2010; i <= 2025; i++) {
          year.push(i);
        }
        for (let i = 1; i <= 12; i++) {
          month.push(i);
        }
        for (let i = 1; i <= 31; i++) {
            day.push(i);
          }
        pickerData.push(year);
        pickerData.push(month);
        pickerData.push(day);
        Picker.init({
          pickerData: pickerData,
          selectedValue: ['2020', '2','1'],
          pickerConfirmBtnText: '确定',
          pickerCancelBtnText: '取消',
          pickerTitleText: '选择年月日',
          onPickerConfirm: data => {
            this.setState({dataN:data})
          },
        })
        Picker.show();
      }
      //完成记账
      finishTally=async()=>{
          console.log(22222)
        let tallyArrN=JSON.parse(await AsyncStorage.getItem('inTallyS'));
        let index;
        let flag1=false;
        let date1=new Date(this.state.dataN[0],this.state.dataN[1]-1,this.state.dataN[2])
        let weekday=new Array(7);
        weekday[0]="星期天";
        weekday[1]="星期一";
        weekday[2]="星期二";
        weekday[3]="星期三";
        weekday[4]="星期四";
        weekday[5]="星期五";
        weekday[6]="星期六";
        let n = weekday[date1.getDay()];
        console.log(n)
        //let outTallyN=JSON.parse(await AsyncStorage.getItem('outTallyS'))
        for(let i=0;i<tallyArrN.length;i++){
            if((tallyArrN[i].title==(this.state.dataN[1]+'月'+this.state.dataN[2]+'日'))&&(tallyArrN[i].year==this.state.dataN[0])){
                flag1=true
                index=i
            }
        }
        //this.state.flag为true是收入类型
        if(this.state.flag&&this.state.text!=''){
            //flag1为true，数组中有这一天的记录，只需在这一天的data数组中加一条数据，不需要增加新的一天的记录
            if(flag1){
                tallyArrN[index].dayIn+=Number(this.state.text)
                tallyArrN[index].data.push({iconName:this.state.nameClick,sort:this.state.sortClick,type:'收入',money:Number(this.state.text)})
                AsyncStorage.setItem('inTallyS',JSON.stringify(tallyArrN))
            }else{
                tallyArrN.push({title:this.state.dataN[1]+'月'+this.state.dataN[2]+'日',week:n,dayOut:0,dayIn:Number(this.state.text),year:this.state.dataN[0],month:this.state.dataN[1],data:[{iconName:this.state.nameClick,sort:this.state.sortClick,type:'收入',money:Number(this.state.text)}]})
                AsyncStorage.setItem('inTallyS',JSON.stringify(tallyArrN))
            }
        }
        else if(!this.state.flag&&this.state.text!=''){
            if(flag1){
                tallyArrN[index].dayOut+=Number(this.state.text)
                tallyArrN[index].data.push({iconName:this.state.nameClick,sort:this.state.sortClick,type:'支出',money:Number(this.state.text)})
                AsyncStorage.setItem('inTallyS',JSON.stringify(tallyArrN))
            }else{
                tallyArrN.push({title:this.state.dataN[1]+'月'+this.state.dataN[2]+'日',week:n,dayOut:Number(this.state.text),dayIn:0,year:this.state.dataN[0],month:this.state.dataN[1],data:[{iconName:this.state.nameClick,sort:this.state.sortClick,type:'支出',money:Number(this.state.text)}]})
                AsyncStorage.setItem('inTallyS',JSON.stringify(tallyArrN))
            }
        }
        this.setState({flagClick:false})
        console.log(this.state.flagClick)
      }
    //类型设置
    setSort=(sort)=>{
        this.props.navigation.navigate('sortSet',{clickSort:sort})
        console.log('支出设置')
    }
    componentDidMount() {
        this.getArr();
      }
    //收入类型设置
    // setSortIn=()=>{
    //     console.log('收入设置')
    // }
    render(){
        return (
        <View>
            <View style={styles.head}>
                <Text style={this.state.flag?styles.text1:styles.text4} onPress={this.outMoney}>支出</Text>
                <Text style={this.state.flag?styles.text5:styles.text2} onPress={this.inMoney}>收入</Text>
                <Text style={styles.text3} onPress={this.cancel}>取消</Text>
            </View>
           
            <View>
                <FlatList keyExtractor={(item, index) => index} extraData={this.state} numColumns={4} data={this.state.flag?this.state.inArr:this.state.outArr} renderItem={({item,index}) => 
                <View style={styles.view}>
                     <View style={item.iconFlag?styles.iconV1:styles.iconV}>
                        <Icon onPress={() => this.selectSort(index,this.state.flag)} name={item.iconName} type="antdesign" size={34} color="gray"></Icon>
                    </View>
                    <Text style={styles.text}>{item.sort}</Text>
                </View>}/>
                <View style={styles.set}>
                    <View style={styles.iconV}><Icon onPress={()=> this.setSort(this.state.flag)} name="setting" type="antdesign" size={34} color="gray"></Icon>
                    </View>
                    <Text style={styles.text}>设置</Text>
                </View>
            </View>
            {this.state.flagClick?(
            <View style={styles.view1}>
                <Text style={styles.text6} onPress={this.finishTally}>完成</Text>
                <TextInput style={styles.input} placeholder='请输入金额' placeholderTextColor='#cccccc' onChangeText={this.handleChange} value={this.state.text}></TextInput>
                <View style={styles.view2}>
                    <Icon name="calendar" type="antdesign" size={22} color="#696969" onPress={this.selectDate}></Icon>
                    <Text style={styles.text7}>{this.state.dataN[0]}年{this.state.dataN[1]}月{this.state.dataN[2]}日</Text>
                </View>
            </View>):(<View></View>)}
        </View>)
    }
}

const styles = StyleSheet.create({
    head:{
        height:70,
        backgroundColor:"#ffdb4d",
        flexDirection:'row',
        marginBottom:20,
        paddingTop:40,
        paddingBottom:2
    },
    text1:{
        fontSize:18,
        marginLeft:160,
        marginRight:30,
        paddingLeft:5,
        paddingRight:5
    },
    text2:{
        fontSize:18,
        marginRight:124,
        paddingLeft:5,
        paddingRight:5
    },
    text3:{
        fontSize:15
    },
    text4:{
        fontSize:18,
        marginLeft:160,
        marginRight:30,
        borderBottomWidth:1,
        borderBottomColor:"#333333",
        paddingLeft:5,
        paddingRight:5
    },
    text5:{
        fontSize:18,
        marginRight:124,
        borderBottomWidth:1,
        borderBottomColor:"#333333",
        paddingLeft:5,
        paddingRight:5
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
    },
    set:{
        marginLeft:20
    },
    view1:{
       position:'absolute',
       backgroundColor:'#f2f2f2',
       width:400,
       height:150,
       left:20,
       top:500,
    },
    text6:{
        width:45,
        height:30,
        marginLeft:355,
        paddingTop:4,
        paddingLeft:8,
        backgroundColor:'#ffdb4d'
    },
    input:{
        color:'gray',
        marginLeft:20,
    },
    view2:{
        flexDirection:'row',
        marginLeft:20,
    },
    text7:{
        marginLeft:20,
    }
})
// arr:[{year:'2020年',inYear:'20000元',outYear:'10000元',everyMonth:[
//     {month:'1月',inMonth:'10000元',outMonth:'5000元',everyDay:[
//         {day:'1月1日',inday:'300',outday:'20',item:[
 //         {money:'300元',iconName:'22',sort:'红包',type:'收入'},
 //         {money:'20元',iconName:'23',sort:'吃饭',type:'支出'},
//         ]},
 //          {day:'1月2日',inday:'900',outday:'20',item:[
    //         {money:'300元',iconName:'22',sort:'红包',type:'收入'},
    //          {money:'600元',iconName:'21',sort:'工资',type:'收入'},
    //         {money:'20元',iconName:'23',sort:'吃饭',type:'支出'},
   //         ]},
//     ]},
//     {month:'2月',inMonth:'10000元',outMonth:'5000元',everyDay:[
//         {day:'2月1日',money:'300元',iconName:'22',sort:'红包',type:'收入'},
//         {day:'2月3日',money:'200元',iconName:'33',sort:'吃饭',type:'支出'}
//     ]}
// ]},
// {year:'2019年',inYear:'20000元',outYear:'10000元',everyMonth:[
// {month:'1月',inMonth:'10000元',outMonth:'5000元',everyDay:[
//     {day:'1月1日',money:'300元',iconName:'22',sort:'红包',type:'收入'},
//     {day:'1月3日',money:'200元',iconName:'33',sort:'吃饭',type:'支出'}
// ]},
// {month:'2月',inMonth:'10000元',outMonth:'5000元',everyDay:[
//     {day:'2月1日',money:'300元',iconName:'22',sort:'红包',type:'收入'},
//     {day:'2月3日',money:'200元',iconName:'33',sort:'吃饭',type:'支出'}
// ]}
// ]},
// ],

// tallyArrN.push({year:this.state.dataN[0],month:this.state.dataN[1],day:this.state.dataN[2],money:-(this.state.text),type:'支出',iconName:this.state.nameClick,sort:this.state.sortClick})
            // AsyncStorage.setItem('inTallyS',JSON.stringify(tallyArrN))
export default Tally;