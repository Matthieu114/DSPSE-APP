import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';

const Profile = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  return (
    <SafeAreaView>
      <Text>{user.email}</Text>
    </SafeAreaView>
  );
};

export default Profile;
