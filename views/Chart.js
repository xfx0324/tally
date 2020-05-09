import React from 'react';
import Echarts from 'native-echarts';
import AsyncStorage from '@react-native-community/async-storage'
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import Picker from 'react-native-picker';

class Chart extends React.Component{
    constructor(){
        super()
        this.state={
            option:{},
            tallyArr:[],
            flag:false,//是否登录
            flag1:false,//判断是支出还是收入的
            dataN:[2020,5],
            avg1:0,
            out1:0,
            in1:0,
            dayM:0,//根据月拿到天数29/28/30/31
        }
    }
    //根据要查询的年月，判断该月的天数
    getMonthDay=(year,month)=>{
        if(month==4||month==6||month==9||month==11){
            this.setState({dayM:30})
        }else if(month==2){
            if(year/4==0&&year/100!=0){
                this.setState({dayM:29})
            }else{
                this.setState({dayM:28})
            }
        }else{
            this.setState({dayM:31})
        }
    }
    getTallyArr=async()=>{
        //缓存读取记账明细数组
        let nameN=await AsyncStorage.getItem('userName')
        //如果已经登录就读取缓存的记账数据
        if (nameN){
            let tallyArrN=JSON.parse(await AsyncStorage.getItem('inTallyS'))
            let tallySearch=[]//查询月份的总数据
            let in1Sum=0 //当月总收入
            let out1Sum=0 //当月总支出
            let inArr=[] //当月每天的收入数组
            let outArr=[] // 当月每天的支出数组
            let dayNum=[]//x轴当月天数数组
            this.getMonthDay(this.state.dataN[0],this.state.dataN[1])
            //根据天数初始化数组，比如当月30天，就是30个0
            for(let a=1;a<=this.state.dayM;a++){
                inArr.push(0)
                outArr.push(0)
                dayNum.push(a) //x轴当月天数数组
            }
            //根据搜索拿到当月数据
            for(let i=0;i<tallyArrN.length;i++){
                if(this.state.dataN[0]==tallyArrN[i].year&&this.state.dataN[1]==tallyArrN[i].month){
                tallySearch.push(tallyArrN[i])
                }
            }
             //根据搜索的当月数据修改支出和收入数组
            for(let j=0;j<tallySearch.length;j++){
                in1Sum+=tallySearch[j].dayIn
                out1Sum+=tallySearch[j].dayOut
                let index=parseInt(tallySearch[j].title.split('月')[1].split('日')[0])
                inArr[index-1]=tallySearch[j].dayIn
                outArr[index-1]=tallySearch[j].dayOut
            }
            this.setState({in1:in1Sum}) //选择月份的总收入
            this.setState({out1:out1Sum})//选择月份的总支出
            let avg=this.state.flag1?(this.state.in1/this.state.dayM):(this.state.out1/this.state.dayM)
            this.setState({avg1:avg}) //平均值
            this.setState({tallyArr:tallySearch})
            // console.log('zhexian',tallySearch)
            // console.log('当月收入数组',inArr)
            // console.log('当月支出数组',outArr)
            // console.log('x轴当月天数数组',dayNum)
            // console.log('当月天数数量',this.state.dayM)

            //折线图
            let option1={
                title:{
                    text:''
                },
                tooltip:{
                },
                legend:{
                    //data:['销量']
                },
                xAxis:{
                    axisLine: {
                        lineStyle: {
                            color: 'gray'//x轴的颜色 
                        }
                    },
                    data:dayNum
                },
                yAxis:{
                    axisLine: {
                        lineStyle: {
                            color: 'gray'//y轴的颜色 
                        }
                    }
                },
                series:[{
                    name:'',
                    type:'line',
                    itemStyle:{
                        normal:{
                            color:'gray',//改变折线点的颜色
                            lineStyle:{
                                color:'#ffdb4d' //改变折线颜色
                            }
                        }
                    },
                    data:(this.state.flag1?inArr:outArr)
                }]
            }
            this.setState({option:option1})
        }
        else{
            this.setState({flag:true})
        }
    }
    //支出view
    outMoney=()=>{
        this.setState({flag1:false})
        this.getTallyArr();
    }
    //收入view
    inMoney=()=>{
        this.setState({flag1:true})
        this.getTallyArr();
    }
    //选择年月
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
    componentDidMount() {
        this.props.navigation.addListener('didFocus',()=>{
            this.getTallyArr();
         })
      }
    render(){
        return (<View style={styles.con}>
             <View style={styles.head}>
             <View style={styles.head1}>
                <Text style={this.state.flag1?styles.text1:styles.text4} onPress={this.outMoney}>支出</Text>
                <Text style={this.state.flag1?styles.text5:styles.text2} onPress={this.inMoney}>收入</Text>
            </View>
            <View style={styles.row}>
                    <Text style={styles.cen}>{this.state.dataN[0]}</Text>
                    <Text style={styles.cen}>{this.state.flag1?'总收入':'总支出'}</Text>
                    <Text style={styles.cen}>平均值</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.cen1}>{this.state.dataN[1]}月</Text>
                    <Icon name="caretdown" type="antdesign" size={16} color="#696969" onPress={this.selectDate}></Icon>
                    <Text style={styles.cen2}>{this.state.flag1?(this.state.in1).toFixed(2):(this.state.out1).toFixed(2)}</Text>
                    <Text style={styles.cen3}>{(this.state.avg1).toFixed(2)}</Text>
                </View>  
            </View>
            <Echarts option={this.state.option} height={300} />
        </View>)
    }
}
const styles = StyleSheet.create({
    head:{
        backgroundColor:"#ffdb4d",
    },
    head1:{
        height:70,
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
    row:{
        flexDirection:'row',
        marginLeft:20,
        marginTop:10,
        paddingBottom:10,
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
        marginLeft:100,
        marginRight:90
    },
    cen3:{
        fontSize:16,
        marginRight:80
    }

})

export default Chart;