//Tere

import React, {useContext, useState, useEffect, useCallback} from "react";
import { StatusBar } from 'expo-status-bar';
//import { Divider } from '@rneui/themed';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import { Avatar, Bubble, GiftedChat, MessageText, Send } from 'react-native-gifted-chat';
import { ButtonGeneric } from '../components/Buttons';
import { Directions, FlatList, TextInput } from "react-native-gesture-handler";
import themeContext from "../helper/ThemeCon";
import { color } from "@rneui/base";
import adjust from "../assets/fonts/ajust.js";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Chat = ({ navigation }) => {
  const teme = useContext(themeContext)
  //Contenedor del mensaje
  const [messages, setMessages] = useState([]);
  
  //Cambio de estado de los mensajes
  useEffect(() => {
    setMessages([
        {
            _id: 1,
            text: 'Hello developer, Hello developer, Hello developer, Hello developer, Hello developer, Hello developer, Hello developer, Hello developer, Hello developer, ',
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'React Native',
                avatar: require('../images/user.png'),
            },
        },
    ])
}, []);

//Mensajes enviados
const onSend = useCallback((messages = []) => {
  setMessages(previousMessages =>
    GiftedChat.append(previousMessages, messages),
  )
}, [])

//Funcion para editar el icono de enviar
const renderSend = (props) => {
  return (
    <Send { ... props}>
        <View>
          <MaterialCommunityIcons name = 'send-circle' size={adjust(35)} color='#2e64e5'/>
        </View>
    </Send>
  );
}

//Funcion para editar el texto de los mensajes
const renderMessageText = (props) => {
  return(
    <MessageText {... props}
    textStyle={{
      right: {
        fontSize: adjust(16),
        //alignSelf: 'center',
        fontFamily: 'Quicksand-Regular',
      },
      left:{
        fontSize: adjust(16),
        //alignSelf: 'center',
        fontFamily: 'Quicksand-Regular',
      }
    }}

    />
  );
}

//Funcion para editar el icono del boton hasta abajo
const scrollToBottomComponent = (props) => {
  return(
    <FontAwesome
      name='angle-double-down'
      size={30}
      color='#333' 
    />
  );
}

//Pantalla principal
return (
    <View style={[styles.container, {backgroundColor: teme.background}]}>
      {/*funcion giftedChat, libreria para mostrar mensajes */} 
      <GiftedChat
            messages={messages}
            renderMessageText={renderMessageText}
            onSend={messages => onSend(messages)}
            user={{
              _id: 1,
            }}
            alwaysShowSend
            renderSend={renderSend}
            placeholder={'Escribir mensaje ...'}
            scrollToBottom
            scrollToBottomComponent={scrollToBottomComponent}

        />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ceecff',
      height: height*1,
      width: width*1,
    },
});

export default Chat