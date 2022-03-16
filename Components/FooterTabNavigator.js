import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import colors from '../config/colors';
import { CustomText } from './CustomText';
import IconButton from './IconButton';

import Homepage from '../screens/Homepage';

const Tab = createBottomTabNavigator();

export default function FooterNavbar() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Homescreen' component={Homepage} />
      <Tab.Screen name='Profile' component={Homepage} />
      <Tab.Screen name='Weather' component={Homepage} />
      <Tab.Screen name='Statistics' component={Homepage} />
      <Tab.Screen name='Journal' component={Homepage} />
    </Tab.Navigator>

    // <View style={styles.footerNavbar}>
    //   <View>
    //     <IconButton
    //       name='tasks'
    //       size={20}
    //       color={colors.grey}
    //       library='FontAwesome5'
    //       active={activePage}
    //     />
    //     <CustomText
    //       fontSize={14}
    //       fontWeight={'400'}
    //       color={colors.grey}
    //       active={activePage}>
    //       Journal
    //     </CustomText>
    //   </View>
    //   <View>
    //     <IconButton
    //       name='chart-bar'
    //       size={20}
    //       color={colors.grey}
    //       library='FontAwesome5'
    //       active={activePage}
    //     />
    //     <CustomText
    //       fontSize={14}
    //       fontWeight={'400'}
    //       color={colors.grey}
    //       active={activePage}>
    //       Statistics
    //     </CustomText>
    //   </View>
    //   <View>
    //     <IconButton
    //       name='record-vinyl'
    //       size={20}
    //       color={colors.grey}
    //       library='FontAwesome5'
    //       active={true}
    //     />
    //     <CustomText
    //       fontSize={14}
    //       fontWeight={'400'}
    //       color={colors.grey}
    //       active={true}>
    //       Record
    //     </CustomText>
    //   </View>
    //   <View>
    //     <IconButton
    //       name='cloud-sun'
    //       size={20}
    //       color={colors.grey}
    //       library='FontAwesome5'
    //       active={activePage}
    //     />
    //     <CustomText
    //       fontSize={14}
    //       fontWeight={'400'}
    //       color={colors.grey}
    //       active={activePage}>
    //       Weather
    //     </CustomText>
    //   </View>
    //   <View>
    //     <IconButton
    //       name='user-circle'
    //       size={20}
    //       color={colors.grey}
    //       library='FontAwesome'
    //       active={activePage}
    //     />
    //     <CustomText
    //       fontSize={14}
    //       fontWeight={'400'}
    //       color={colors.grey}
    //       active={activePage}>
    //       Profile
    //     </CustomText>
    //   </View>
    // </View>
  );
}

const styles = StyleSheet.create({
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
