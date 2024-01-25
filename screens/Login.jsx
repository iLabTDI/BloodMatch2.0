import React, { useState, useEffect, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { ButtonGeneric } from '../components/Buttons';
import {validateEmail} from '../helper/validations/validationEmail';
import {validatePassword} from '../helper/validations/validationPassw';
import { size } from "lodash";
import { useTranslation } from "react-i18next";
import themeContext from "../helper/ThemeCon";
import { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
const PlaceImage = require('../assets/logotipo.png');


const LogIn= (props) => {
    const {t} = useTranslation(); //variable utilizada para traducir el texto de español al ingles y viceversa
    const {navigation} = props;
    const teme = useContext(themeContext); // variable utilizada para aplicar los estilos a las pantallas del darkMode
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")


    useEffect(() => {
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (session) {
          try {
            const data = session.user;
            const userUserId = data.id;
            navigation.navigate('Home');
          } catch (error) {
            console.error('Error al obtener los códigos:', error);
          }
        }
      });
      }, [navigation]);
    const DoSigIn = async(username, password) =>{
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: username,
          password: password,
        })
      }catch (error){
        console.error(error);
      }
    }
    //modificar esto para utilizar bien la base de datos
      const validateData = () => {
        
          let isValid = true
        {
          if(!validateEmail(email)) {
              setErrorEmail("Debe de ingresar un correo válido.")
              isValid = false
          }
  
          if(!validatePassword(password) || size(password)<8) {
              setErrorPassword("Debe de ingresar una contraseña válido.")
              isValid = false
          }
        }
         //navigation.navigate('Home')

          console.log(isValid)
          return isValid
        }
    
    return (
        <View style={styles.container}>
            <Image source={PlaceImage} style={styles.image}/>
            <TextInput style = {[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]} 
                placeholder="  Email"
                value={email}
                onChangeText={val => setEmail(val)}
                error={errorEmail}
                defaultValue={email}
            />{/* Utilizacion del darkmode cambiando el fondo del cuadro de texto y el color de la letra*/} 
            <TextInput style = {[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]} 
                placeholder= "  Contraseña"
                password = {true}
                secureTextEntry={true}
                value={password}
                onChangeText={val => setPassword(val)}
                error={errorPassword}
                defaultValue={password}
            />

            <TouchableOpacity style={{marginEnd:'10%', alignSelf:'flex-end'}}
                onPress={() => registerUser()}>
                <Text style={styles.textLink}>{t("fpass")}</Text>
            </TouchableOpacity>
            
            <ButtonGeneric text= {t("log-in")}
                onPress = {() => DoSigIn(email,password) 
                } 
            />
            <TouchableOpacity style={styles.regisButton} onPress = {() => { navigation.navigate('SignIn') } } > 
                <Text style={{...styles.textLink, marginStart:'40%'}}>{t("rgst")}</Text>
            </TouchableOpacity> 
            <StatusBar style="auto" />        
        </View>

      );
}

// en iniciar sesión se manda llamar la función DoSigIn
    
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
        width:'83%',
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

export default LogIn