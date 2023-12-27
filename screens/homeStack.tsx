import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from './home';
import Menu from './menu';
import SubMenu from './submenu';
import MenuItem from './menuItem';

const App = createNativeStackNavigator();

export const routes = {
  main: 'Main',
  menu: 'Menu',
  submenu: 'SubMenu',
  menuItem: 'MenuItem',
} as const;

function HomeStack() {
  return (
    <App.Navigator>
      <App.Screen name={routes.main} component={Home} options={{ title: '' }} />
      <App.Screen name={routes.menu} component={Menu} />
      <App.Screen name={routes.submenu} component={SubMenu} />
      <App.Screen name={routes.menuItem} component={MenuItem} />
    </App.Navigator>
  );
}

export default HomeStack;
