import React, { useState } from 'react';
import { Label } from '../../atoms/Text';
import RecordButton from '../../atoms/RecordButton';
import { Dimensions, Platform, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { Colors } from '../../../theme';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';

const audioRecorderPlayer = new AudioRecorderPlayer();

const dirs = RNFetchBlob.fs.dirs;

const path = Platform.select({
  ios: 'hello.m4a',
  android: `${dirs.CacheDir}/hello.mp3`,
});

type RecordLayoutProps = {
  clearTranslation: () => void;
  loading: boolean;
  translate: (path: string) => void;
};
const RecordLayout = ({
  loading,
  clearTranslation,
  translate,
}: RecordLayoutProps) => {
  const [recordSecs, setRecordSecs] = useState(0);

  const onStartRecord = async () => {
    clearTranslation();
    await audioRecorderPlayer.startRecorder(path);
    audioRecorderPlayer.addRecordBackListener(e => {
      setRecordSecs(e.currentPosition / 1000);
      return;
    });
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordSecs(0);
    translate(result);
  };
  return (
    <>
      <Label.Medium
        style={{
          paddingHorizontal: 10,
          marginTop: 30,
          textAlign: 'center',
        }}>
        Press and hold to record
      </Label.Medium>
      <RecordButton
        onPressIn={onStartRecord}
        onPressOut={onStopRecord}
        loading={loading}
      />
      {recordSecs > 0 && (
        <View style={{ padding: 15, alignItems: 'center' }}>
          <Progress.Bar
            color={Colors.Mint}
            progress={recordSecs / 30}
            width={Dimensions.get('window').width - 80}
          />
        </View>
      )}
    </>
  );
};

export default RecordLayout;
