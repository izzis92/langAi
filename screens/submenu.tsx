import { LinearProgress, ListItem } from '@rneui/themed';
import React from 'react';
import { FlatList, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParams } from './params';
import { RouteProp } from '@react-navigation/native';
import useCollection from '../data/dbhook';
import { MenuItem } from '../data/types';
import CenteredView from '../components/views/CenteredView';
import { routes } from './homeStack';

type Props = {
  navigation: NativeStackNavigationProp<MainStackParams, 'SubMenu'>;
  route: RouteProp<MainStackParams, 'SubMenu'>;
};

function SubMenu({ navigation, route }: Props) {
  const { parent } = route.params;
  const { data, loading } = useCollection(`menu/${parent.id}/items`);

  // checkboxes for selection options?
  const renderItem = ({ item }: { item: MenuItem }) => {
    return (
      <ListItem onPress={() => navigation.navigate(routes.menuItem, { item })}>
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  if (loading) {
    return (
      <CenteredView>
        <LinearProgress style={{ margin: 10 }} />
      </CenteredView>
    );
  }
  return (
    <View>
      <FlatList data={data as MenuItem[]} renderItem={renderItem} />
    </View>
  );
}

export default SubMenu;
