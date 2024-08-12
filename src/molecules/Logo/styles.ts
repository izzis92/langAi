import { StyleSheet } from 'react-native';
import { Colors } from '../../../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  textContainer: {
    marginLeft: 10,
  },
  text: {
    color: Colors.Navy,
  },
});

export default styles;
