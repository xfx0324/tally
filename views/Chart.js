import React from 'react';
import Echarts from 'native-echarts';
import {View, Text, StyleSheet} from 'react-native';

class Chart extends React.Component{
    render(){
        const option={
            title:{
                text:'Echarts demo'
            },
            tooltip:{

            },
            legend:{
                data:['销量']
            },
            xAxis:{
                data:['衬衫','羊毛衫','雪纺衫','裤子','高跟鞋']
            },
            yAxis:{},
            series:[{
                name:'',
                type:'bar',
                data:[5,20,36,10,10]
            }]
        }
        return (<View style={styles.con}>
            <Text>图表</Text>
            <Echarts option={option} height={300} />
        </View>)
    }
}
const styles = StyleSheet.create({
    con: {
        fontSize: 20
    }
})

export default Chart;