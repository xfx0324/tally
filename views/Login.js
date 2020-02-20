import React from 'react';

import {View, TextInput, Button,Text,StyleSheet, TouchableOpacity, AsyncStorage} from 'react-native';

class Login extends React.Component{
    constructor(){
        super();
        this.state = {
          text: '',
          password:'',
          show:false,
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
    goMy = ()=>{
        // 跳转到指定名称的路由
        if(this.state.text=='123'&&this.state.password=='123'){
          // this.props.navigation.state.params.refresh();
            this.props.navigation.navigate('my');
            AsyncStorage.setItem('userName',this.state.text)
            // AsyncStorage.setItem('outArrS',JSON.stringify(this.state.outArr))
            // AsyncStorage.setItem('inArrS',JSON.stringify(this.state.inArr))
        }
        else{
          this.setState({ show: true})
        }
        // console.log(123,this.state.text,this.state.password)
    }
    handleChange = (value)=>{
        // console.log('输入的值为：', value);
        this.setState({ text: value})
            // AsyncStorage.setItem('userName',this.state.text)
            // console.log(111,this.state.text)
        // AsyncStorage.getItem('userName').then((res)=>{
        //     console.log(222,res)
        // })
        
      }
      changePas=(value)=>{
        this.setState({password:value})
      }
    render(){
        return (<View>
            <TextInput placeholder="请输入账号" onChangeText={this.handleChange} value={this.state.text}></TextInput>
            <TextInput placeholder="请输入密码" secureTextEntry onChangeText={this.changePas} value={this.state.password}></TextInput>
            <TouchableOpacity onPress={this.goMy}>
            {/* <Button title="登录" onPress={this.goMy}></Button> */}
                <Text>登录</Text>
            </TouchableOpacity>
        <Text style={styles.text}>{this.state.show?"账号或密码输入错误":""}</Text>
        </View>)
    }
}
const styles = StyleSheet.create({
  text:{
    color:"red"
  }
})
export default Login;