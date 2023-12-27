import axios from 'axios';
import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const KEY = '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';

export const audioToText = async (audio: any, lang: string) => {
  const formData = new FormData();
  formData.append('file', {
    name: 'hello.m4a',
    uri: Platform.OS === 'android' ? audio : audio.replace('file://', ''),
  });
  formData.append('model', 'whisper-1');
  formData.append(
    'prompt',
    'The response should be in english, translate if needed',
  );
  const res = await axios
    .post('https://api.openai.com/v1/audio/transcriptions', formData, {
      headers: {
        Authorization: `Bearer ${KEY}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .catch(err => {
      console.log(err);
    });

  if (lang === 'en') {
    return res.data.text;
  }

  const data = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        content: `translate the following to ${lang}: ${res.data.text}`,
        role: 'system',
      },
    ],
  };
  const res2 = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    data,
    {
      headers: {
        Authorization: `Bearer ${KEY}`,
        'Content-Type': 'application/json',
      },
    },
  );
  return res2.data.choices[0].message.content;
};

export const textToAudio = async (text: string, speed = 0.75) => {
  if (!text) {
    return Promise.reject('No text provided');
  }

  let path = RNFetchBlob.fs.dirs.DocumentDir;

  return RNFetchBlob.config({
    // add this option that makes response data to be stored as a file,
    // this is much more performant.
    fileCache: true,
    path: path + '/sound.mp3',
  })
    .fetch(
      'POST',
      'https://api.openai.com/v1/audio/speech',
      {Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json'},
      JSON.stringify({
        input: text,
        model: 'tts-1',
        voice: 'onyx',
        speed: speed,
      }),
    )
    .then(res => {
      // the temp file path
      return Platform.OS === 'ios' ? `file://${res.path()}` : res.path();
    });
};
