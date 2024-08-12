import { TextProps } from '@rneui/themed';

export type Font = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
};

export type TextStyle = {
  xxLarge: Font;
  xLarge: Font;
  large: Font;
  medium: Font;
  small: Font;
  xSmall: Font;
};

export type CustomTextProps = TextProps & {
  children: React.ReactNode;
  accessible?: boolean;
  accessibilityLabel?: string;
  secondary?: boolean;
  tertiary?: boolean;
  accent?: boolean;
  light?: boolean;
  negative?: boolean;
  positive?: boolean;
  warning?: boolean;
  onColor?: boolean;
  mask?: boolean;
  primary?: boolean;
};

export type TextTypeProps = {
  type: 'heading' | 'label' | 'script' | 'paragraph' | 'parargraphBold';
  size:
    | 'xxxSmall'
    | 'xxSmall'
    | 'xSmall'
    | 'small'
    | 'medium'
    | 'large'
    | 'xLarge'
    | 'xxLarge';
};
