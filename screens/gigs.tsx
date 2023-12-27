import { Button, Text } from '@rneui/themed';
import React, { useEffect } from 'react';
import { FlatList, View, useColorScheme } from 'react-native';
import { routes } from './homeStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParams } from './params';
import theme from '../theme';
import GigView from '../components/gig/gigView';
import { Gig } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<MainStackParams, 'Home'>;
};

// id: number;
//   name: string;
//   date: string;
//   location: string;
//   city: string;
//   state: string;
//   country: string;
//   description: string;
//   img: string;
//   time: string;
//   pay: string;
const data = [
  {
    name: 'Gig 1',
    id: '1',
    date: '2021-10-01',
    location: 'The Venue',
    city: 'Denver',
    state: 'CO',
    country: 'USA',
    description: 'This is a gig description',
    img: 'https://via.placeholder.com/150',
    time: '8:00 PM',
    pay: '$100',
  },
  {
    name: 'Gig 2',
    id: '2',
    date: '2021-10-02',
    location: 'The Venue',
    city: 'Denver',
    state: 'CO',
    country: 'USA',
    description: 'This is a gig description',
    img: 'https://via.placeholder.com/150',
    time: '8:00 PM',
    pay: '$100',
  },
  {
    name: 'Gig 3',
    id: '3',
    date: '2021-10-03',
    location: 'The Venue',
    city: 'Denver',
    state: 'CO',
    country: 'USA',
    description: 'This is a gig description',
    img: 'https://via.placeholder.com/150',
    time: '8:00 PM',
    pay: '$100',
  },
  {
    name: 'Gig 4',
    id: '4',
    date: '2021-10-04',
    location: 'The Venue',
    city: 'Denver',
    state: 'CO',
    country: 'USA',
    description: 'This is a gig description',
    img: 'https://via.placeholder.com/150',
    time: '8:00 PM',
    pay: '$100',
  },
  {
    name: 'Gig 5',
    id: '5',
    date: '2021-10-05',
    location: 'The Venue',
    city: 'Denver',
    state: 'CO',
    country: 'USA',
    description: 'This is a gig description',
    img: 'https://via.placeholder.com/150',
    time: '8:00 PM',
    pay: '$100',
  },
  {
    name: 'Gig 6',
    id: '6',
    date: '2021-10-06',
    location: 'The Venue',
    city: 'Denver',
    state: 'CO',
    country: 'USA',
    description: 'This is a gig description',
    img: 'https://via.placeholder.com/150',
    time: '8:00 PM',
    pay: '$100',
  },
];

// get data from api, preload images on scroll

function Gigs({ navigation }: Props) {
  const [height, setHeight] = React.useState(0);
  const renderItem = ({ item, index }: { item: Gig; index: number }) => (
    <GigView gig={item} height={height} index={index} />
  );

  const onLayout = (event: any) => {
    setHeight(event.nativeEvent.layout.height);
  };
  return (
    <FlatList
      renderItem={renderItem}
      data={data}
      showsVerticalScrollIndicator={false}
      onLayout={onLayout}
      snapToInterval={height}
      snapToAlignment="start"
      decelerationRate={'fast'}
      style={{
        height: '100%',
        backgroundColor: theme.lightColors?.grey1,
      }}
    />
  );
}

export default Gigs;
