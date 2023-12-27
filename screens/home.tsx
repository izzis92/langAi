import { Button } from '@rneui/themed';
import React, { useEffect } from 'react';
import { View, useColorScheme } from 'react-native';
import { routes } from './homeStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParams } from './params';
import theme from '../theme';
import {
  Heading,
  Paragraph,
  Script,
  TextMed,
  TextReg,
} from '../components/Text/text';

type Props = {
  navigation: NativeStackNavigationProp<MainStackParams, 'Home'>;
};

function Home({ navigation }: Props) {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}>
      <Heading.Medium primary style={{ marginBottom: 20 }}>
        Downtime
      </Heading.Medium>
      <Paragraph.Large primary>Your Schedule, Your Skills.</Paragraph.Large>
      <Script.Medium style={{ marginTop: 20, marginBottom: 20 }}>
        Text script
      </Script.Medium>
      <Button>Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="warning">Warning</Button>
      <Button color="error">Error</Button>
    </View>
  );
}

export default Home;
