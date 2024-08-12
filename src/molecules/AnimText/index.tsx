import React, { useEffect, useState } from 'react';
import { TextProps } from '@rneui/themed';

type AnimTextProps = { text: string; TextComp: React.ElementType };

function AnimText({ text, TextComp, ...props }: TextProps & AnimTextProps) {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    if (text) {
      let i = 0;
      let interval = setInterval(() => {
        setDisplayText(text.substring(0, i));
        i++;
        if (i > text.length) {
          clearInterval(interval);
        }
      }, 50);
    } else {
      setDisplayText('');
    }
  }, [text]);

  return <TextComp {...props}>{displayText}</TextComp>;
}

export default AnimText;
