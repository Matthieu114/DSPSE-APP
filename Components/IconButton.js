import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import colors from '../config/colors';

const IconButton = ({ color, size, onPress, name, library, active }) => {
  return (
    <Pressable
      style={(args) => {
        if (args.pressed) {
          return [
            styles.base,
            {
              opacity: 0.5,
              backgroundColor: 'transparent'
            }
          ];
        }

        return [styles.base, { opacity: 1, backgroundColor: 'transparent' }];
      }}
      onPress={onPress}>
      {library === 'FontAwesome' && (
        <FontAwesome
          name={name}
          size={size}
          color={active ? colors.blue400 : color}
        />
      )}
      {library === 'FontAwesome5' && (
        <FontAwesome5
          name={name}
          size={size}
          color={active ? colors.blue400 : color}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default IconButton;
