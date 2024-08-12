import React from 'react';
import { Text as OText, TextProps } from '@rneui/themed';
import theme, { Colors } from '../../../theme';
import { CustomTextProps, Font, TextTypeProps } from './types';
import { generalTextStyles, headingStyles, labelStyles } from './styles';

const fontFamilyMap = {
  label: 'Play-Regular',
  heading: 'Play-Bold',
  script: 'EduTASBeginner-SemiBold',
  paragraph: 'Rubik-Regular',
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
