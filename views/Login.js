import React from 'react';

import {View, TextInput, Button,Text, TouchableOpacity} from 'react-native';

class Login extends React.Component{

    // goRegiste = ()=>{
    //     console.log(this.props.navigation);
    //     // 跳转到指定名称的路由
    //     this.props.navigation.navigate('reg');
    // }

    render(){
        return (<View>
            <TextInput placeholder="账号"></TextInput>
            <TextInput placeholder="密码" secureTextEntry></TextInput>
            <Button title="登录"></Button>
        </View>)
    }
}

export default Login;