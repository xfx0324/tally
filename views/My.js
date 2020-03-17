import React from 'react';
import Ima from '../Ima';
import {Icon} from 'react-native-elements';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-community/async-storage'
import {View, Text, StyleSheet, Image, TouchableOpacity,Switch,ScrollView} from 'react-native';

class My extends React.Component{
    constructor(){
        super();
        this.state={
            name:"请点击头像登录",
            // url:require('../imgs/wei.png')
            index:1,
            flag:false,
            on1: false,
            on2: false,
        }
    } 
    //点击跳转登录页面
    goLogin = ()=>{
        if(this.state.name=='请点击头像登录'){
            this.props.navigation.navigate('login')
        }else{
            this.setState({flag:true},()=>{
                AsyncStorage.setItem('flag',this.state.flag)
            })
        }
    }
    //缓存读取登录名
    getName=async()=>{
        let nameN=await AsyncStorage.getItem('userName')
        let flagN=await AsyncStorage.getItem('flag')
        if(nameN){
            this.setState({name:nameN})
            this.setState({index:2})
            this.setState({flag:true})
        }
    }
    //退出登录，清除缓存
    exitLogin=()=>{
        AsyncStorage.removeItem('userName')
        // AsyncStorage.removeItem('inTallyS')
        this.setState({name:"请点击头像登录"})
        this.setState({index:1})
        this.setState({flag:false})
        // RNRestart.Restart();刷新整个app，跟重启一个效果
        // this.render()
        // this.props.navigation.navigate('login')
        //  console.log(12)
    }
    //声音开关
    handleSwitch1 = (value) => {
        this.setState({on1: value});
      }
      //明细详情开关
      handleSwitch2 = (value) => {
        this.setState({on2: value});
      }

    componentDidMount() {
        this.getName();
        console.log(this.state.flag)
      }
    render(){
        return (
        <View style={styles.bac}>
            <View style={styles.con}> 
                <TouchableOpacity onPress={this.goLogin}> 
                    <Text style={styles.out}>{this.state.flag?'已打卡':'打卡'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.goLogin}> 
                    <Image style={styles.image} source={Ima['url'+this.state.index]}/>
                </TouchableOpacity>
                <Text style={styles.userN}>{this.state.name}</Text>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <Text style={styles.cen}>0</Text>
                        <Text style={styles.cen}>已连续打卡</Text>
                    </View>
                    <View style={styles.col}>
                        <Text style={styles.cen}>0</Text>
                        <Text style={styles.cen}>已记录天数</Text>
                    </View>
                    <View style={styles.col}>
                    <Text style={styles.cen}>0</Text>
                    <Text style={styles.cen}>总笔数</Text>
                    </View>
                </View>
            </View>
            <ScrollView alwaysBounceVertical={true} style={styles.scroll}>
            <View>
                <View style={styles.row2}>
                    <Icon name="deleteuser" type="antdesign" color="#ffcc33" size={20}></Icon>
                    <Text style={styles.text} onPress={this.exitLogin}>退出登录</Text>
                </View>
                <View style={styles.row1}>
                    <Icon name="setting" type="antdesign" color="#ffcc33" size={20}></Icon>
                    <Text style={styles.text}>类别设置</Text>
                </View>
                <View style={styles.row1}>
                    <Icon name="clockcircleo" type="antdesign" color="#ffcc33" size={20}></Icon>
                    <Text style={styles.text1}>定时提醒</Text>
                </View>
                <View style={styles.row1}>
                    <Icon name="music" type="feather" color="#ffcc33" size={20}></Icon>
                    <Text style={styles.text1}>声音开关</Text>
                    <Switch value={this.state.on1} onValueChange={this.handleSwitch1} thumbColor="#e0e0eb" trackColor={{true: '#ffdb4d'}} tintColor="#e0e0eb"></Switch>
                </View>
                <View style={styles.row1}>
                    <Icon name="filetext1" type="antdesign" color="#ffcc33" size={20}></Icon>
                    <Text style={styles.text}>明细详情</Text>
                    <Switch value={this.state.on2} onValueChange={this.handleSwitch2} thumbColor="#e0e0eb" trackColor={{true: '#ffdb4d'}} tintColor="#e0e0eb" style={styles.swi}></Switch>
                </View>
                <View style={styles.row3}>
                    <Icon name="clouduploado" type="antdesign" color="#ffcc33" size={20}></Icon>
                    <Text style={styles.text1}>升级至专业版</Text>
                </View>
                <View style={styles.row1}>
                    <Icon name="smileo" type="antdesign" color="#ffcc33" size={20}></Icon>
                    <Text style={styles.text}>通讯电话</Text>
                </View>
                <View style={styles.row1}>
                    <Icon name="external-link" type="feather" color="#ffcc33" size={20}></Icon>
                    <Text style={styles.text}>推荐鲨鱼记账给好友</Text>
                </View>
            </View>
            </ScrollView>
        </View>
        
        )
    }
}

const styles = StyleSheet.create({
    bac:{
        backgroundColor:"#f0f0f5",
    },
    con: {
        fontSize: 20,
        backgroundColor:"#ffdb4d",
        height:249
    },
    out:{
        marginTop:15,
        marginLeft:363,
        textAlign: 'center',
        backgroundColor:'white',
        borderRadius:10,
        paddingTop:4,
        width:80,
        height:30,
        fontSize:16
    },
    image:{
        width:110,
        height:110,
        borderRadius:55,
        marginLeft:165
    },
    userN:{
        textAlign: 'center',
        fontSize:22
    },
    row:{
        flexDirection:'row',
        marginTop:15
    },
    scroll:{
        height:400
    },
    row1:{
        paddingTop:10,
        paddingLeft:15,
        flexDirection:'row',
        height:41,
        backgroundColor:'white'
    },
    row2:{
        paddingTop:10,
        paddingLeft:15,
        flexDirection:'row',
        height:41,
        marginTop:12,
        marginBottom:12,
        backgroundColor:"white"

    },
    row3:{
        paddingTop:10,
        paddingLeft:15,
        flexDirection:'row',
        height:41,
        marginTop:12,
        backgroundColor:'white'
    },
    text:{
        marginLeft:10
    },
    text1:{
        marginLeft:10,
        borderStyle:'solid',
        borderBottomWidth:1,
        borderColor:'#e0e0eb',
        width:330
    },
    swi:{
        marginLeft:273
    },
    col:{
        flexDirection:'column',
        flex:1,
        textAlign: 'center',
    },
    cen:{
        textAlign: 'center',
    }
})

export default My;