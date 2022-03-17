import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import Homepage from '../screens/Homepage';
import Weather from '../screens/Weather';
import Profile from '../screens/Profile';
import Statistics from '../screens/Statistics';
import Journal from '../screens/Journal';

import colors from '../config/colors';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.blue400,
        tabBarInactiveTintColor: colors.grey
      }}>
      <Tab.Screen
        name='Journal'
        component={Journal}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name='tasks' size={20} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Statistics'
        component={Statistics}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name='chart-bar' size={20} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Homepage'
        component={Homepage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name='record-vinyl' size={20} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Weather'
        component={Weather}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name='cloud-sun' size={20} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='user-circle' size={20} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}
