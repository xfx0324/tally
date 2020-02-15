import React from 'react';
import {Icon} from 'react-native-elements';
import {View, Text, StyleSheet, FlatList,TextInput, SectionList} from 'react-native';

class SortAdd extends React.Component{
    constructor(){
        super();
        this.state={
            flag:false,
            arr:[
                {title:'娱乐',key:'娱乐',data:[
                    {iconName:"verticleleft",iconFlag:false},
                    {iconName:"verticleright",iconFlag:false},
                    {iconName:"team",iconFlag:false},
                    {iconName:"meh",iconFlag:false},
                    {iconName:"staro",iconFlag:false},
                    {iconName:"home",iconFlag:false},
                    {iconName:"plussquareo",iconFlag:false},
                    {iconName:"clockcircleo",iconFlag:false},
                    {iconName:"dribbble",iconFlag:false},
                ]},
                {title:'饮食',key:'饮食',data:[
                    {iconName:"link",iconFlag:false},
                    {iconName:"cloudo",iconFlag:false},
                    {iconName:"clouddownloado",iconFlag:false},
                    {iconName:"hdd",iconFlag:false},
                    {iconName:"smileo",iconFlag:false},
                    {iconName:"hearto",iconFlag:false},
                    {iconName:"enviromento",iconFlag:false}
                ]},
                {title:'医疗',key:'医疗',data:[
                    {iconName:"pushpino",iconFlag:false},
                    {iconName:"sharealt",iconFlag:false},
                    {iconName:"medicinebox",iconFlag:false}
                ]},
                {title:'学习',key:'学习',data:[
                    {iconName:"profile",iconFlag:false},
                    {iconName:"switcher",iconFlag:false},
                    {iconName:"like2",iconFlag:false}
                ]},
                {title:'交通',key:'交通',data:[
                    {iconName:"car",iconFlag:false},
                    {iconName:"notification",iconFlag:false}
                ]},
                {title:'购物',key:'购物',data:[
                    {iconName:"shoppingcart",iconFlag:false},
                    {iconName:"save",iconFlag:false},
                    {iconName:"inbox",iconFlag:false},
                    {iconName:"windowso",iconFlag:false},
                ]},
                {title:'生活',key:'生活',data:[
                    {iconName:"calendar",iconFlag:false},
                    {iconName:"isv",iconFlag:false},
                    {iconName:"tool",iconFlag:false}
                ]},
                {title:'家居',key:'家居',data:[
                    {iconName:"tablet1",iconFlag:false},
                    {iconName:"key",iconFlag:false}
                ]},
                {title:'家庭',key:'家庭',data:[
                    {iconName:"picture",iconFlag:false}
                ]},
                {title:'健身',key:'健身',data:[
                    {iconName:"totop",iconFlag:false},
                    {iconName:"android",iconFlag:false},
                ]},
                {title:'收入',key:'收入',data:[
                    {iconName:"shrink",iconFlag:false},
                    {iconName:"codesquareo",iconFlag:false},
                    {iconName:"swap",iconFlag:false},
                    {iconName:"lock",iconFlag:false},
                ]},
                {title:'其它',key:'其它',data:[
                    {iconName:"calculator",iconFlag:false},
                    {iconName:"barchart",iconFlag:false},
                    {iconName:"disconnect",iconFlag:false},
                    {iconName:"printer",iconFlag:false},
                    {iconName:"bulb1",iconFlag:false},
                    {iconName:"message1",iconFlag:false},
                    {iconName:"wifi",iconFlag:false}
                ]},
            ]
        }
    }
    //根据路由参数判断是支类别跳转还是收入类别跳转
    getFlag=()=>{
        let a=this.props.navigation.state.params.clickSort
        this.setState({flag:a})
        console.log(a)
    }
    //返回
    bac=()=>{
        this.props.navigation.goBack()
        console.log('fanhui')
    }
    componentDidMount() {
        this.getFlag();
      }

    render(){
        return(
            <View>
                <View style={styles.head}>
                    <Icon name="arrowleft" type="antdesign" onPress={this.bac}></Icon>
                    <Text style={styles.text1}>{this.state.flag?'添加收入类别':'添加支出类别'}</Text>
                    <Text>完成</Text>
                </View>
                <View style={styles.view1}>
                    <Icon></Icon>
                    <TextInput maxLength={3} clearTextOnFocus={true} style={styles.input} placeholder='请输入类别名称(不超过3个字)' placeholderTextColor='#cccccc'></TextInput>
                </View>
                <View>
                    <SectionList sections={this.state.arr} renderItem={({item,index})=>
                        <View>
                            <Icon name={item.iconName} type="antdesign" size={22} color="gray"></Icon>
                        </View>
                    }
                    renderSectionHeader={({section})=>
                        <Text>{section.title}</Text>
                    }
                    />
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
        paddingLeft:20
    },
    text1:{
        marginLeft:130,
        marginRight:140,
        fontSize:16
    },
    view1:{
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#cccccc'
    },
    input:{
        color:'gray',
        marginLeft:20,
    }
})
export default SortAdd;