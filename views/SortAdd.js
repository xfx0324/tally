import React from 'react';
import {Icon} from 'react-native-elements';
import {View, Text, StyleSheet, FlatList,TextInput, SectionList,AsyncStorage} from 'react-native';

class SortAdd extends React.Component{
    constructor(){
        super();
        this.state={
            flag:false,
            icon1:'verticleleft',
            text:'',
            arr:[
                {title:'娱乐',key:0,data:[[
                    {iconName:"verticleleft",iconFlag:true},
                    {iconName:"verticleright",iconFlag:false},
                    {iconName:"team",iconFlag:false},
                    {iconName:"meh",iconFlag:false},
                    {iconName:"staro",iconFlag:false},
                    {iconName:"home",iconFlag:false},
                    {iconName:"plussquareo",iconFlag:false},
                    {iconName:"clockcircleo",iconFlag:false},
                    {iconName:"dribbble",iconFlag:false},
                ]]},
                {title:'饮食',key:1,data:[[
                    {iconName:"link",iconFlag:false},
                    {iconName:"cloudo",iconFlag:false},
                    {iconName:"clouddownloado",iconFlag:false},
                    {iconName:"hdd",iconFlag:false},
                    {iconName:"smileo",iconFlag:false},
                    {iconName:"hearto",iconFlag:false},
                    {iconName:"enviromento",iconFlag:false}
                ]]},
                {title:'医疗',key:2,data:[[
                    {iconName:"pushpino",iconFlag:false},
                    {iconName:"sharealt",iconFlag:false},
                    {iconName:"medicinebox",iconFlag:false}
                ]]},
                {title:'学习',key:3,data:[[
                    {iconName:"profile",iconFlag:false},
                    {iconName:"switcher",iconFlag:false},
                    {iconName:"like2",iconFlag:false}
                ]]},
                {title:'交通',key:4,data:[[
                    {iconName:"car",iconFlag:false},
                    {iconName:"notification",iconFlag:false}
                ]]},
                {title:'购物',key:5,data:[[
                    {iconName:"shoppingcart",iconFlag:false},
                    {iconName:"save",iconFlag:false},
                    {iconName:"inbox",iconFlag:false},
                    {iconName:"windowso",iconFlag:false},
                ]]},
                {title:'生活',key:6,data:[[
                    {iconName:"calendar",iconFlag:false},
                    {iconName:"isv",iconFlag:false},
                    {iconName:"tool",iconFlag:false}
                ]]},
                {title:'家居',key:7,data:[[
                    {iconName:"tablet1",iconFlag:false},
                    {iconName:"key",iconFlag:false}
                ]]},
                {title:'家庭',key:8,data:[[
                    {iconName:"picture",iconFlag:false}
                ]]},
                {title:'健身',key:9,data:[[
                    {iconName:"totop",iconFlag:false},
                    {iconName:"android",iconFlag:false},
                ]]},
                {title:'收入',key:10,data:[[
                    {iconName:"shrink",iconFlag:false},
                    {iconName:"codesquareo",iconFlag:false},
                    {iconName:"swap",iconFlag:false},
                    {iconName:"lock",iconFlag:false},
                ]]},
                {title:'其它',key:11,data:[[
                    {iconName:"calculator",iconFlag:false},
                    {iconName:"barchart",iconFlag:false},
                    {iconName:"disconnect",iconFlag:false},
                    {iconName:"printer",iconFlag:false},
                    {iconName:"bulb1",iconFlag:false},
                    {iconName:"message1",iconFlag:false},
                    {iconName:"wifi",iconFlag:false}
                ]]},
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
     //完成
    finish1=async()=>{
        let inArrN=JSON.parse(await AsyncStorage.getItem('inArrS'))
        let outArrN=JSON.parse(await AsyncStorage.getItem('outArrS'))
        if(this.state.text!=''){
            if(this.state.flag){
                inArrN.push({iconName:this.state.icon1,sort:this.state.text,iconFlag:false})
                AsyncStorage.setItem('inArrS',JSON.stringify(inArrN))
            }else{
                outArrN.push({iconName:this.state.icon1,sort:this.state.text,iconFlag:false})
                AsyncStorage.setItem('outArrS',JSON.stringify(outArrN))
            }
            this.props.navigation.goBack()
        }else{
            alert('请填写类别')
        }
        
    }
    //输入框的值
    handleChange = (value)=>{
        this.setState({ text: value})
    }
     //点击类别
     clickSort=(index1,section)=>{
        let clickArr=this.state.arr
        for(let i=0;i<clickArr.length;i++){
            for(let j=0;j<clickArr[i].data[0].length;j++){
                clickArr[i].data[0][j].iconFlag=false
            }
        }
        clickArr[section.key].data[0][index1].iconFlag=true
        this.setState({icon1:clickArr[section.key].data[0][index1].iconName})
        this.setState({arr:clickArr})
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
                    <Text onPress={this.finish1}>完成</Text>
                </View>
                <View style={styles.view1}>
                    <View style={styles.icon}>
                        <Icon name={this.state.icon1} type="antdesign" size={24} color="gray"></Icon>
                    </View>
                    <TextInput maxLength={3} clearTextOnFocus={true} style={styles.input} placeholder='请输入类别名称(不超过3个字)' placeholderTextColor='#cccccc' onChangeText={this.handleChange} value={this.state.text}></TextInput>
                </View>
                <View style={styles.vie}>
                    <SectionList keyExtractor={(item,index) => index} sections={this.state.arr} renderItem={({item,index,section})=>
                        <View style={styles.view2}>
                            {item.map((item,index1)=>(
                                <View style={item.iconFlag?styles.view4:styles.view3}>
                                    <Icon onPress={() => this.clickSort(index1,section)} name={item.iconName} type="antdesign" size={30} color="gray"></Icon>
                                </View>
                            ))}
                        </View>
                    }
                    renderSectionHeader={({section})=>
                        <Text style={styles.text2}>{section.title}</Text>
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
    icon:{
        width:40,
        height:40,
        backgroundColor:"#ffdb4d",
        borderRadius:20,
        paddingTop:8,
        marginRight:15,
        marginLeft:20,
        marginTop:7,
        marginBottom:7
    },
    input:{
        color:'gray',
        marginLeft:20,
    },
    vie:{
        marginBottom:230
    },
    view2:{
        flexDirection:'row',
        flexWrap: 'wrap',
        paddingLeft:25
    },
    view3:{
        width:56,
        height:56,
        backgroundColor:"#f2f2f2",
        borderRadius:28,
        paddingTop:12,
        marginRight:26,
        marginTop:15
    },
    view4:{
        width:56,
        height:56,
        backgroundColor:"#ffdb4d",
        borderRadius:28,
        paddingTop:12,
        marginRight:26,
        marginTop:15
    },
    text2:{
        textAlign:"center",
        marginTop:20,
        fontSize:16
    }
})
// contentContainerStyle={styles.list}
export default SortAdd;