import React, { useCallback, useEffect, useState } from 'react';
import * as Progress from 'react-native-progress';
import { Colors } from '../../../theme';
import { Dimensions, View } from 'react-native';
import { Icon } from '@rneui/themed';
import AnimText from '../../molecules/AnimText';
import { Script } from '../../atoms/Text';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Row from '../../atoms/Row';

const audioRecorderPlayer = new AudioRecorderPlayer();

const TranslationLayout = ({
  text,
  translationUrl,
}: {
  text: string;
  translationUrl?: string;
}) => {
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);

  const startPlay = useCallback(async () => {
    await audioRecorderPlayer.startPlayer(translationUrl);
    audioRecorderPlayer.addPlayBackListener(e => {
      if (currentDurationSec !== e.duration / 1000) {
        setCurrentDurationSec(e.duration / 1000);
      }
      setCurrentPositionSec(e.currentPosition / 1000);
      return;
    });
  }, [translationUrl]);

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  useEffect(() => {
    if (translationUrl) startPlay();
    return () => {
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
    };
  }, [translationUrl]);

  if (!translationUrl) return null;
  return (
    <>
      {currentPositionSec > 0 && currentDurationSec > 0 && (
        <View style={{ alignItems: 'center' }}>
          <Progress.Bar
            color={Colors.Teal}
            progress={currentPositionSec / currentDurationSec}
            width={Dimensions.get('window').width - 50}
          />
          <Row
            style={{
              paddingTop: 12,
              width: '90%',
              justifyContent: 'space-between',
            }}>
            <Icon name="replay" color={Colors.Navy} onPress={startPlay} />
            <Icon name="pause" color={Colors.Navy} onPress={onPausePlay} />
          </Row>
        </View>
      )}
      <View style={{ padding: 15 }}>
        <AnimText
          text={text}
          TextComp={Script.Medium}
          style={{ paddingHorizontal: 10, lineHeight: 35 }}
        />
      </View>
    </>
  );
};

export default TranslationLayout;
