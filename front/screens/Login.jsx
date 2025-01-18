import React, { useState, useContext ,useEffect} from 'react';
import { StyleSheet, View, Image, TextInput, TouchableOpacity, Text, Alert ,Keyboard,FlatList} from 'react-native';

import { ButtonGeneric } from '../components/Buttons';
import { useTranslation } from "react-i18next";
import themeContext from "../helper/ThemeCon";
const PlaceImage = require('../assets/logotipo.png');
import { getDates } from '../lib/querys';
import  { setGlobalData } from "../backend/querys/inserts/New_email";
import NetInfo from '@react-native-community/netinfo';
const LogIn = (props) => {
    
    const { navigation } = props;
    const { t } = useTranslation();
    const theme = useContext(themeContext);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [errorUserName, setErrorUserName] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [isConnected, setIsConnected] = useState(false);

    const DoSignIn = async () => {

        
        try {
           const data=await getDates(user, password)
           const usuario = data[0];
            if (usuario && usuario.password === password) {
               setGlobalData('usuario', user);// en caso de que la contrasena y el usuario sean validos pasamos los datos para utilizarlos despues(rauf)
               Alert.alert("inicio de sesion exitoso")
                navigation.push('Home');
            } else {
                Alert.alert('Error', 'Usuario o contraseña incorrectos.');
            }

        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            alert.apply("error")
        }
    };
    useEffect(() => {
        //anado un listener para que al momento de cambiar de estado se refleje en tiempo real
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
            console.log("Estado de la conexion:", state.isConnected);
        });
    
        
        return () => unsubscribe();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Image source={PlaceImage} style={styles.image} />
            <TextInput
                style={[styles.textInput, { backgroundColor: theme.bla }, { color: theme.color }]}
                placeholder="Usuario"
                value={user}
                onChangeText={val => setUser(val)}
                error={errorUserName}
            />
            <TextInput
                style={[styles.textInput, { backgroundColor: theme.bla }, { color: theme.color }]}
                placeholder="Contraseña"
                secureTextEntry={true}
                value={password}
                onChangeText={val => setPassword(val)}
                error={errorPassword}
            />
            <ButtonGeneric
                text={t("log-in")}
                onPress={() => {
                    isConnected ? DoSignIn() :Alert.alert("no hay connection a internet aaaa")
                }}

            />
              <TouchableOpacity style={styles.regisButton} onPress={() => { navigation.navigate('new-reg') }}>
                <Text style={{ ...styles.textLink, marginStart: '40%' }}>{t("rgst")}</Text>
            </TouchableOpacity>
           
        
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a3a3ff',
        alignItems: 'center',
    },
    image: {
        marginTop: '27%',
        marginVertical: 10,
        width: 203,
        height: 310,
    },
    textInput: {
        width: '83%',
        height: 40,
        borderRadius: 10,
        marginVertical: 7,
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 16,
        backgroundColor: '#fff'
    },
    textLink: {
        color: '#fff',
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 15.5,
    },
    regisButton: {
        borderRadius: 10,
        marginVertical: 13,
        paddingVertical: 11,
        width: '84%',
        flexDirection: 'row',
        borderColor: '#fff',
        borderWidth: 1,
    }
});

export default LogIn;
