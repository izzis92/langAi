if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
import React, {useMemo} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import theme from './theme';
import {ThemeProvider} from '@rneui/themed';
import UserContext from './user/userContext';
import Tabs from './screens/mainTabs';

function App(): JSX.Element {
  const [user, setUser] = React.useState('admin');

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={[user, setUser]}>
          <Tabs />
        </UserContext.Provider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
