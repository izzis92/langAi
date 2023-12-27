import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

function CenteredView({ children, ...props }: ViewProps) {
  return (
    <View style={styles.container} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CenteredView;
