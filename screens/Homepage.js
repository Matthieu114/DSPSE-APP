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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext, useState } from 'react';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import colors from '../config/colors';
import MapView from 'react-native-maps';

import { CustomText } from '../Components/CustomText';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Homepage() {
  const navigation = useNavigation();
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [activePage, setActivePage] = useState(false);

  const handleSignout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.log(e);
    }
  };
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
          <CustomText color={colors.blue400} fontSize={50} fontWeight={'500'}>
            00:24:42
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

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          // provider={MapView.PROVIDER_GOOGLE}
        />
      </View>
      <View style={styles.trackerContainer}>
        <TouchableOpacity style={styles.trackerButton}>
          <CustomText color={colors.white} fontSize={18} fontWeight={'500'}>
            Start Tracking
          </CustomText>
        </TouchableOpacity>
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
  trackerContainer: {
    alignItems: 'center',
    marginBottom: 20
  }
});
