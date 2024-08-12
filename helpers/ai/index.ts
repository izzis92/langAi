import axios from 'axios';
import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { LangKey } from '../../src/context/lang/langContext';
import { LangMap } from '../constants';
import Config from 'react-native-config';

// Secret key for OpenAI API
const KEY = Config.OPENAI_KEY;

export const audioToText = async (path: any, lang: LangKey) => {
  const formData = new FormData();
  formData.append('file', {
    name: 'hello.m4a',
    uri: Platform.OS === 'android' ? path : path.replace('file://', ''),
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
        content: `translate the following to ${LangMap[lang]}: ${res.data.text}`,
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

export const fetchExp = async (text?: string, lang?: LangKey) => {
  if (!text) {
    return Promise.reject('No text provided');
  }

  const data = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `Break down the following message to smaller parts, and explain in ${
          LangMap[lang || 'en']
        }: "${text}".`,
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

  return { id: res2.data.id, text: res2.data.choices[0].message.content };
};

export const loadConv = async (messages: any[], lang: LangKey) => {
  if (!messages || messages.length === 0) {
    return Promise.reject('No text provided');
  }

  // reverse the messages so that the last message is the first one, and add system flag
  const data = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `Hi, I will be speaking to you in ${LangMap[lang]} so that you can learn`,
      },
      ...messages,
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
  return { id: res2.data.id, text: res2.data.choices[0].message.content };
};

export const textToAudio = async (text: string, speed = 0.99) => {
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
      { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
      JSON.stringify({
        input: text,
        model: 'tts-1',
        voice: 'nova',
        speed: speed,
      }),
    )
    .then(res => {
      // the temp file path
      return Platform.OS === 'ios' ? `file://${res.path()}` : res.path();
    });
};
