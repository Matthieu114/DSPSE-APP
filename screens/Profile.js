import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { auth } from '../firebase';
import { signOut, sendPasswordResetEmail } from 'firebase/auth';
import { CustomText } from '../Components/CustomText';
import colors from '../config/colors';
import { Avatar } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';

const Profile = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [resetPasswordMessage, setResetPasswordMessage] = useState('');

  const handleSignout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.log(e);
    }
  };

  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, user.email);
      setResetPasswordMessage(
        'A password request has been sent to your email!'
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <View style={{ alignItems: 'center' }}>
        <CustomText fontSize={20} fontWeight='500'>
          Your profile
        </CustomText>
      </View>

      <View style={styles.userInformationBox}>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 20,
            paddingLeft: 20,
            paddingRight: 20
          }}>
          <TouchableOpacity>
            <Avatar
              size={64}
              rounded
              icon={{
                name: 'picture',
                color: colors.blue200
              }}
              title={user?.email?.charAt(0).toUpperCase()}
              titleStyle={{ color: colors.blue200 }}
              containerStyle={{
                borderColor: colors.lightGrey,
                borderStyle: 'solid',
                borderWidth: 1
              }}
            />
          </TouchableOpacity>
          <View style={{ marginLeft: 20, flexDirection: 'row' }}>
            <CustomText fontSize={18} fontWeight='400'>
              {user.email}
            </CustomText>
            <TouchableOpacity>
              <AntDesign
                name='edit'
                size={20}
                color={colors.blue200}
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={handleSignout}
          style={{ alignItems: 'center', marginBottom: 20 }}>
          <CustomText fontSize={18} fontWeight='400' color={colors.blue200}>
            Logout
          </CustomText>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 30 }}>
        <TouchableOpacity
          style={styles.profileOptionsBorder}
          onPress={resetPassword}>
          <CustomText fontSize={18} fontWeight='400'>
            Reset Password
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileOptionsBorder}>
          <CustomText fontSize={18} fontWeight='400'>
            My Equipment
          </CustomText>
          <AntDesign
            name='right'
            size={20}
            color={colors.lightGrey}
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
        <View style={{ marginLeft: 10, marginTop: 10 }}>
          <CustomText color='red' fontSize={18}>
            {resetPasswordMessage}
          </CustomText>
        </View>

        <View
          style={{
            backgroundColor: colors.palette[100],
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            marginTop: 30,
            marginBottom: 30
          }}>
          <Image
            source={require('../assets/LogoWhite.png')}
            style={{ height: 80, width: 80, marginLeft: 20 }}></Image>
          <View style={{ marginLeft: 50 }}>
            <CustomText color={colors.white} fontWeight='400' fontSize={18}>
              Do you enjoy DSPSE?
            </CustomText>
            <CustomText color={colors.white} fontWeight='400' fontSize={18}>
              Rate us on the app store!
            </CustomText>
          </View>
        </View>

        <TouchableOpacity style={styles.profileOptionsBorder}>
          <CustomText fontSize={18} fontWeight='400' color={colors}>
            About us
          </CustomText>
          <AntDesign
            name='right'
            size={20}
            color={colors.lightGrey}
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileOptionsBorder}>
          <CustomText fontSize={18} fontWeight='400' color={colors}>
            Terms of use
          </CustomText>
          <AntDesign
            name='right'
            size={20}
            color={colors.lightGrey}
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1
  },

  userInformationBox: {
    borderColor: colors.lightestGrey,
    borderTopWidth: 1,
    marginTop: 40
  },

  profileOptionsBorder: {
    borderColor: colors.lightestGrey,
    borderWidth: 1,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default Profile;
