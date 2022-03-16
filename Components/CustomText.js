// CustomText.js

import React from 'react';
import { StyleSheet, Text } from 'react-native';
import colors from '../config/colors';

export const CustomText = (props) => {
  const styles = StyleSheet.create({
    text: {
      fontFamily: 'Arial',
      color: props?.color != null ? props?.color : 'black',
      fontSize: props?.fontSize != null ? props?.fontSize : 15,
      fontWeight: props?.fontWeight != null ? props?.fontWeight : 'normal',
      marginTop: 5
    },

    textActive: {
      fontFamily: 'Arial',
      color: colors.blue400,
      fontSize: props?.fontSize != null ? props?.fontSize : 15,
      fontWeight: props?.fontWeight != null ? props?.fontWeight : 'normal',
      marginTop: 5
    }
  });
  return (
    <Text style={props.active ? styles.textActive : styles.text}>
      {props.children}
    </Text>
  );
};
