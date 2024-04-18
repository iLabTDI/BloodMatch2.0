import React, { useState } from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import intentsData from '../screens/intents.json';
import getApi from './api'
import axios from 'axios';
import handleGenericAPIRequest from "./api";


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
          avatar: require('../assets/bot.jpeg'),
        },
      };
      setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));
    } else {
      const errorMessage = "Lo siento, no entendí tu pregunta.";
      const botMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: errorMessage,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Blood Besti',
          avatar: require('../assets/bot.jpeg'),
        },
      };
      setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));
    }
  };

  
  
     
  const getRandomResponse = (responses) => {
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  };

    const fetchData = async(message) => {
      try{

        const answer = await handleGenericAPIRequest(message)
        console.log("siiiiuuuu"+answer)
        const botMessage = {
          _id: Math.round(Math.random() * 1000000),
          text: answer,
          createdAt: new Date(),
          user: {
              _id: 2,
              name: 'Bot',
              avatar: require('../assets/bot.jpeg'),
          },
      };
        setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));
    }catch(e){
      console.log("noooooooooooooooooooooo"+ e)


    }



  };


  const onSend = (newMessages = []) => {
    const messageText = newMessages[0].text;
    console.log(messageText)
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
   
    fetchData(messageText)
   
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
          
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Chat;
