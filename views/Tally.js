import React from 'react';
import {Icon} from 'react-native-elements';
import {View, Text, StyleSheet, FlatList} from 'react-native';

class Tally extends React.Component{
    constructor(){
        super();
        this.state={
            outArr:[
                {key:0,iconName:"phone",sort:"话费",iconFlag:false},
                {key:1,iconName:"book",sort:"学习",iconFlag:false},
                {key:2,iconName:"team",sort:"聚餐",iconFlag:false},
                {key:3,iconName:"car",sort:"加油费",iconFlag:false},
                {key:4,iconName:"rest",sort:"饮料",iconFlag:false},
                {key:5,iconName:"bank",sort:"房租",iconFlag:false},
                {key:6,iconName:"apple-o",sort:"水果",iconFlag:false},
                {key:7,iconName:"gift",sort:"礼物",iconFlag:false},
                {key:8,iconName:"medicinebox",sort:"医疗",iconFlag:false},
                {key:9,iconName:"customerservice",sort:"音乐",iconFlag:false},
                {key:10,iconName:"contacts",sort:"人际",iconFlag:false},
                {key:11,iconName:"smileo",sort:"零食",iconFlag:false},
            ],
            inArr:[
                {key:0,iconName:"redenvelopes",sort:"工资",iconFlag:false},
                {key:1,iconName:"clockcircleo",sort:"兼职",iconFlag:false},
                {key:2,iconName:"bank",sort:"理财",iconFlag:false},
                {key:3,iconName:"creditcard",sort:"礼金",iconFlag:false},
                {key:4,iconName:"pay-circle-o1",sort:"其他",iconFlag:false},
            ],
            style1:'styles.iconV',
            flag:false,
        }
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
        this.setState({inArr:seleInArr})
        }
        else{
            let seleOutArr=this.state.outArr
        for(let i=0;i<seleOutArr.length;i++){
            seleOutArr[i].iconFlag=false
        }
        seleOutArr[index].iconFlag=true
        this.setState({outArr:seleOutArr})
        }
        
        console.log("in",index)
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
    //类型设置
    setSort=(sort)=>{
        this.props.navigation.navigate('sortSet',{clickSort:sort})
        console.log('支出设置')
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
                <FlatList extraData={this.state} numColumns={4} data={this.state.flag?this.state.inArr:this.state.outArr} renderItem={({item,index}) => 
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
            {/* <View>
            <FlatList extraData={this.state} keyExtractor={item => item.key} numColumns={4} data={this.state.outArr} renderItem={({item}) => 
            <View style={styles.view}>
                 <View style={item.iconFlag?styles.iconV1:styles.iconV}>
                    <Icon onPress={() => this.selectSortOut(item.key)} name={item.iconName} type="antdesign" size={34} color="gray"></Icon>
                </View>
                <Text style={styles.text}>{item.sort}</Text>
            </View>}/>
            <View style={styles.set}>
                <View style={styles.iconV}><Icon onPress={()=> this.setSort('out')} name="setting" type="antdesign" size={34} color="gray"></Icon>
                </View>
                <Text style={styles.text}>设置</Text>
            </View>
        </View> */}
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
    }
})

export default Tally;