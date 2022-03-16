import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';
import { CustomText } from '../Components/CustomText';
import colors from '../config/colors';

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const LOGO_CONTAINER_HEIGHT = Dimensions.get('screen').height - 200;

const Landing = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.upperbox}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/LogoBlack.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.surferLogoContainer}>
          <Image
            source={require('../assets/surferlogo.png')}
            style={styles.surferlogo}
          />
        </View>
        <View style={styles.aboutTextContainer}>
          <Text style={styles.aboutText}>
            Secure Kitesurfing, In your hands.
          </Text>
        </View>
      </View>

      <View style={styles.box}>
        <View style={styles.getStartedContainer}>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => navigation.navigate('Signup')}>
            <CustomText color={colors.white} fontSize={18} fontWeight={'500'}>
              Get Started !
            </CustomText>
          </TouchableOpacity>
        </View>

        <View style={styles.loginRedirectContainer}>
          <CustomText color={colors.grey}>Got an account?</CustomText>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.linkContainer}>
            <CustomText color={colors.primary} fontSize={15} fontWeight={'500'}>
              Log in
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    position: 'relative',
    width: SCREEN_WIDTH
  },
  upperbox: {
    position: 'relative',
    width: SCREEN_WIDTH,
    height: LOGO_CONTAINER_HEIGHT,
    backgroundColor: colors.primaryPalette[100]
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
  surferLogoContainer: {
    position: 'absolute',
    zIndex: 100,
    left: SCREEN_WIDTH / 2,
    transform: [{ translateX: '-110%' }],
    top: 200
  },
  surferlogo: {
    width: 220,
    height: 207
  },

  aboutTextContainer: {
    position: 'absolute',
    width: 250,
    zIndex: 100,
    left: SCREEN_WIDTH / 2,
    top: 450,
    transform: [{ translateX: '-125%' }]
  },

  aboutText: {
    fontWeight: '600',
    fontSize: 28,
    textAlign: 'center',
    lineHeight: 40
  },

  getStartedContainer: {
    marginTop: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  getStartedButton: {
    backgroundColor: colors.primary,
    display: 'flex',
    alignItems: 'center',
    marginTop: 25,
    width: 350,
    paddingVertical: 14,
    borderRadius: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5
  },
  loginRedirectContainer: {
    marginTop: 35,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  linkContainer: {
    paddingHorizontal: 10,
    borderRadius: 50
  }
});

export default Landing;
