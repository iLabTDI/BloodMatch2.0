import React, { useState } from "react";
import {
  View,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import handleGenericAPIRequest from "./api";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const fetchData = async (message) => {
    try {
      const answer = await handleGenericAPIRequest(message);
      console.log("Respuesta del bot: " + answer);

      const botMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: answer,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Bot",
          avatar: require("../assets/logotipo.png"),
        },
      };

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [botMessage])
      );
    } catch (e) {
      console.error("Error al procesar el mensaje: " + e);
    }
  };

  const onSend = (newMessages = []) => {
    const messageText = newMessages[0].text;
    console.log("Mensaje enviado: " + messageText);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    fetchData(messageText);
  };

  const renderSend = (props) => {
    return (
      <TouchableOpacity
        style={styles.sendButton}
        onPress={() => {
          if (props.text && props.onSend) {
            props.onSend({ text: props.text.trim() }, true);
          }
        }}
      >
        <Text style={styles.sendText}>Enviar</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <GiftedChat
            messages={messages}
            onSend={onSend}
            user={{
              _id: 1,
            }}
            renderSend={renderSend}
            alwaysShowSend
            scrollToBottom
          />
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#ADD8E6",  // Azul bajito
  },
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  sendButton: {
    backgroundColor: "#703efe",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
    marginTop:1,
  },
});

export default Chat;
