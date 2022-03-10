import { View, Text, SafeAreaView, TouchableHighlight } from 'react-native';
import React, { useContext } from 'react';
import { AuthenticatedUserContext } from './navigation/AuthenticatedUserProvider';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

export default function Test() {
  const { user, setUser } = useContext(AuthenticatedUserContext);

  const handleSignout = async () => {
    await signOut(auth);
    try {
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView>
      <TouchableHighlight
        onPress={() => {
          console.log(user);
        }}>
        <Text>{user.email}</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={handleSignout}>
        <Text>logout</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
}
