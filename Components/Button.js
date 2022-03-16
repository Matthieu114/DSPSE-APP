import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CustomText } from './CustomText';
import colors from '../config/colors';

const MyButton = ({
  title,
  backgroundColor = '#000',
  titleColor = '#fff',
  titleSize = 14,
  onPress,
  width = '100%',
  containerStyle
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={(args) => {
        if (args.pressed) {
          return [
            styles.base,
            {
              opacity: 0.5,
              backgroundColor,
              width
            },
            containerStyle
          ];
        }

        return [
          styles.base,
          {
            opacity: 1,
            backgroundColor,
            width
          },
          containerStyle
        ];
      }}>
      <Text style={[styles.text, { color: titleColor, fontSize: titleSize }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  text: {
    fontWeight: '600'
  },
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 4,
    paddingHorizontal: 12
  }
});

export default MyButton;
