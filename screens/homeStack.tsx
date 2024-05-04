import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import Home from './home';
import Menu from './menu';
import SubMenu from './submenu';
import MenuItem from './menuItem';
import Logo from '../components/views/Logo';
import {Colors} from '../theme';

const App = createNativeStackNavigator();

export const routes = {
  main: 'Main',
  menu: 'Menu',
  submenu: 'SubMenu',
  menuItem: 'MenuItem',
} as const;

function HomeStack() {
  const headerLeft = useCallback(() => <Logo header />, []);
  return (
    <App.Navigator>
      <App.Screen
        name={routes.main}
        component={Home}
        options={{
          headerLeft,
          headerTitle: '',
          headerStyle: {backgroundColor: Colors.Teal},
        }}
      />
    </App.Navigator>
  );
}

export default HomeStack;
