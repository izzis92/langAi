import { Avatar, Card, FAB } from '@rneui/themed';
import React, { useEffect } from 'react';
import storage from '@react-native-firebase/storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

type Props = {
  name?: string;
  avatar?: boolean;
  editable?: boolean;
  fullScreen?: boolean;
};
export default function FirebaseImage({
  name,
  avatar = false,
  editable = false,
  fullScreen = false,
}: Props) {
  const [uri, setUri] = React.useState<string | undefined>(undefined);

  useEffect(() => {
    if (name) {
      storage()
        .ref(`${name}.jpg`)
        .getDownloadURL()
        .then(url => {
          setUri(url);
        });
    }
  }, [name]);

  const editImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      const ref = storage().ref(`${name}.jpg`);
      setUri(response?.assets?.[0]?.uri);
      ref.putFile(response?.assets?.[0]?.uri as string).then(() => {
        setUri(response?.assets?.[0]?.uri);
      });
    });
  };

  if (!uri && !editable) {
    return <View />;
  }

  if (fullScreen) {
    return <FastImage style={{ flex: 1 }} source={{ uri }} />;
  }

  if (avatar) {
    return (
      <Avatar size={64} source={{ uri }}>
        {editable && <Avatar.Accessory size={23} onPress={editImage} />}
      </Avatar>
    );
  }
  return (
    <Card.Image source={{ uri }}>
      {editable && (
        <FAB
          style={{ position: 'absolute', right: 10, bottom: 10 }}
          onPress={editImage}
          icon={{ name: 'edit', color: 'white' }}
        />
      )}
    </Card.Image>
  );
}
