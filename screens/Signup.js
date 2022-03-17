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
  KeyboardAvoidingView,
  SafeAreaView,
  Keyboard
} from 'react-native';
import { CustomText } from '../Components/CustomText';
import colors from '../config/colors';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const HERO_SECTION_HEIGHT = Dimensions.get('screen').height - 415;

export const HeroSection = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.heroSection}>
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
    </SafeAreaView>
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

  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();

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
      // setError('something went wrong , try again! ');
      setError(e.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior='position'>
        <View style={styles.box}>
          <HeroSection />

          <View style={styles.loginContainer}>
            <TextInput
              style={styles.loginTextInput}
              blurOnSubmit
              placeholder='Full Name'
              onChangeText={(text) => setFullName(text)}
              onSubmitEditing={() => {
                ref_input2.current.focus();
              }}
            />
            <TextInput
              style={styles.loginTextInput}
              blurOnSubmit
              placeholder='Email address'
              onChangeText={(text) => setEmail(text)}
              onSubmitEditing={() => {
                ref_input3.current.focus();
              }}
              ref={ref_input2}
            />
            <View style={{ position: 'relative' }}>
              <TextInput
                style={styles.loginTextInput}
                blurOnSubmit
                placeholder='Password'
                selectionColor={colors.grey}
                secureTextEntry={showPassword}
                onChangeText={(text) => setPassword(text)}
                onSubmitEditing={() => {
                  ref_input4.current.focus();
                }}
                ref={ref_input3}
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
                ref={ref_input4}
              />
              <TouchableOpacity
                style={{ position: 'absolute', right: 5, top: 25 }}
                onPress={toggleShowPassword}>
                <Text style={{ fontWeight: '500' }}>Eye</Text>
              </TouchableOpacity>
            </View>

            <View>
              {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
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
            <CustomText color={colors.grey}>
              Already have an account?
            </CustomText>
            <TouchableOpacity
              style={styles.linkContainer}
              onPress={() => navigation.navigate('Login')}>
              <CustomText
                color={colors.primary}
                fontSize={15}
                fontWeight={'500'}>
                Log in
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
    backgroundColor: colors.primaryPalette[100]
  },
  undrawLogoContainer: {
    alignItems: 'center',
    zIndex: 100,
    marginTop: 50
  },
  globeLogo: {
    width: 290,
    height: 207
  },
  logoContainer: {
    alignItems: 'center'
  },
  logo: {
    height: 84,
    width: 95
  },
  loginContainer: {
    marginTop: 5,
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
  errorMessage: {
    color: 'red',
    paddingTop: 10,
    marginBottom: -10
  },
  linkContainer: {
    paddingHorizontal: 10
  }
});

export default Signup;
