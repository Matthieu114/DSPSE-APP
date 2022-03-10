import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Homepage from '../screens/Home';
import Test from '../Test';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={Test} />
    </Stack.Navigator>
  );
}
