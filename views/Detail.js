import React from 'react';
import SplashScreen from 'react-native-splash-screen'
import {Icon} from 'react-native-elements';
import {View, Text, StyleSheet} from 'react-native';
import Picker from 'react-native-picker';
import Swipeout from 'react-native-swipeout';
class Detail extends React.Component{
    componentDidMount(){
        setTimeout(() => {
            SplashScreen.hide();
          },1200)
    }
    render(){
        return (
        <View>
            <View style={styles.view1}>
                <View style={styles.view2}>
                    <Text style={styles.title}>鲨鱼记账</Text>
                    <View style={styles.icon}>
                    <Icon name="search1" type="antdesign" size={20}></Icon>
                    </View>
                    <Icon name="calendar" type="antdesign" size={20}></Icon>
                </View>
                <View style={styles.row}>
                    <Text style={styles.cen}>2020</Text>
                    <Text style={styles.cen}>收入</Text>
                    <Text style={styles.cen}>支出</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.cen}>02月</Text>
                    <Text style={styles.cen}>20.00</Text>
                    <Text style={styles.cen}>10.00</Text>
                </View>     
            </View>
            <View>
                <Text>明细1</Text>
            </View>
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
    }
})

export default Detail;