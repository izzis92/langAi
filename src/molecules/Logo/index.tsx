import React from 'react';
import { View } from 'react-native';
import { Heading, Script } from '../../atoms/Text';
import * as Progress from 'react-native-progress';
import { Colors } from '../../../theme';
import styles from './styles';

function Logo({ header = false }) {
  if (header) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Progress.Circle color={Colors.Mint} borderWidth={1.5} size={25} />
          <View style={{ position: 'absolute' }}>
            <Progress.Circle
              color={Colors.LightLime}
              borderWidth={1.5}
              size={18}
            />
            <View
              style={{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              }}>
              <Script.XSmall style={{ color: Colors.Mint }}>l</Script.XSmall>
            </View>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Progress.Circle
          color={Colors.Teal}
          strokeCap="round"
          endAngle={1}
          indeterminate
          borderWidth={5}
          size={80}
        />
        <View style={{ position: 'absolute' }}>
          <Progress.Circle
            color={Colors.Teal}
            strokeCap="butt"
            indeterminate
            endAngle={0.5}
            borderWidth={5}
            size={80}
            indeterminateAnimationDuration={2000}
          />
        </View>
        <View style={{ position: 'absolute' }}>
          <Progress.Circle
            color={Colors.LightLime}
            strokeCap="butt"
            indeterminate
            endAngle={0.5}
            borderWidth={5}
            size={80}
            indeterminateAnimationDuration={1000}
          />
        </View>
        <View style={{ position: 'absolute' }}>
          <Progress.Circle
            color={Colors.Teal}
            strokeCap="round"
            endAngle={1}
            indeterminate
            borderWidth={5}
            size={65}
          />
          <View style={{ position: 'absolute' }}>
            <Progress.Circle
              color={Colors.Teal}
              strokeCap="butt"
              indeterminate
              endAngle={0.5}
              borderWidth={5}
              size={65}
              direction="counter-clockwise"
              indeterminateAnimationDuration={2000}
            />
          </View>
          <View style={{ position: 'absolute' }}>
            <Progress.Circle
              color={Colors.LightLime}
              strokeCap="butt"
              indeterminate
              endAngle={0.5}
              borderWidth={5}
              size={65}
              direction="counter-clockwise"
              indeterminateAnimationDuration={1000}
            />
          </View>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Heading.Large style={styles.text}>Lang AI</Heading.Large>
      </View>
    </View>
  );
}

export default Logo;
