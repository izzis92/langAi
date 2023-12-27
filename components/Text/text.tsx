import React from 'react';
import { Text as OText, TextProps } from '@rneui/themed';
import { StyleSheet } from 'react-native';
import theme, { Colors } from '../../theme';

type TextStyle = {
  xxLarge: Font;
  xLarge: Font;
  large: Font;
  medium: Font;
  small: Font;
  xSmall: Font;
};

const fontFamilyMap = {
  label: 'Play-Regular',
  heading: 'Play-Bold',
  script: 'EduTASBeginner-SemiBold',
  paragraph: 'Rubik-Regular',
};

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

const generalTextStyles = StyleSheet.create({
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

export type Font = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
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

type TextTypeProps = {
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

function TextComp({
  type,
  children,
  style,
  size,
  primary = false,
  secondary = false,
  tertiary = false,
  light = false,
  ...rest
}: CustomTextProps & TextTypeProps) {
  let textStyle: { [key: string]: Font };
  let color = theme.lightColors?.grey0;

  if (type === 'label') {
    textStyle = labelStyles;
  } else if (type === 'heading') {
    textStyle = headingStyles;
  } else {
    textStyle = generalTextStyles;
  }

  if (primary) {
    color = Colors.Navy;
  } else if (secondary) {
    color = Colors.Teal;
  } else if (tertiary) {
    color = Colors.FreshLemon;
  } else if (light) {
    color = theme.lightColors?.grey5;
  }

  return (
    <OText
      style={[
        textStyle[size],
        {
          color,
          fontFamily: fontFamilyMap[type as keyof typeof fontFamilyMap],
        },
        style,
      ]}
      {...rest}>
      {children}
    </OText>
  );
}

const Label = {
  Large: (props: CustomTextProps): React.ReactElement => (
    <TextComp type="label" size="large" {...props} />
  ),
  Medium: (props: CustomTextProps): React.ReactElement => (
    <TextComp type="label" size="medium" {...props} />
  ),
  Small: (props: CustomTextProps): React.ReactElement => (
    <TextComp type="label" size="small" {...props} />
  ),
  XSmall: (props: CustomTextProps): React.ReactElement => (
    <TextComp type="label" size="xSmall" {...props} />
  ),
};

const Heading = {
  XLarge: (props: CustomTextProps): React.ReactElement => (
    <TextComp type="heading" size="xLarge" {...props} />
  ),
  Large: (props: CustomTextProps): React.ReactElement => (
    <TextComp type="heading" size="large" {...props} />
  ),
  Medium: (props: CustomTextProps): React.ReactElement => (
    <TextComp type="heading" size="medium" {...props} />
  ),
  Small: (props: CustomTextProps): React.ReactElement => (
    <TextComp type="heading" size="small" {...props} />
  ),
  XSmall: (props: CustomTextProps): React.ReactElement => (
    <TextComp type="heading" size="xSmall" {...props} />
  ),
};

const Script = {
  XLarge: (props: CustomTextProps): React.ReactElement => (
    <TextComp type="script" size="xLarge" {...props} />
  ),
  Large: (props: CustomTextProps): React.ReactElement => (
    <TextComp type="script" size="large" {...props} />
  ),
  Medium: (props: CustomTextProps): React.ReactElement => (
    <TextComp type="script" size="medium" {...props} />
  ),
  Small: (props: CustomTextProps): React.ReactElement => (
    <TextComp type="script" size="small" {...props} />
  ),
  XSmall: (props: CustomTextProps): React.ReactElement => (
    <TextComp type="script" size="xSmall" {...props} />
  ),
};

const Paragraph = {
  XLarge: (props: CustomTextProps): React.ReactElement => (
    <TextComp type="paragraph" size="xLarge" {...props} />
  ),
  Large: (props: CustomTextProps): React.ReactElement => (
    <TextComp type="paragraph" size="large" {...props} />
  ),
  Medium: (props: CustomTextProps): React.ReactElement => (
    <TextComp type="paragraph" size="medium" {...props} />
  ),
  Small: (props: CustomTextProps): React.ReactElement => (
    <TextComp type="paragraph" size="small" {...props} />
  ),
  XSmall: (props: CustomTextProps): React.ReactElement => (
    <TextComp type="paragraph" size="xSmall" {...props} />
  ),
};

export { Label, Heading, Script, Paragraph };
