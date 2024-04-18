import React, { useState, useContext } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { ButtonGeneric } from '../components/Buttons';
import { validateUser } from '../helper/validations/validationUser';
import { validatePassword } from '../helper/validations/validationPassw';
import { size } from "lodash";
import { useTranslation } from "react-i18next";
import themeContext from "../helper/ThemeCon";
import { supabase } from '../lib/supabase';
import Customfer from "./Customer";
import  { setGlobalData } from "../backend/querys/inserts/New_email";
import { getGlobalData } from '../backend/querys/inserts/New_email';


const PlaceImage = require('../assets/logotipo.png');
const read=(props)=>{

console.log(props)

}

const LogIn = (props) => {
    
    const { navigation } = props;
    const { t } = useTranslation();
    const theme = useContext(themeContext);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [errorUserName, setErrorUserName] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const DoSignIn = async () => {
        try {
            console.log(user)
            console.log(password)
            const { data, error } = await supabase
                .from('usuarios')
                .select('*')
                .eq('UserName',user)
                .eq('password',password);
                
                
            if (error) {
                return;
            }

            const usuario = data[0];

            if (usuario && usuario.password === password) {
                
                
         
              // console.log("se le pasa este usuario=",user);
                setGlobalData('usuario', user);// en caso de que la contrasena y el usuario sean validos pasamos los datos para utilizarlos despues(rauf)
               
                
                

                navigation.push('Home');
                //navigation.push('Chat');
                
            } else {
                Alert.alert('Error', 'Usuario o contraseña incorrectos.');
            }

        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
        }
    };


     // function to check  dates form the database (rauf)
    const print = async () => {
        try {
            const { data, error } = await supabase.from('usuarios').select('*');
    
            if (error) {
                throw error;
            }
    
            if (!data || data.length === 0) {
                console.log("No se encontraron datos.");
           
            } else {
                console.log("Datos recibidos:", data);
            }
        } catch (error) {
            console.error("Error:", error);
           
        }
    }
    

    const validateData = () => {
        let isValid = true;

        if (!validateUser(user)) {
            setErrorUserName("Debe ingresar un nombre de usuario válido.");
            isValid = false;
        }

        if (!validatePassword(password) || size(password) < 8) {
            setErrorPassword("Debe ingresar una contraseña válida.");
            isValid = false;
        }

        return isValid;
    };

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
                    //if (validateData()) {
                        DoSignIn();
                        //print();

                   // }
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
