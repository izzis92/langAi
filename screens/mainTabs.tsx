import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './homeStack';
import Account from './account';
import {Icon} from '@rneui/themed';
import theme, {Colors} from '../theme';
import Record from './Record';

const Tab = createBottomTabNavigator();

export const routes = {
  home: 'Home',
  record: 'Translate',
  account: 'Account',
} as const;

const IconMap = {
  [routes.home]: 'home',
  [routes.record]: 'microphone',
  [routes.account]: 'account-box',
};

function Tabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => {
            // You can return any component that you like here!
            return (
              <Icon
                name={IconMap[route.name as keyof typeof IconMap]}
                size={size}
                type="material-community"
                color={color}
              />
            );
          },
          // tabBarStyle: {
          //   backgroundColor: Colors.Teal,
          // },

          tabBarActiveTintColor: Colors.Navy,
          tabBarInactiveTintColor: theme.lightColors?.grey3,
          tabBarLabelStyle: {
            fontFamily: 'Play-Bold',
          },
        })}>
        <Tab.Screen name={routes.home} component={HomeStack} />
        <Tab.Screen name={routes.record} component={Record} />
        <Tab.Screen name={routes.account} component={Account} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Tabs;
