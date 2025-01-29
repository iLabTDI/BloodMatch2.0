import React, { useState, useContext ,useEffect} from 'react';
import { StyleSheet, View, Image, TextInput, TouchableOpacity, Text, Alert ,Keyboard,FlatList} from 'react-native';

import { ButtonGeneric } from '../components/Buttons';
import { useTranslation } from "react-i18next";
import themeContext from "../helper/ThemeCon";
const PlaceImage = require('../assets/logotipo.png');
import { getDates } from '../lib/querys';
import  { setGlobalData } from "../backend/querys/inserts/New_email";
const LogIn = (props) => {
    
    const { navigation } = props;
    const { t } = useTranslation();
    const theme = useContext(themeContext);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [errorUserName, setErrorUserName] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
   
    const [second, setSecond] = useState("");
    const [allChatRooms, setAllChatRooms] = useState([]);

    const [ data,setData]=useState("")
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
   

    
 

    return (
        <View style={[styles.container, { backgroundColor: "white" }]}>
            
            <View style={{marginTop:-50}}>
                <Image source={PlaceImage} style={styles.image} />
            </View>

            <View style={{marginTop:10,width:"70%"}}>
            
            <View style={{marginLeft:23}}>
                <Text style={{fontSize:18,marginTop:10}}>
                    Usuario
                </Text>
            </View>
            
            <TextInput
                style={[styles.textInput, { backgroundColor: "white" }, {padding: 10}, { color: theme.color },{marginTop:10}]}
                value={user}
                onChangeText={val => setUser(val)}
                error={errorUserName}
            />
            <View style={{marginLeft:23}}>
                <Text style={{fontSize:18,marginTop:10}}>
                    Contraseña
                </Text>
            </View>

            <TextInput
                style={[styles.textInput, { backgroundColor: "white" },{padding: 10},{marginTop:10}]}
                secureTextEntry={true}
                value={password}
                onChangeText={val => setPassword(val)}
                error={errorPassword}
            />
            <TouchableOpacity style={styles.loginButton} onPress={() => { DoSignIn()}}>
                <Text style={{ color:"white",fontStyle:"Italic", marginStart: '35%' }}>Iniciar sesion</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.regisButton} onPress={() => { navigation.navigate('new-reg') }}>
                <Text style={{ color:"white",fontStyle:"Italic", marginStart: '35%' }}>{t("rgst")}</Text>
            </TouchableOpacity>

            </View>
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
        height:210,
    },
    textInput: {
        width: '83%',
        height: 50,
        borderRadius: 10,
        marginVertical: 8,
        marginHorizontal:20,
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 16,
        backgroundColor: 'black',
        borderRadius:5,
        borderWidth:1,
        padding:10,
        marginTop:24,
    },
    textLink: {
        color: '#fff',
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 15.5,
    },
    regisButton: {
        borderRadius: 10,
        marginVertical: 15,
        marginHorizontal:18,
        paddingVertical: 11,
        width: '84%',
        flexDirection: 'row',
        borderColor: '#fff',
        borderWidth: 1,
        backgroundColor:"black",
    },
    loginButton:{
            borderRadius: 10,
            marginVertical: 15,
            marginHorizontal:18,
            paddingVertical: 11,
            width: '84%',
            flexDirection: 'row',
            borderColor: '#fff',
            borderWidth: 1,
            backgroundColor:"red",
    },
});

export default LogIn;
