/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import {Icon} from 'react-native-elements';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import Login from './views/Login';
import Chart from './views/Chart';
import Detail from './views/Detail';
import Found from './views/Found';
import My from './views/My';
import Tally from './views/Tally';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// export default class App extends Component {

// }

// 定义路由配置对象，默认为第一个路由
const routes = {
  my: {
    // 渲染的屏幕
    screen: My,
    navigationOptions: {
      title: ''
    }
  },
  // 路由名称: {配置映射}
  login: {
    // 渲染的屏幕
    screen: Login,
    navigationOptions: {
      title: '登录'
    }
  }
}

// 参数1：必须的，路由配置对象，是从路由名称到路由配置的映射，它告诉导航器该路由呈现的内容。
// 参数2：可选的，路由选项配置对象
const stackNav = createStackNavigator(routes);

// 页面底部的标签栏，可让您在不同路由之间进行切换。 路由被懒加载 - 它们的屏幕组件只有在第一次获取焦点时才会被加载。
const bottomRoutes = {
  明细: {
    screen: Detail,
    navigationOptions: {
      tabBarIcon: ({tintColor})=>(<Icon name="redenvelopes" type="antdesign" color={tintColor}></Icon>),
      tabBarLabel: '明细'
    }
  },
  图表: {
    screen: Chart,
    navigationOptions: {
      tabBarIcon: ({tintColor})=>(<Icon name="linechart" type="antdesign" color={tintColor}></Icon>),
      tabBarLabel: '图表'
    }
  },
  记账: {
    screen: Tally,
    navigationOptions: {
      tabBarIcon: ({tintColor})=>(<Icon name="pluscircleo" type="antdesign" color={tintColor}></Icon>),
      tabBarLabel: '记账'
    }
  },
  发现: {
    screen: Found,
    navigationOptions: {
      tabBarIcon: ({tintColor})=>(<Icon name="find" type="antdesign" color={tintColor}></Icon>),
      tabBarLabel: '发现'
    }
  },
  我的: {
    // screen: My,
    screen: stackNav,
    navigationOptions: {
      tabBarIcon: ({tintColor})=>(<Icon name="user" type="antdesign" color={tintColor}></Icon>),
      tabBarLabel: '我的'
    }
  }
}
const bottomNav = createBottomTabNavigator(bottomRoutes, {
  tabBarOptions: {
    activeTintColor: '#ffcc00',
    labelStyle: {
      fontSize: 14
    }
  }
});

// 创建的导航必须包裹在 createAppContainer 中，将其作为项目的根组件
const App = createAppContainer(bottomNav);
export default App;
