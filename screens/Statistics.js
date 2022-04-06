import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { CustomText } from '../Components/CustomText';

const Statistics = () => {
  return (
    <SafeAreaView>
      <View style={{ alignItems: 'center' }}>
        <CustomText fontSize={20} fontWeight='500'>
          Statistics
        </CustomText>
      </View>
    </SafeAreaView>
  );
};

export default Statistics;
