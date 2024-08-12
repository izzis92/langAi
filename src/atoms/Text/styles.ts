import { StyleSheet } from 'react-native';
import { TextStyle } from './types';

export const headingStyles = StyleSheet.create({
  xxLarge: { fontSize: 40, lineHeight: 52 },
  xLarge: { fontSize: 36, lineHeight: 44 },
  large: { fontSize: 32, lineHeight: 40 },
  medium: { fontSize: 28, lineHeight: 36 },
  small: { fontSize: 24, lineHeight: 32 },
  xSmall: { fontSize: 20, lineHeight: 28 },
}) as unknown as TextStyle;

export const labelStyles = StyleSheet.create({
  large: { fontSize: 18, lineHeight: 24 },
  medium: { fontSize: 16, lineHeight: 20 },
  small: { fontSize: 14, lineHeight: 16 },
  xSmall: { fontSize: 12, lineHeight: 16 },
}) as unknown as TextStyle;

export const generalTextStyles = StyleSheet.create({
  xLarge: {
    fontSize: 20,
    lineHeight: 28,
  },
  large: {
    fontSize: 18,
    lineHeight: 24,
  },
  medium: {
    fontSize: 16,
    lineHeight: 20,
  },
  small: {
    fontSize: 14,
    lineHeight: 16,
  },
  xSmall: {
    fontSize: 12,
    lineHeight: 16,
  },
}) as unknown as TextStyle;
