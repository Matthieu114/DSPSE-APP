import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Modal
} from 'react-native';
import { CustomText } from '../Components/CustomText';
import { signInWithEmailAndPassword } from 'firebase/auth';
import colors from '../config/colors';
import { auth } from '../firebase';
import { AntDesign } from '@expo/vector-icons';
import { sendPasswordResetEmail } from 'firebase/auth';

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
          source={require('../assets/UndrawGlobe.png')}
          style={styles.globeLogo}
        />
      </View>
    </SafeAreaView>
  );
};

const Login = () => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [resetPasswordMessage, setResetPasswordMessage] = useState('');

  const navigation = useNavigation();

  const nextInput2 = useRef();

  const handleLogin = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredentials.user);
    } catch (e) {
      console.log(e);
      setError('Incorrect username or password');
    }
  };

  const showPasswordModal = () => {
    setModalVisible(true);
  };

  const hidePasswordModal = () => {
    setModalVisible(false);
  };

  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setResetPasswordMessage(
        'A password request has been sent to your email!'
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior='position'>
        <HeroSection />

        <View style={styles.box}>
          <View style={styles.authContainer}>
            <CustomText color={colors.grey}>
              Log-in with social account
            </CustomText>
            <View style={styles.authIconsOuterContainer}>
              <TouchableOpacity style={styles.authIconsContainer}>
                <Image
                  source={require('../assets/google.png')}
                  style={styles.authIcons}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.authIconsContainer}>
                <Image
                  source={require('../assets/facebook.png')}
                  style={styles.authIcons}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.authIconsContainer}>
                <Image
                  source={require('../assets/apple.png')}
                  style={styles.authIcons}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.loginContainer}>
            <TextInput
              style={styles.loginTextInput}
              blurOnSubmit
              placeholder='Email address'
              onChangeText={(text) => setEmail(text)}
              onSubmitEditing={() => {
                nextInput2.current.focus();
              }}
            />
            <View style={{ position: 'relative' }}>
              <TextInput
                style={styles.loginTextInput}
                blurOnSubmit
                clearTextOnFocus
                placeholder='Password'
                selectionColor={colors.grey}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                ref={nextInput2}
              />
              <TouchableOpacity
                style={{ position: 'absolute', right: 5, top: 25 }}
                onPress={showPasswordModal}>
                <Text style={{ fontWeight: '500' }}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.errorMessageBox}>
              {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
            </View>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => handleLogin()}>
              <CustomText color={colors.white} fontSize={18} fontWeight={'500'}>
                Log In
              </CustomText>
            </TouchableOpacity>
          </View>

          <Modal animationType='slide' visible={modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <AntDesign
                  name='close'
                  size={24}
                  color='black'
                  style={{ position: 'absolute', right: 30, top: 30 }}
                  onPress={hidePasswordModal}
                />
                <Text style={styles.modalText}>Reset your password</Text>
                <TextInput
                  style={styles.loginTextInput}
                  blurOnSubmit
                  clearTextOnFocus
                  placeholder='Email'
                  selectionColor={colors.grey}
                  secureTextEntry={true}
                  onChangeText={(text) => setEmail(text)}
                />
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={resetPassword}>
                  <Text style={styles.textStyle}>Send reset email</Text>
                </TouchableOpacity>
                <Text style={{ color: 'red' }}>{resetPasswordMessage}</Text>
              </View>
            </View>
          </Modal>

          <View style={styles.createAccountContainer}>
            <CustomText color={colors.grey}>Not a member?</CustomText>
            <TouchableOpacity
              style={styles.linkContainer}
              onPress={() => navigation.navigate('Signup')}>
              <CustomText
                color={colors.primary}
                fontSize={15}
                fontWeight={'500'}>
                Create Account
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
    backgroundColor: colors.primaryPalette[200]
  },
  undrawLogoContainer: {
    alignItems: 'center',
    zIndex: 100,
    marginTop: 50
  },
  globeLogo: {
    width: 220,
    height: 207
  },

  logoContainer: {
    alignItems: 'center'
  },
  logo: {
    height: 84,
    width: 95
  },
  authContainer: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  authIcons: {
    height: 25,
    width: 25
  },
  authIconsOuterContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 17
  },
  authIconsContainer: {
    marginHorizontal: 20,
    backgroundColor: colors.white,
    padding: 5,
    borderRadius: 5,
    shadowColor: colors.grey,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4
  },
  loginContainer: {
    marginTop: 25,
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
  errorMessageBox: {
    position: 'relative'
  },
  errorMessage: {
    color: 'red',
    paddingTop: 20,
    marginBottom: -20
  },
  loginButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginTop: 50,
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
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 10,
    width: 350
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
});

export default Login;
