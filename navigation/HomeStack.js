import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Homepage from '../screens/Homepage';
import FooterNavbar from '../Components/FooterTabNavigator';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={Homepage} />
    </Stack.Navigator>
  );
}
