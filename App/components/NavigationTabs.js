import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DashboardScreen from './../screens/Dashboard';
import FoodScreen from './../screens/Food';
import OrdersScreen from './../screens/Orders';
import MoneyScreen from './../screens/Money';

const NavTab = createBottomTabNavigator();

function TabNavigator() {
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
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard" color={color} size={size} />
          ),
        }}
      />
      <NavTab.Screen
        name="Comida"
        component={FoodScreen}
        options={{
          tabBarLabel: 'Comida',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="food-hot-dog" color={color} size={size} />
          ),
        }}
      />
      <NavTab.Screen
        name="Ordenes"
        component={OrdersScreen}
        options={{
          tabBarLabel: 'Ordenes',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />
          ),
        }}
      />
      <NavTab.Screen
        name="Dinero"
        component={MoneyScreen}
        options={{
          tabBarLabel: 'Dinero',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cash-multiple" color={color} size={size} />
          ),
        }}
      />
    </NavTab.Navigator>
  );
}

export { TabNavigator };
