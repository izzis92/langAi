import { Button, Text } from '@rneui/themed';
import React, { useEffect } from 'react';
import { View, useColorScheme } from 'react-native';
import { routes } from './homeStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParams } from './params';
import theme from '../theme';

type Props = {
  navigation: NativeStackNavigationProp<MainStackParams, 'Home'>;
};

function Account({ navigation }: Props) {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}></View>
  );
}

export default Account;
