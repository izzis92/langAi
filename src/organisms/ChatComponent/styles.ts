import { StyleSheet } from 'react-native';
import { Colors } from '../../../theme';

export const styles = StyleSheet.create({
  message: {
    margin: 10,
    padding: 10,
    borderColor: Colors.Teal,
    borderRadius: 10,
    borderWidth: 1,
  },
  send: { marginRight: 10, justifyContent: 'center', height: '100%' },
});
