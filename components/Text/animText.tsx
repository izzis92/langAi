import React, {useEffect, useState} from 'react';

function AnimText({text, TextComp, ...props}) {
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
      }, 100);
    } else {
      setDisplayText('');
    }
  }, [text]);

  return <TextComp {...props}>{displayText}</TextComp>;
}

export default AnimText;
