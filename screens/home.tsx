import { Button, Icon, ListItem } from '@rneui/themed';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParams } from './params';

import { Label, Paragraph, Script } from '../components/Text/text';
import { Colors } from '../theme';
import { Contact, contacts } from '../Contacts';
import ContactItem from '../components/ContactItem';
import SettingsIcon from '../components/SettingsIcon';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    borderColor: Colors.Navy,
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    marginVertical: 8,
  },
  listItem: {
    flexDirection: 'row',
    paddingBottom: 6,
    // backgroundColor: 'yellow',
  },
});

function Home() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignSelf: 'center',
      }}>
      <SettingsIcon width={100} height={100} color={Colors.Navy} />
    </View>
  );
}

export default Home;
