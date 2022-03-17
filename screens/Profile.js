import { View, Text, Button } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Profile = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);

  const handleSignout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView>
      <Text>{user.email}</Text>
      <Button title='logout' onPress={handleSignout}></Button>
    </SafeAreaView>
  );
};

export default Profile;
