import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

function RowView({ children, ...props }: ViewProps) {
  return (
    <View style={styles.container} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default RowView;
