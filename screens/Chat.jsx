import React, { useState } from 'react';
import { View, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import intentsData from '../screens/conversacion.json';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const handleChatResponse = (userMessage) => {
    const { intents } = intentsData;
    
    const intent = intents.find((intent) =>
      intent.patterns.some((pattern) => userMessage.toLowerCase().includes(pattern.toLowerCase()))
    );

    if (intent) {
      const randomResponse = getRandomResponse(intent.responses);
      const botMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: randomResponse,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Blood Besti',
          avatar: 'https://www.gaceta.udg.mx/wp-content/uploads/2022/05/tp.cucei_ilg-scaled.jpg',
        },
      };
      setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));
    } else {
      const errorMessage = "Lo siento, no entendí tu pregunta. Revisa que la pregunta este bien escrita";
      const botMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: errorMessage,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Blood Besti',
          avatar: 'https://www.gaceta.udg.mx/wp-content/uploads/2022/05/tp.cucei_ilg-scaled.jpg',
        },
      };
      setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));
    }
  };

  const getRandomResponse = (responses) => {
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  };

  const onSend = (newMessages = []) => {
    const messageText = newMessages[0].text;
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    handleChatResponse(messageText);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
          renderBubble={(props) => (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: 'red',
                },
                left: {
                  backgroundColor: 'white',
                },
              }}
            />
          )}
          renderSend={(props) => (
            <Send {...props}>
              <View>
                <MaterialCommunityIcons name="send-circle" size={45} color="#2e64e5" />
              </View>
            </Send>
          )}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dec5c1', // Cambia aquí el color de fondo a tu preferencia
  },
});

export default Chat;