import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from 'react-native';
import { CustomText } from '../config/CustomText';
import colors from '../config/colors';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const HERO_SECTION_HEIGHT = Dimensions.get('screen').height - 415;

export const HeroSection = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.heroSection}>
      <View style={styles.logoContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('Landing');
          }}>
          <Image
            source={require('../assets/LogoBlack.png')}
            style={styles.logo}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.undrawLogoContainer}>
        <Image
          source={require('../assets/Undraw1.png')}
          style={styles.globeLogo}
        />
      </View>
    </View>
  );
};

const Signup = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const navigation = useNavigation();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const HandleSignup = async (e) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (e) {
      console.log(e);
      setError('something went wrong , try again! ');
    }
  };

  return (
    <KeyboardAvoidingView behavior='padding'>
      <View style={styles.box}>
        <HeroSection />

        <View style={styles.loginContainer} behavior='padding'>
          <TextInput
            style={styles.loginTextInput}
            blurOnSubmit
            placeholder='Full Name'
            onChangeText={(text) => setFullName(text)}
          />
          <TextInput
            style={styles.loginTextInput}
            blurOnSubmit
            placeholder='Email address'
            onChangeText={(text) => setEmail(text)}
          />
          <View style={{ position: 'relative' }}>
            <TextInput
              style={styles.loginTextInput}
              blurOnSubmit
              placeholder='Password'
              selectionColor={colors.grey}
              secureTextEntry={showPassword}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              style={{ position: 'absolute', right: 5, top: 25 }}
              onPress={toggleShowPassword}>
              <Text> Eye</Text>
            </TouchableOpacity>
          </View>
          <View style={{ position: 'relative' }}>
            <TextInput
              style={styles.loginTextInput}
              blurOnSubmit
              placeholder='Confirm Password'
              selectionColor={colors.grey}
              secureTextEntry={showPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
            <TouchableOpacity
              style={{ position: 'absolute', right: 5, top: 25 }}
              onPress={toggleShowPassword}>
              <Text style={{ fontWeight: '500' }}>Eye</Text>
            </TouchableOpacity>
          </View>

          <View>
            {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={(e) => HandleSignup(e)}>
            <CustomText color={colors.white} fontSize={18} fontWeight={'500'}>
              Sign Up
            </CustomText>
          </TouchableOpacity>
        </View>

        <View style={styles.createAccountContainer}>
          <CustomText color={colors.grey}>Already have an account?</CustomText>
          <TouchableOpacity
            style={styles.linkContainer}
            onPress={() => navigation.navigate('Login')}>
            <CustomText color={colors.primary} fontSize={15} fontWeight={'500'}>
              Log in
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  box: {
    position: 'relative',
    width: Dimensions.get('screen').width
  },
  heroSection: {
    position: 'relative',
    width: SCREEN_WIDTH,
    height: HERO_SECTION_HEIGHT,
    backgroundColor: colors.primaryPalette[100]
  },
  undrawLogoContainer: {
    position: 'absolute',
    zIndex: 100,
    left: SCREEN_WIDTH / 2,
    transform: [{ translateX: '-150%' }],
    top: 200
  },
  globeLogo: {
    width: 290,
    height: 207
  },

  logoContainer: {
    position: 'absolute',
    zIndex: 100,
    left: SCREEN_WIDTH / 2,
    transform: [{ translateX: '-50%' }],
    top: 40
  },
  logo: {
    height: 84,
    width: 95
  },
  loginContainer: {
    marginTop: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginTextInput: {
    color: colors.grey,
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    marginVertical: 10,
    width: 350,
    padding: 13,
    borderRadius: 5
  },

  loginButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginTop: 30,
    width: 350,
    paddingVertical: 14,
    borderRadius: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4
  },
  createAccountContainer: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  linkContainer: {
    paddingHorizontal: 10
  }
});

export default Signup;
