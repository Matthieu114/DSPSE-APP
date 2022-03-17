import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import colors from '../config/colors';
import MapView from 'react-native-maps';

import { CustomText } from '../Components/CustomText';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

export default function Homepage() {
  const navigation = useNavigation();
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [activeTimer, setActiveTimer] = useState(false);
  const [paused, setPause] = useState(paused);

  const handleSignout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  return (
    <View style={styles.parentContainer}>
      <SafeAreaView style={styles.informationBox}>
        <View style={styles.topRow}>
          <FontAwesome5
            name='cog'
            size={25}
            color={colors.grey}
            library='FontAwesome5'
          />
          <TouchableWithoutFeedback>
            <Image
              source={require('../assets/LogoBlack.png')}
              style={styles.logo}
            />
          </TouchableWithoutFeedback>
          <Text>Logo 3</Text>
        </View>
        <View style={styles.timer}>
          <CustomText
            color={colors.palette[100]}
            fontSize={50}
            fontWeight={'500'}>
            {('0' + Math.floor((time / 60000) % 60)).slice(-2)}:
            {('0' + Math.floor((time / 1000) % 60)).slice(-2)}:
            {('0' + ((time / 10) % 100)).slice(-2)}
          </CustomText>
          <CustomText color={colors.grey}>Duration</CustomText>
        </View>

        <View style={styles.otherInfoContainer}>
          <View style={styles.otherInfo}>
            <CustomText fontSize={25} fontWeight={'500'}>
              0,00
            </CustomText>
            <CustomText color={colors.grey} fontSize={13}>
              Distance
            </CustomText>
          </View>
          <View style={styles.otherInfo}>
            <CustomText fontSize={25} fontWeight={'500'}>
              0,00
            </CustomText>
            <CustomText color={colors.grey} fontSize={13}>
              Vitesse (Noeuds)
            </CustomText>
          </View>
          <View style={styles.otherInfo}>
            <CustomText fontSize={25} fontWeight={'500'}>
              0,00
            </CustomText>
            <CustomText color={colors.grey} fontSize={13}>
              Vit. max
            </CustomText>
          </View>
        </View>
      </SafeAreaView>

      {/* Goole Maps Container */}

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          showsUserLocation
          provider={MapView.PROVIDER_GOOGLE}
        />
      </View>

      {/* Pause Resume Reset Button conditionals */}

      <View style={styles.trackerContainer}>
        {!activeTimer ? (
          <TouchableOpacity
            style={styles.trackerButton}
            onPress={() => {
              setTimerOn(true);
              setActiveTimer(true);
            }}>
            <CustomText color={colors.white} fontSize={18} fontWeight={'500'}>
              Start Tracking
            </CustomText>
          </TouchableOpacity>
        ) : (
          <View style={styles.resetPauseButtonContainer}>
            {!paused ? (
              <TouchableOpacity
                style={[
                  styles.trackerButton,
                  activeTimer && styles.pauseButton
                ]}
                onPress={() => {
                  setTimerOn(false);
                  setPause(true);
                }}>
                <CustomText
                  color={colors.white}
                  fontSize={18}
                  fontWeight={'500'}>
                  Pause
                </CustomText>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.trackerButton,
                  activeTimer && styles.pauseButton
                ]}
                onPress={() => {
                  setTimerOn(true);
                  setPause(false);
                }}>
                <CustomText
                  color={colors.white}
                  fontSize={18}
                  fontWeight={'500'}>
                  Resume
                </CustomText>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.trackerButton, activeTimer && styles.resetButton]}
              onPress={() => {
                setTime(0);
                setActiveTimer(false);
                setTimerOn(false);
              }}>
              <CustomText color={colors.white} fontSize={18} fontWeight={'500'}>
                Reset
              </CustomText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1
  },
  informationBox: {},
  logo: {
    height: 36,
    width: 34
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
    marginLeft: 10
  },
  timer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  otherInfoContainer: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 15,
    marginLeft: 15
  },
  otherInfo: {
    alignItems: 'center'
  },
  mapContainer: {
    flex: 1
  },
  map: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height
  },
  footerNavbar: {
    marginTop: 35,
    paddingBottom: 30,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.white
  },

  trackerButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors.palette[100],
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

  pauseButton: {
    width: 170,
    marginRight: 5
  },
  resetButton: {
    width: 170,
    backgroundColor: colors.palette[300],
    marginLeft: 5
  },
  trackerContainer: {
    alignItems: 'center',
    marginBottom: 20
  },

  resetPauseButtonContainer: {
    display: 'flex',
    flexDirection: 'row'
  }
});
