import { Card, FAB, Icon, Input, ListItem, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParams } from './params';
import { RouteProp } from '@react-navigation/native';
import RowView from '../components/views/RowView';
import useUser from '../user/useUser';
import FirebaseImage from '../components/images/FirebaseImage';

type Props = {
  navigation: NativeStackNavigationProp<MainStackParams, 'MenuItem'>;
  route: RouteProp<MainStackParams, 'MenuItem'>;
};

type Selected = {
  [key: string]: string;
};

function MenuItem({ route }: Props) {
  const { theme } = useTheme();
  const { item } = route.params;
  const { isAdmin } = useUser();
  const [editing, setEditing] = React.useState(false);

  const [selectedOptions, setSelectedOptions] = React.useState<Selected>({});

  const select = (optionName: string, suboption: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [optionName]: suboption,
    });
  };

  return (
    <View>
      <Card>
        <Card.Title>{item.name}</Card.Title>
        <FirebaseImage name={item.name} editable={editing} />
        {item?.options?.map(option => (
          <View style={{ padding: 5 }}>
            <ListItem.Subtitle
              style={{ textDecorationLine: 'underline', paddingBottom: 5 }}>
              {option.name}
            </ListItem.Subtitle>
            {option?.options?.map(suboption => (
              <RowView>
                <ListItem.CheckBox
                  onIconPress={() => select(option.name, suboption)}
                  checked={selectedOptions[option.name] === suboption}
                />
                <FirebaseImage editable={editing} name={suboption} avatar />
                <ListItem.Subtitle style={{ marginLeft: 3, flex: 1 }}>
                  {suboption}
                </ListItem.Subtitle>
                {editing && (
                  <Icon
                    name="delete"
                    onPress={() => select(option.name, suboption)}
                  />
                )}
              </RowView>
            ))}
          </View>
        ))}
      </Card>
      {isAdmin && (
        <FAB
          onPress={() => setEditing(!editing)}
          icon={{ name: editing ? 'check' : 'edit', color: 'white' }}
        />
      )}
    </View>
  );
}

export default MenuItem;
