import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import theme from './theme';
import { ThemeProvider } from '@rneui/themed';
import { LangProvider } from './src/context/lang/langContext';
import Tabs from './src/navigation/Tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import Config from 'react-native-config';
import { Label } from './src/atoms/Text';
import { View } from 'react-native';

function App(): JSX.Element {
  if (!Config.OPENAI_KEY) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Label.Medium>Missing OPENAI KEY</Label.Medium>
      </View>
    );
  }
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <LangProvider>
            <Tabs />
          </LangProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default App;
