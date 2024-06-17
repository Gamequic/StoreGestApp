import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DashboardScreen from './../screens/Dashboard';
import FoodScreen from './../screens/Food';

import OrdersScreen from './../screens/Orders';
import OrdersRecord from './../screens/Orders/Record';
import OrdersCreate from './../screens/Orders/Create';
import OrdersUpdate from './../screens/Orders/Update';

import MoneyScreen from './../screens/Money';
import MoneyRecord from './../screens/Money/Record';
import MoneyCreate from '../screens/Money/Create';
import MoneyUpdate from '../screens/Money/Update';

import ThemeContext from './../ThemeContext';
import LANG from './../../lang';

const NavTab = createBottomTabNavigator();
const MoneyStack = createStackNavigator();
const OrdersStack = createStackNavigator();

function MoneyStackScreen() {
  return (
    <MoneyStack.Navigator
      initialRouteName="Money"
      screenOptions={{
        headerShown: false,
      }}
    >
      <MoneyStack.Screen name="Money" component={MoneyScreen} />
      <MoneyStack.Screen name="MoneyRecord" component={MoneyRecord} />
      <MoneyStack.Screen name='MoneyCreate' component={MoneyCreate} />
      <MoneyStack.Screen name='MoneyUpdate' component={MoneyUpdate} />
    </MoneyStack.Navigator>
  );
}

function OrderStackScreen() {
  return (
    <OrdersStack.Navigator
      initialRouteName="Orders"
      screenOptions={{
        headerShown: false,
      }}
    >
      <OrdersStack.Screen name="Orders" component={OrdersScreen} />
      <OrdersStack.Screen name="OrdersRecord" component={OrdersRecord} />
      <OrdersStack.Screen name='OrdersCreate' component={OrdersCreate} />
      {/* <OrdersStack.Screen name='OrdersUpdate' component={OrdersUpdate} /> */}
    </OrdersStack.Navigator>
  );
}

function TabNavigator() {
  const { currentLang } = useContext(ThemeContext);

  return (
    <NavTab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <NavTab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: LANG[currentLang].Dashboard,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard" color={color} size={size} />
          ),
        }}
      />
      <NavTab.Screen
        name="Food"
        component={FoodScreen}
        options={{
          tabBarLabel: LANG[currentLang].Meal,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="food-hot-dog" color={color} size={size} />
          ),
        }}
      />
      <NavTab.Screen
        name="OrdersStack"
        component={OrderStackScreen}
        options={{
          tabBarLabel: LANG[currentLang].Orders,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />
          ),
        }}
      />
      <NavTab.Screen
        name="MoneyStack"
        component={MoneyStackScreen}
        options={{
          tabBarLabel: LANG[currentLang].Money,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cash-multiple" color={color} size={size} />
          ),
        }}
      />
    </NavTab.Navigator>
  );
}

export { TabNavigator };
