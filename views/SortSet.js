import React from 'react';
import {Icon} from 'react-native-elements';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Swipeout from 'react-native-swipeout';

class SortSet extends React.Component{
    constructor(){
        super();
        this.state={
            flag:false,
            outArr:[
                {iconName:"phone",sort:"话费",iconFlag:false},
                {iconName:"book",sort:"学习",iconFlag:false},
                {iconName:"team",sort:"聚餐",iconFlag:false},
                {iconName:"car",sort:"加油费",iconFlag:false},
                {iconName:"rest",sort:"饮料",iconFlag:false},
                {iconName:"bank",sort:"房租",iconFlag:false},
                {iconName:"apple-o",sort:"水果",iconFlag:false},
                {iconName:"gift",sort:"礼物",iconFlag:false},
                {iconName:"medicinebox",sort:"医疗",iconFlag:false},
                {iconName:"customerservice",sort:"音乐",iconFlag:false},
                {iconName:"contacts",sort:"人际",iconFlag:false},
                {iconName:"smileo",sort:"零食",iconFlag:false},
            ],
            inArr:[
                {iconName:"redenvelopes",sort:"工资",iconFlag:false},
                {iconName:"clockcircleo",sort:"兼职",iconFlag:false},
                {iconName:"bank",sort:"理财",iconFlag:false},
                {iconName:"creditcard",sort:"礼金",iconFlag:false},
                {iconName:"pay-circle-o1",sort:"其他",iconFlag:false},
            ],
        }
    }
    //根据路由参数判断是支出设置跳转还是收入设置跳转
    getFlag=()=>{
        let a=this.props.navigation.state.params.clickSort
        this.setState({flag:a})
        console.log(a)
    }
    //支出view
    outMoney=()=>{
        this.setState({flag:false})
        console.log("支出1")
    }
    //收入view
    inMoney=()=>{
        this.setState({flag:true})
        console.log("收入1")
    }
  //删除
    dele=(index)=>{
        if(this.state.flag){
            let deleInArr=this.state.inArr
            deleInArr.splice(index,1)
            this.setState({inArr:deleInArr})
        }else{
            let deleOutArr=this.state.outArr
            deleOutArr.splice(index,1)
            this.setState({outArr:deleOutArr})
        }
    }
    //去添加 收入／支出 类别
    goAdd=(sort)=>{
        this.props.navigation.navigate('sortAdd',{clickSort:sort})
    }
    componentDidMount() {
        this.getFlag();
      }
    render(){
        // let swipeoutBtns = [{
        //       text: '删除',
        //       type: 'delete',
        //       onPress: () => {
        //         console.log('删除',a,b,c);
        //       }}];
        return(
            <View>
                <View style={styles.head}>
                    <Text style={this.state.flag?styles.text1:styles.text2} onPress={this.outMoney}>支出</Text>
                    <Text style={this.state.flag?styles.text4:styles.text3} onPress={this.inMoney}>收入</Text>
                </View>
                    <View style={styles.view1}>
                        <FlatList extraData={this.state} ItemSeparatorComponent={() => <View style={{height:1,backgroundColor: '#f0f0f5'}}/>} data={this.state.flag?this.state.inArr:this.state.outArr} renderItem={({item,index}) =>
                            <Swipeout autoClose={true} right={[{ text: '删除',type: 'delete',onPress:()=>this.dele(index)}]}>
                            <View style={styles.view2}>
                                <Icon name="minuscircle" type="antdesign" size={18} color="red"></Icon>
                                <View style={styles.view3}>
                                    <Icon name={item.iconName} type="antdesign" size={18} color="gray"></Icon>
                                </View>
                                <Text style={styles.text5}>{item.sort}</Text>
                                <Icon name="menu" type="feather" size={18} color="gray"></Icon>
                            </View>
                            </Swipeout>
                        }/>
                    </View>
                    <View style={styles.view4}>
                        <Text onPress={()=>this.goAdd(this.state.flag)}>+添加类别</Text>
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
        paddingLeft:76
    },
    text1:{
        height:30,
        width:150,
        paddingTop:5,
        textAlign:'center',
        color:'black',
        borderColor:'black',
        borderWidth:1,
        borderTopLeftRadius:8,
        borderBottomLeftRadius:8
    },
    text2:{
        height:30,
        width:150,
        paddingTop:5,
        textAlign:'center',
        color:'#ffdb4d',
        backgroundColor:'black',
        borderColor:'black',
        borderWidth:1,
        borderTopLeftRadius:8,
        borderBottomLeftRadius:8
    },
    text3:{
        height:30,
        width:150,
        paddingTop:5,
        textAlign:'center',
        color:'black',
        borderColor:'black',
        borderWidth:1,
        borderTopRightRadius:8,
        borderBottomRightRadius:8
    },
    text4:{
        height:30,
        width:150,
        paddingTop:5,
        textAlign:'center',
        color:'#ffdb4d',
        backgroundColor:'black',
        borderColor:'black',
        borderWidth:1,
        borderTopRightRadius:8,
        borderBottomRightRadius:8
    },
    view1:{
       backgroundColor:'#f0f0f5',
       paddingTop:10
    },
    view2:{
        flexDirection:'row',
        backgroundColor:'white',
        height:40,
        paddingLeft:15,
        paddingTop:10
    },
    view3:{
        backgroundColor:'#f0f0f5',
        width:24,
        height:24,
        paddingTop:3,
        borderRadius:12,
        marginRight:15,
        marginLeft:15
    },
    text5:{
        width:50,
        marginRight:270
    },
    view4:{
        backgroundColor:'#f0f0f5',
        height:30,
        paddingTop:4,
        paddingLeft:200
    }
})

// https://www.jianshu.com/p/a6a509afb5ce

export default SortSet;