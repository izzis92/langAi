import React, { useCallback } from 'react';
import { View } from 'react-native';
import {
  GiftedChat,
  GiftedChatProps,
  IMessage,
  MessageProps,
  Send,
  SendProps,
} from 'react-native-gifted-chat';
import { styles } from './styles';
import { Paragraph } from '../../atoms/Text';
import { Icon } from '@rneui/themed';
import { Colors } from '../../../theme';

type ChatComponentProps = GiftedChatProps & {
  systemIsTyping?: boolean;
  fetchExplanation: (text?: string) => void;
};
const ChatComponent = ({
  messages,
  onSend,
  systemIsTyping,
  fetchExplanation,
}: ChatComponentProps) => {
  const renderMessage = useCallback((props: MessageProps<IMessage>) => {
    return (
      <View>
        <View
          style={[
            styles.message,
            {
              alignSelf: props.position === 'right' ? 'flex-end' : 'flex-start',
            },
          ]}>
          <Paragraph.Small>{props?.currentMessage?.text}</Paragraph.Small>
        </View>
        {props.currentMessage?.user._id === 2 && (
          <View style={{ alignSelf: 'flex-start', paddingLeft: 10 }}>
            <Icon
              name="info"
              onPress={() => fetchExplanation(props?.currentMessage?.text)}
            />
          </View>
        )}
      </View>
    );
  }, []);

  const renderSend = (props: SendProps<IMessage>) => {
    return (
      <Send {...props}>
        <View style={styles.send}>
          <Icon name="send" color={Colors.Teal} />
        </View>
      </Send>
    );
  };

  return (
    <GiftedChat
      messages={messages}
      isTyping={systemIsTyping}
      onSend={onSend}
      user={{
        _id: 1,
      }}
      renderSend={renderSend}
      renderMessage={renderMessage}
    />
  );
};

export default ChatComponent;
