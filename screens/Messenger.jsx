//Modificaciones del Messenger por Alex Robles
import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, FlatList, Image } from 'react-native';
import { Searchbar } from 'react-native-paper';
import themeContext from "../helper/ThemeCon";
import { supabase } from '../lib/supabase'; // Importa tu cliente de Supabase

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Messenger = ({ navigation }) => {
    const theme = useContext(themeContext);

    // Registros de conversaciones locales de prueba
    const conversationsData = [
        {
            id_conversacion: 1,
            user2_name: "Usuario2",
            last_message: "Hola, ¿cómo estás?",
            last_message_time: "10:30 AM",
            avatar: require("../assets/usuario.png") 
        },
        {
            id_conversacion: 2,
            user2_name: "Usuario3",
            last_message: "Buenas tardes, vi tu anuncio.",
            last_message_time: "11:15 AM",
            avatar: require("../assets/usuario.png") 
        }
    ];

    const [originalConversations, setOriginalConversations] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [search, setSearch] = useState('');

    const fetchConversations = async () => {
        const { data, error } = await supabase
            .from('messenger')
            .select('*');
        
        if (error) {
            console.error('Error al obtener conversaciones:', error.message);
        } else {
            console.log('Conversaciones recuperadas:', data);
            setConversations(data);
            setOriginalConversations(data); // Guarda las conversaciones originales
        }
    };

    const handleSearch = async (text) => {
        setSearch(text);

        if (text === '') {
            // Si el texto de búsqueda está vacío, restaura las conversaciones originales
            setConversations(originalConversations);
        } else {
            // Filtra las conversaciones cuyo nombre de usuario coincida con el término de búsqueda
            const filteredConversations = originalConversations.filter(conversation => 
                conversation.user2_name.toLowerCase().includes(text.toLowerCase())
            );
            setConversations(filteredConversations);
        }
    };

    //useEffect para mostrar las conversaciones de prueba de forma local
    useEffect(() => {
        setConversations(conversationsData);
    }, []);

    //useEffect(() => {
    //   fetchConversations();
    //}, []);

    const renderConversationItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.conversationItem} onPress={() => handleConversationPress(item)}>
                <Image source={item.avatar} style={styles.avatar} />
                <View style={styles.textContainer}>
                    <Text style={styles.userName}>{item.user2_name}</Text>
                    <Text style={styles.lastMessage}>{item.last_message}</Text>
                </View>
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{item.last_message_time}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const handleConversationPress = (conversation) => {
        navigation.navigate('Chat', { conversation });
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Searchbar
                maxLength={250}
                inputStyle={styles.searchBarInput}
                style={[styles.searchBar, { backgroundColor: theme.bla, color: theme.color }]}
                placeholder="Buscar"
                value={search}
                onChangeText={handleSearch}
            />
            <FlatList
                data={conversations}
                keyExtractor={(item) => item.id_conversacion.toString()}
                renderItem={renderConversationItem}
                style={styles.conversationList}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyText}>No existen conversaciones con el usuario que buscaste.</Text>
                )}
            />
            {conversations.length === 0 && console.log("No existen conversaciones con el usuario que buscaste")}
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 1,
        width: width * 1,
    },
    searchBar: {
        padding: 1,
        marginTop: height * 0.01,
        width: '75%',
    },
    searchBarInput: {
        fontSize: height * 0.02,
        fontFamily: 'Quicksand-Regular',
    },
    conversationList: {
        flex: 1,
        width: '100%',
    },
    conversationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: '3%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginVertical: '1.5%',
        width: '95%',
        borderColor: '#000',
        borderWidth: 1,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: '3%',
    },
    textContainer: {
        flex: 1,
        marginRight: '3%',
    },
    userName: {
        fontSize: height * 0.022,
        fontFamily: 'Quicksand-Bold',
    },
    lastMessage: {
        fontSize: height * 0.018,
        color: '#888',
    },
    timeContainer: {
        justifyContent: 'center',
    },
    timeText: {
        fontSize: height * 0.018,
        color: '#888',
    },
    emptyText: {
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 18,
        color: '#888',
    }
});

export default Messenger;