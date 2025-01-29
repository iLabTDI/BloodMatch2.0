import React, { useState, useContext } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image, Pressable,TouchableOpacity, Alert,  Modal, FlatList, Dimensions, ScrollView} from 'react-native';
import { ButtonGeneric } from '../components/Buttons';
import { Link } from "@react-navigation/native";
import Icono from 'react-native-vector-icons/FontAwesome'
import { Icon } from "@rneui/base";
import themeContext from "../helper/ThemeCon";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

//import { FlatList } from "react-native-gesture-handler";
import i18next, { language_resources } from "../helper/idiom-changer";
import languageList from "../components/languageList.json"
//import i18next, { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";
import adjust from "../assets/fonts/ajust.js";
import { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

const PlaceImage = require('../images/user.png');
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

//Cuando acepte un cliente que le de un alert de si desea mandar o no mensaje

// Pantalla utilizada de las configuraciones previas, modificaciones de funciones y de formato por parte de JJ y TERE
const Setting = ({ navigation }) => {

  const {t} = useTranslation(); //se utiliza para cambiar entre español e ingles el texto : (t("texto"))
  //cambio de idiomas JJ

  const changeLng = lng => {
    i18next.changeLanguage(lng)
    setVisible(false)
  };

  const [visible, setVisible] = useState(false)
  
  const teme = useContext(themeContext) //funcion para utilizar el darkMode
  //alerta para cuando el usuario hace click en soporte
  const contacto = () => {
    Alert.alert(
      (t("sup")),
      (t("contact", "3322114455") ),
      [
        {
          text: "OK"
        }
      ]
    )
    }
  //alerta creada para cuando el usuario quiere cerrar sesion o cambiarla (identificar cual es)
  const confi  = () => { 
    Alert.alert(
      (t("precaution")),
      (t("Confirmation")),
      [
        {
          text: (t("Yes")), onPress: () => {
            supabase.auth.signOut()
            navigation.push('Login')

          }
        },
        {
          text: (t("No")), onPress: () => {
          }
        }
      ]
    )
  }
  //alerta para cuando el usuario quiere eliminar su cuenta (falta configuracion logica para dar de baja el dato de la base de datos en caso de confirmacion del usuario)
  const elimina  = () => { 
    Alert.alert(
      (t("delacc")),
      (t("elimconf")),
      [
        {
          text: (t("Yes")), onPress: () => {
            navigation.push('Login')
            alert(t("accountelim"))
          }
        },
        {
          text: (t("No")), onPress: () => {
          }
        }
      ]
    )
  }

    return (
        /*se utiliza realiza el cambio a darkMode en el fondo JJ*/
        <View style={[styles.container, {backgroundColor: teme.background}]}>
          {/*Funcion para utilizar el boton del lenguaje, esta abre una pestaña y permite elegir el idioma de la aplicacion JJ*/} 
          <ScrollView >
          <Modal visible= {visible} onRequestClose={() => setVisible(false)}>
          <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setVisible(!visible)}>
              {/* <Text  style={[styles.textBack, {color: teme.color}]}> </Text> */}
              <Icono name="close" style={{fontSize: 30}} />
            </Pressable>
            <View style= {[styles.language, {backgroundColor: teme.background}]}>
              <FlatList data= {Object.keys(language_resources)} renderItem={({item})=> (
              <TouchableOpacity onPress={()=> changeLng(item)}>
                <Text style = {[styles.lngname, {color: teme.color}]}>
                  {languageList[item].nativeName}
                </Text>
              </TouchableOpacity>)}/>
              
            </View>
          </Modal>

          {/*Se utilizan en todos los botones el cambio de color del texto y {t("texto)} para modificar el lenguaje" ademas se realizan los push a otras pantallas para poder segui con la interaccion JJ*/}     
          
          <TouchableOpacity style={styles.button} onPress={()=> setVisible(true)}>
            <View style={styles.contOpc}>
              <Icono name="language" style={width >= 800 ? styles.tinyLogo : styles.tinyLogo5} />
              <Text style={[width >= 800 ? styles.text : styles.text5, {color: teme.color}]}>{t("change-language")} </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={() => navigation.push(t("profile"))}>
            <View style={styles.contOpc}>
              <Icono name="user" style={width >= 800 ? styles.tinyLogo : styles.tinyLogo5} />
              <Text style={[width >= 800 ? styles.text : styles.text5, {color: teme.color}]}>{t("Profile")} </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={confi}>
            <View style={styles.contOpc}>
              <Icono name="exchange" style={width >= 800 ? {fontSize: 35} : {fontSize: 25}} />
              <Text style={[width >= 800 ? styles.text : styles.text5, {color: teme.color}]}>{t("Cha-user")} </Text>      
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={confi}>
            <View style={styles.contOpc}>
              <Icono name="key" style={width >= 800 ? styles.tinyLogo : styles.tinyLogo5} />
              <Text style={[width >= 800 ? styles.text : styles.text5, {color: teme.color}]}>{t("Cha-pass")} </Text>
            </View>
          </TouchableOpacity>
            
          <TouchableOpacity style={styles.button} onPress={()=> navigation.push()}>
            <View style={styles.contOpc}>
              <Icono name="comment" style={width >= 800 ? styles.tinyLogo : styles.tinyLogo5} />
              <Text style={[width >= 800 ? styles.text : styles.text5, {color: teme.color}]}>{t("nots")} </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.push(t("themesel"))}>
            <View style={styles.contOpc}>
              <Icono name="mobile" style={width >= 800 ? {fontSize: 50} : {fontSize: 37}}/>
              <Text style={[width >= 800 ? styles.text : styles.text5, {color: teme.color}]}>{t("Theme")} </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <View style={styles.contOpc}>
              <Icon name="shield-check" type="octicon" size={width >= 800 ? height*.027 : height*.04} />
              <Text style={[width >= 800 ? styles.text : styles.text5, {color: teme.color}]}>{t("2pasos")} </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={elimina}>
            <View style={styles.contOpc}>
              <Icono name="trash" style={width >= 800 ? styles.tinyLogo : styles.tinyLogo5} />  
              <Text style={[width >= 800 ? styles.text : styles.text5, {color: teme.color}]}>{t("dlt-account")} </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={contacto}>
            <View style={styles.contOpc}>
              <Icono name="question-circle" style={width >= 800 ? styles.tinyLogo : styles.tinyLogo5} />
              <Text style={[width >= 800 ? styles.text : styles.text5, {color: teme.color}]}>{t("sup")} </Text>
            </View>
          </TouchableOpacity>
                
          <TouchableOpacity style={styles.button} onPress={() => navigation.push(t("termycondi"))}>
            <View style={styles.contOpc}>
              <Icono name="info-circle" style={width >= 800 ? styles.tinyLogo : styles.tinyLogo5} />
              <Text style={[width >= 800 ? styles.text : styles.text5, {color: teme.color}]}>{t("trm-y-con")} </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.push("Privacidad")}>
            <View style={styles.contOpc}>
              <Icono name="lock" style={width >= 800 ? {fontSize: 50} : {fontSize: 30}} />
              <Text style={[width >= 800 ? styles.text : styles.text5, {color: teme.color}]}>{t("priv")}</Text>
            </View>
          </TouchableOpacity>

          <Pressable style={[styles.contLogout, {backgroundColor: teme.bla}]} onPress={confi}>
            <Text style={[styles.textLogout,{color: teme.color}]}> <Icono name="sign-out" type='octicon' size={height*.027} style={styles.BackLogo} /> {t("log-out")} </Text>
            </Pressable>
            </ScrollView>
        </View>
        
      );
}
    
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'red',
      alignItems: 'stretch',
      
    },

    contLogout: {
      borderColor: '#000', 
      backgroundColor: 'blue',
      padding: '1.5%', 
      margin: '1%', 
      borderRadius: 15,
      alignSelf: 'center',
      borderWidth: 1,
      
  },
  contOpc:{
    paddingVertical: 7,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline"
  },
    text: {
      position: "absolute",
      left: 70,
      top:5,
      color:'#28398d', 
      fontSize: height*.027,
      alignSelf: 'flex-start',
      fontFamily: 'Verdana',
    },

    text5: {
      position: "absolute",
      left: 70,
      top:5,
      color:'#28398d', 
      fontSize: height*.027,
      alignSelf: 'flex-start',
      fontFamily: 'Verdana',
    }

    ,
    textLogout:{
      color:'black', 
      fontSize: height*.027,
      alignSelf: 'flex-start',
      fontFamily: 'Verdana',
    },
    BackLogo: {
      color:'#000', 
      fontWeight: 'bold', 
      //size: height*.05,
      alignSelf: 'center',

    },
    button: {
      alignItems: 'flex-start',
      padding: 15,
      borderColor:"black",
      borderRadius:"5",
      borderWidth:0.5,
      height:60
    },

    tinyLogo5:{
      fontSize: height*.04,
    },

    tinyLogo: {
      fontSize: height*.03,
    },
    language: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#ceecff'
    },
    lngname: {
      fontSize: 30,
      alignSelf: 'center',
      fontWeight: 'bold',
      fontStyle: 'Verdana'
    }
});

export default Setting