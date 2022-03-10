import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthenticatedUserProvider } from './navigation/AuthenticatedUserProvider';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Test from './Test';
import Homepage from './screens/Home';
import Signup from './screens/Signup';
import Login from './screens/Login';
import RootNavigator from './navigation/RootNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
    // <NavigationContainer>
    //   <Stack.Navigator
    //     screenOptions={{
    //       headerShown: false
    //     }}>
    //     <Stack.Screen name='Home' component={Homepage} />
    //     <Stack.Screen name='Login' component={Login} />
    //     <Stack.Screen name='Signup' component={Signup} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
