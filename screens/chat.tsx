import {Button, Icon} from '@rneui/themed';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  View,
  useColorScheme,
} from 'react-native';
import {routes} from './homeStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParams} from './params';
import theme, {Colors} from '../theme';
import {Menu, Divider, Provider} from 'react-native-paper';
import {
  Heading,
  Paragraph,
  Script,
  TextMed,
  TextReg,
} from '../components/Text/text';
import {GiftedChat, IMessage, Send, SendProps} from 'react-native-gifted-chat';
import Logo from '../components/views/Logo';
import {fetchExp, loadConv} from '../helpers/ai';
import {langMap} from '../helpers/constants';
import {Modal, Portal, PaperProvider} from 'react-native-paper';

function Chat() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [systemIsTyping, setSystemIsTyping] = useState(false);
  const [language, setLanguage] = React.useState('en');
  const [showLangModal, setShowLangModal] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [modalText, setModalText] = React.useState('');
  const [loadingExplanation, setLoadingExplanation] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // TODO system messages, explain, voice, etc

  // todo user write in native lang or learning lang?

  // TODO user can write in the language they are learning, detect and fix.

  const onSend = useCallback(
    (nm: IMessage[]) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, nm));
      setSystemIsTyping(true);
      loadConv(
        [
          ...messages
            .map(m => ({
              role: m.user?._id === 2 ? 'system' : 'user',
              content: m.text,
            }))
            .reverse(),
          {role: 'user', content: nm[0].text},
        ],
        langMap[language as keyof typeof langMap],
      ).then(res => {
        setSystemIsTyping(false);
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, [
            {
              _id: res.id,
              text: res.text,
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'LangAi',
              },
            },
          ]),
        );
      });
    },
    [language, messages],
  );

  const fetchExplanation = async (text?: string) => {
    showModal();
    setLoadingExplanation(true);
    const res = await fetchExp(text, 'english');
    setLoadingExplanation(false);
    setModalText(res.text);
  };

  const renderSend = (props: SendProps<IMessage>) => {
    return (
      <Send {...props}>
        <View
          style={{marginRight: 10, justifyContent: 'center', height: '100%'}}>
          <Icon name="send" color={Colors.Teal} />
        </View>
      </Send>
    );
  };

  return (
    <Provider>
      <SafeAreaView
        style={{flexDirection: 'row', alignItems: 'center', margin: 15}}>
        <Paragraph.Medium>
          Chat in:{' '}
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
                setMessages([]);
              }}
              title={langMap[lang as keyof typeof langMap]}
            />
          ))}
        </Menu>
      </SafeAreaView>
      <GiftedChat
        messages={messages}
        isTyping={systemIsTyping}
        onSend={mm => onSend(mm)}
        user={{
          _id: 1,
        }}
        renderSend={renderSend}
        renderMessage={props => {
          return (
            <View>
              <View
                style={{
                  margin: 10,
                  padding: 10,
                  borderColor: Colors.Teal,
                  borderRadius: 10,
                  borderWidth: 1,
                  alignSelf:
                    props.position === 'right' ? 'flex-end' : 'flex-start',
                }}>
                <Paragraph.Small>{props?.currentMessage?.text}</Paragraph.Small>
              </View>
              {props.currentMessage?.user._id === 2 && (
                <View style={{alignSelf: 'flex-start', paddingLeft: 10}}>
                  <Icon
                    name="info"
                    onPress={() =>
                      fetchExplanation(props?.currentMessage?.text)
                    }
                  />
                </View>
              )}
            </View>
          );
        }}
      />
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
          {loadingExplanation ? (
            <ActivityIndicator />
          ) : (
            <Script.Medium>{modalText}</Script.Medium>
          )}
        </Modal>
      </Portal>
    </Provider>
  );
}

export default Chat;
