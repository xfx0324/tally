import React from 'react';

import {View, Text,StyleSheet,AsyncStorage} from 'react-native';
import {Icon} from 'react-native-elements';

class Found extends React.Component{
    constructor () {
        super();
        this.state={
            month:'',
            inMoney:0,
            outMoney:0,
        }
    }
    //缓存读取记账明细数组
    getTallyArr=async()=>{
        let nameN=await AsyncStorage.getItem('userName')
        if(nameN){
            let tallyArrN=JSON.parse(await AsyncStorage.getItem('inTallyS'))
            let d = new Date();
            let year=d.getFullYear()//当前年份
            this.setState({month:d.getMonth()+1}) //当前月份
            let tallySearch=[]
            let in1Sum=0
            let out1Sum=0
            //得到当前月的数组
            for(let i=0;i<tallyArrN.length;i++){
                if(year==tallyArrN[i].year&&this.state.month==tallyArrN[i].month){
                    tallySearch.push(tallyArrN[i])
                }
            }
            for(let j=0;j<tallySearch.length;j++){
                in1Sum+=tallySearch[j].dayIn
                out1Sum+=tallySearch[j].dayOut
            }
            this.setState({inMoney:in1Sum}) //当前月份的总收入
            this.setState({outMoney:out1Sum})//当前月份的总支出
        }
        
    }
    //查询年度账单
    searchYear=async()=>{
        let nameN=await AsyncStorage.getItem('userName')
        if(nameN){
            this.props.navigation.navigate('yearReport')
        }
        else{
            this.props.navigation.navigate('login')
        }
    }
    componentDidMount(){
        this.getTallyArr();
    }
    render(){
        return (
        <View style={styles.view}>
            <View style={styles.head}>
                <Text style={styles.text1}>发现</Text>
            </View>
            <View style={styles.row}>
                    <View style={styles.col}>
                        <Text style={styles.cen}></Text>
                        <Text style={styles.cen}>{this.state.month}月</Text>
                    </View>
                    <View style={styles.col}>
                        <Text style={styles.cen}>收入</Text>
                        <Text style={styles.cen}>{(this.state.inMoney).toFixed(2)}</Text>
                    </View>
                    <View style={styles.col}>
                        <Text style={styles.cen}>支出</Text>
                        <Text style={styles.cen}>{(this.state.outMoney).toFixed(2)}</Text>
                    </View>
                    <View style={styles.col}>
                        <Text style={styles.cen}>结余</Text>
                        <Text style={styles.cen}>{(this.state.inMoney-this.state.outMoney).toFixed(2)}</Text>
                    </View>
                </View>
                <View style={styles.view1}>
                    <Text style={styles.text3}>常用功能</Text>
                    <View>
                        <View style={styles.view2}>
                            <View style={styles.view3}>
                                <Icon onPress={this.searchYear} name='filetext1' type="antdesign" size={30} color="gray"></Icon>
                            </View>
                            <View style={styles.view3}>
                                <Icon name='printer' type="antdesign" size={30} color="gray"></Icon>
                            </View>
                            <View style={styles.view3}>
                                <Icon name='aliwangwang-o1' type="antdesign" size={30} color="gray"></Icon>
                            </View>
                            <View style={styles.view3}>
                                <Icon name='pay-circle-o1' type="antdesign" size={30} color="gray"></Icon>
                            </View>
                        </View>
                        <View style={styles.view4}>
                            <Text style={styles.text2} onPress={this.searchYear}>年度账单</Text>
                            <Text style={styles.text2}>发票助手</Text>
                            <Text style={styles.text2}>宠物精灵</Text>
                            <Text style={styles.text2}>汇率换算</Text>
                        </View>
                    </View>
                </View>
        </View>)
    }
}
const styles = StyleSheet.create({
    view:{
        backgroundColor:"#f0f0f5",
    },
    head:{
        height:70,
        backgroundColor:"#ffdb4d",
        paddingTop:40,
        paddingBottom:10,
        paddingLeft:200,
    },
    text1:{
        fontSize:20
    },
    row:{
        flexDirection:'row',
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        backgroundColor:'white'
    },
    col:{
        flexDirection:'column',
        flex:1,
        textAlign: 'center',
    },
    cen:{
        textAlign: 'center',
    },
    view1:{
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        backgroundColor:'white'
    },
    view2:{
        flexDirection:'row',
        paddingLeft:25
    },
    view3:{
        width:56,
        height:56,
        backgroundColor:"#ffdb4d",
        borderRadius:28,
        paddingTop:12,
        marginRight:29,
        marginTop:15
    },
    view4:{
        flexDirection:'row',
        paddingLeft:25 
    },
    text2:{
        marginRight:30,
        marginTop:8
    },
    text3:{
        paddingLeft:25
    }
})

export default Found;