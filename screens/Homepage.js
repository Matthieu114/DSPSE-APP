import {
  View,
  Text,
  SafeAreaView,
  TouchableHighlight,
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

import IconButton from '../Components/IconButton';
import { CustomText } from '../Components/CustomText';
import FooterNavbar from '../Components/FooterTabNavigator';

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
          <IconButton
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

      {/* <Tab.Navigator>
        <Tab.Screen name='Homescreen' component={Homepage} />
        <Tab.Screen name='Profile' component={Homepage} />
        <Tab.Screen name='Weather' component={Homepage} />
        <Tab.Screen name='Statistics' component={Homepage} />
        <Tab.Screen name='Journal' component={Homepage} />
      </Tab.Navigator> */}
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
  }
});
