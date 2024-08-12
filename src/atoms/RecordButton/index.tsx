import { FAB, FABProps } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Colors } from '../../../theme';
import { styles } from './styles';

type RecordButtonProps = FABProps & { loading: boolean };
const RecordButton = ({ loading, ...props }: RecordButtonProps) => {
  return (
    <View>
      <FAB
        icon={{ name: 'microphone', type: 'material-community' }}
        delayPressIn={100}
        size="small"
        style={{ marginVertical: 20 }}
        {...props}
      />
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={Colors.Mint} />
        </View>
      )}
    </View>
  );
};

export default RecordButton;
