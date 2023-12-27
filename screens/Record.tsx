import {Button, FAB, Icon} from '@rneui/themed';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  Platform,
  SafeAreaView,
  View,
  useColorScheme,
} from 'react-native';
import {routes} from './homeStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import * as Progress from 'react-native-progress';
import {Menu, Divider, Provider} from 'react-native-paper';

import {MainStackParams} from './params';
import theme, {Colors} from '../theme';
import {
  Heading,
  Label,
  Paragraph,
  Script,
  TextMed,
  TextReg,
} from '../components/Text/text';
import {audioToText, textToAudio} from '../helpers/ai';
import RNFetchBlob from 'rn-fetch-blob';
import AnimText from '../components/Text/animText';

const langMap = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  it: 'Italian',
  pt: 'Portuguese',
  ru: 'Russian',
  zh: 'Chinese',
  ja: 'Japanese',
  ko: 'Korean',
};

type Props = {
  navigation: NativeStackNavigationProp<MainStackParams, 'Home'>;
};

const audioRecorderPlayer = new AudioRecorderPlayer();

const dirs = RNFetchBlob.fs.dirs;
const path = Platform.select({
  ios: 'hello.m4a',
  android: `${dirs.CacheDir}/hello.mp3`,
});

function Record({navigation}: Props) {
  const [recordSecs, setRecordSecs] = React.useState(0);
  const [recordTime, setRecordTime] = React.useState('00:00:00');
  const [currentPositionSec, setCurrentPositionSec] = React.useState(0);
  const [currentDurationSec, setCurrentDurationSec] = React.useState(0);
  const [playTime, setPlayTime] = React.useState('00:00:00');
  const [duration, setDuration] = React.useState('00:00:00');
  const [resText, setResText] = React.useState('');
  const [translationUrl, setTranslationUrl] = React.useState('');
  const [language, setLanguage] = React.useState('en');
  const [showLangModal, setShowLangModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onStartRecord = async () => {
    setResText('');
    setCurrentDurationSec(0);
    setCurrentPositionSec(0);
    const result = await audioRecorderPlayer.startRecorder(path);
    audioRecorderPlayer.addRecordBackListener(e => {
      setRecordSecs(e.currentPosition / 1000);
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      return;
    });
    console.log(result);
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordSecs(0);
    setLoading(true);
    audioToText(result, langMap[language]).then(res => {
      setResText(res);
      textToAudio(res).then(audioUrl => {
        setLoading(false);
        onStartPlay(audioUrl);
        setTranslationUrl(audioUrl);
      });
    });
  };

  const onStartPlay = async (url: string) => {
    await audioRecorderPlayer.startPlayer(url);
    audioRecorderPlayer.addPlayBackListener(e => {
      if (currentDurationSec !== e.duration / 1000) {
        setCurrentDurationSec(e.duration / 1000);
      }
      setCurrentPositionSec(e.currentPosition / 1000);
      setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
      return;
    });
  };

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  const onStopPlay = async () => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  return (
    <Provider>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <View style={{padding: 20}}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', padding: 15}}>
            <Paragraph.Medium>
              Translate to:{' '}
              <Heading.XSmall onPress={() => setShowLangModal(true)}>
                {langMap[language as keyof typeof langMap]}
              </Heading.XSmall>
            </Paragraph.Medium>
            <Menu
              visible={showLangModal}
              onDismiss={() => setShowLangModal(false)}
              anchor={
                <Icon
                  onPress={() => setShowLangModal(true)}
                  name="arrow-drop-down"
                />
              }>
              {Object.keys(langMap).map(lang => (
                <Menu.Item
                  onPress={() => {
                    setLanguage(lang);
                    setShowLangModal(false);
                  }}
                  title={langMap[lang as keyof typeof langMap]}
                />
              ))}
            </Menu>
          </View>
          <Label.Medium style={{paddingHorizontal: 10, textAlign: 'center'}}>
            Press and hold to record
          </Label.Medium>
          <View>
            <FAB
              icon={{name: 'microphone', type: 'material-community'}}
              onPressIn={onStartRecord}
              onPressOut={onStopRecord}
              delayPressIn={100}
              size="small"
              style={{marginVertical: 20}}
            />
            {loading && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color={Colors.Mint} />
              </View>
            )}
          </View>

          {recordSecs > 0 && (
            <View style={{padding: 15}}>
              <Progress.Bar
                color={Colors.Mint}
                progress={recordSecs / 30}
                width={Dimensions.get('window').width - 80}
              />
            </View>
          )}
          {currentPositionSec > 0 && currentDurationSec > 0 && (
            <>
              <Progress.Bar
                progress={currentPositionSec / currentDurationSec}
                width={Dimensions.get('window').width - 50}
              />
              <View style={{flexDirection: 'row', paddingTop: 5}}>
                <Icon
                  name="replay"
                  color={Colors.LightLime}
                  onPress={() => onStartPlay(translationUrl)}
                />
                <Icon
                  name="pause"
                  color={Colors.LightLime}
                  onPress={onPausePlay}
                />
              </View>
            </>
          )}
          <View style={{padding: 15}}>
            <AnimText
              text={resText}
              TextComp={Script.Medium}
              style={{paddingHorizontal: 10}}
            />
          </View>
          {/* <Button onPress={onStartRecord}>Record</Button>
        <Button onPress={onStopRecord} color="secondary">
          Stop
        </Button> */}
          {/* <Button onPress={onStartPlay} color="warning">
        Play
      </Button>
      <Button onPress={onPausePlay} color="error">
        Pause
      </Button>
      <Button onPress={onStopPlay} color="error">
        Stop
      </Button>
      <Script.Medium style={{paddingHorizontal: 10}}>
        Saved recording
      </Script.Medium>
      <View style={{padding: 25}}>
        {currentPositionSec > 0 && currentDurationSec > 0 && (
          <Progress.Bar
            progress={currentPositionSec / currentDurationSec}
            width={Dimensions.get('window').width - 50}
          />
        )}
      </View> */}
        </View>
        {/* <Modal visible={showLangModal} animationType="slide">
          <View>
            {Object.keys(langMap).map(lang => (
              <Label.Medium
                onPress={() => {
                  setLanguage(lang);
                  setShowLangModal(false);
                }}>
                {langMap[lang as keyof typeof langMap]}
              </Label.Medium>
            ))}
          </View>
        </Modal> */}
      </SafeAreaView>
    </Provider>
  );
}

export default Record;
