//Modificaciones del Chat por Alex Robles
import React, { useState, useEffect } from 'react';
import { View, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from '../lib/supabase'; // Importa tu cliente de Supabase

const Chat = ({ route }) => {
  const { conversation } = route.params; // Obtén la conversación pasada como parámetro de navegación

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages(); // Carga los mensajes al cargar el componente
  }, []);

  const fetchMessages = async () => {
    try {
      if (!conversation.id) {
          console.error('ID de conversación no válido');
          return;
      }

      // Realiza una consulta a Supabase para obtener los mensajes de la conversación
      const { data, error } = await supabase
          .from('chat')
          .select('*')
          .eq('conversacion_id', conversation.id);

      if (error) {
          throw error;
      }

      // Transforma los mensajes recibidos al formato esperado por GiftedChat
      const formattedMessages = data.map((message) => ({
          _id: message.id_mensaje,
          text: message.texto_mensaje,
          createdAt: new Date(message.timestamp),
          user: {
              _id: message.sender_id,
              name: message.sender_name,
              avatar: message.sender_avatar,
          },
      }));

      // Actualiza el estado con los mensajes obtenidos
      setMessages(formattedMessages);
    } catch (error) {
        console.error('Error fetching messages:', error.message);
    }
  };

  const onSend = async (newMessages = []) => {
    const messageText = newMessages[0].text;
    try {
      // Inserta el nuevo mensaje en la tabla de chat en Supabase
      const { data, error } = await supabase
        .from('chat') // Cambiar a 'chat' en lugar de 'messages'
        .insert([
          {
            conversacion_id: conversation.id,
            sender_id: 1, // Cambia el ID del remitente según tu lógica de autenticación
            sender_name: 'Nombre del Remitente', // Cambia el nombre del remitente según tu lógica de autenticación
            texto_mensaje: messageText,
          },
        ]);

      if (error) {
        throw error;
      }

      // Agrega el nuevo mensaje al estado para actualizar la interfaz
      setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };

  // Agrega la conversación de prueba entre Usuario1 y Usuario2 al cargar el componente
  useEffect(() => {
    const initialMessage = {
      _id: 1,
      text: "Hola, ¿Cómo estás?",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Usuario2",
      },
    };
    setMessages([initialMessage]);
  }, []);

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