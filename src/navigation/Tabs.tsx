import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Account from '../screens/Account';
import { Icon } from '@rneui/themed';
import theme, { Colors } from '../../theme';
import Record from '../screens/Translate';
import Chat from '../screens/Chat';

const Tab = createBottomTabNavigator();

export const routes = {
  chat: 'Chat',
  record: 'Translate',
  account: 'Account',
} as const;

const IconMap = {
  [routes.chat]: 'chat',
  [routes.record]: 'microphone',
  [routes.account]: 'account-box',
};

function Tabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color, size }) => {
            return (
              <Icon
                name={IconMap[route.name as keyof typeof IconMap]}
                size={size}
                type="material-community"
                color={color}
              />
            );
          },
          tabBarStyle: {
            backgroundColor: Colors.Teal,
          },

          tabBarActiveTintColor: Colors.Navy,
          tabBarInactiveTintColor: theme.lightColors?.grey2,
          tabBarLabelStyle: {
            fontFamily: 'Play-Bold',
          },
        })}>
        <Tab.Screen name={routes.chat} component={Chat} />
        <Tab.Screen name={routes.record} component={Record} />
        <Tab.Screen name={routes.account} component={Account} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Tabs;
