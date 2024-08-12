import React from 'react';
import { View, ViewProps } from 'react-native';
import styles from './styles';

function Row({ children, style, ...props }: ViewProps) {
  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
}

export default Row;
