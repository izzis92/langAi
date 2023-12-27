import React from 'react';
import { Dimensions, View } from 'react-native';
import { Gig } from '../../types';
import { Colors } from '../../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import { Label, Paragraph } from '../Text/text';
import RowView from '../views/RowView';
import { Button } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';

export default function GigView({ gig, height }: { gig: Gig; height: number }) {
  const top = useSafeAreaInsets().top;

  // add not interested view to update preferences
  return (
    <FastImage
      style={{ height: height, width: Dimensions.get('window').width }}
      source={{
        uri: 'https://www.wikihow.com/images/thumb/8/87/Earn-More-Tips-as-a-Waiter-or-Waitress-Step-1-Version-3.jpg/aid587136-v4-728px-Earn-More-Tips-as-a-Waiter-or-Waitress-Step-1-Version-3.jpg.webp',
      }}>
      <RowView
        style={{
          backgroundColor: 'rgba(0,0,0,0.7)',
          paddingTop: top,
          height: '100%',
          borderBottomWidth: 1,
          borderBottomColor: Colors.Navy,
          justifyContent: 'flex-end',
          paddingBottom: 20,
        }}>
        <View style={{ margin: 20 }}>
          <Label.Large style={{ marginBottom: 20 }} light>
            {gig.name}
          </Label.Large>
          <Paragraph.Medium light>{gig.description}</Paragraph.Medium>
          <Button
            titleStyle={{ color: Colors.Navy }}
            style={{ marginTop: 20 }}
            ViewComponent={LinearGradient} // Don't forget this!
            linearGradientProps={{
              colors: [Colors.LightLime, Colors.Mint],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}>
            Book
          </Button>
        </View>
      </RowView>
    </FastImage>
  );
}
