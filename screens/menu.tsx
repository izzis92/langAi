import { LinearProgress, Tile } from '@rneui/themed';
import React from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { routes } from './homeStack';
import { MenuItem } from '../data/types';
import { MainStackParams } from './params';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useCollection from '../data/dbhook';
import CenteredView from '../components/views/CenteredView';

type Props = {
  navigation: NativeStackNavigationProp<MainStackParams, 'Menu'>;
};

function Menu({ navigation }: Props) {
  const { data, loading } = useCollection('menu');

  if (loading) {
    return (
      <CenteredView>
        <LinearProgress style={{ margin: 10 }} />
      </CenteredView>
    );
  }

  const renderItem = ({ item }: { item: MenuItem }) => {
    return (
      <Tile
        onPress={() => navigation.navigate(routes.submenu, { parent: item })}
        featured
        width={Dimensions.get('screen').width / 2.2}
        imageSrc={{ uri: item.image }}
        title={item.name}
      />
    );
  };
  return (
    <View>
      <FlatList data={data as MenuItem[]} renderItem={renderItem} />
    </View>
  );
}

export default Menu;
