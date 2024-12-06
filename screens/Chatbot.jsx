import React, { useState } from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import handleGenericAPIRequest from "./api";


const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [count, setCount] = useState(0); 


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
              avatar: require('../assets/images/icon.png'),
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
