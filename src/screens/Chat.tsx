import { Icon } from '@rneui/themed';
import React, { useCallback, useContext, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Colors } from '../../theme';
import { Script } from '../atoms/Text';
import { GiftedChat, IMessage, Send } from 'react-native-gifted-chat';
import { fetchExp, loadConv } from '../../helpers/ai';
import { Modal, Portal } from 'react-native-paper';
import AppHeader from '../organisms/AppHeader';
import ChatComponent from '../organisms/ChatComponent';
import { LangContext, LangContextType } from '../context/lang/langContext';

function Chat() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { lang } = useContext(LangContext) as LangContextType;
  const [systemIsTyping, setSystemIsTyping] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [loadingExplanation, setLoadingExplanation] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

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
          { role: 'user', content: nm[0].text },
        ],
        lang,
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
    [lang, messages],
  );

  const fetchExplanation = async (text?: string) => {
    showModal();
    setLoadingExplanation(true);
    const res = await fetchExp(text, 'en');
    setLoadingExplanation(false);
    setModalText(res.text);
  };

  return (
    <>
      <AppHeader />
      <ChatComponent
        messages={messages}
        onSend={onSend}
        systemIsTyping={systemIsTyping}
        fetchExplanation={fetchExplanation}
      />
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}>
          {loadingExplanation ? (
            <ActivityIndicator />
          ) : (
            <Script.Medium>{modalText}</Script.Medium>
          )}
        </Modal>
      </Portal>
    </>
  );
}

export default Chat;
