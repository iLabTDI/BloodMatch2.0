// import React, { useState, useContext } from "react";
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, View, Text, Image, Pressable,TouchableOpacity, Alert,  Modal, FlatList, Dimensions, ScrollView} from 'react-native';
// import { ButtonGeneric } from '../components/Buttons';
// import { Link } from "@react-navigation/native";
// import Icono from 'react-native-vector-icons/FontAwesome'
// import { Icon } from "@rneui/base";
// import themeContext from "../helper/ThemeCon";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// //import { FlatList } from "react-native-gesture-handler";
// import i18next, { language_resources } from "../helper/idiom-changer";
// import languageList from "../components/languageList.json"
// //import i18next, { changeLanguage } from "i18next";
// import { useTranslation } from "react-i18next";
// import adjust from "../assets/fonts/ajust.js";
// import { Session } from '@supabase/supabase-js'
// import { supabase } from '../lib/supabase'

// const PlaceImage = require('../images/user.png');
// const width = Dimensions.get("window").width;
// const height = Dimensions.get("window").height;

// //Cuando acepte un cliente que le de un alert de si desea mandar o no mensaje

// // Pantalla utilizada de las configuraciones previas, modificaciones de funciones y de formato por parte de JJ y TERE
// const Setting = ({ navigation }) => {

//   const {t} = useTranslation(); //se utiliza para cambiar entre español e ingles el texto : (t("texto"))
//   //cambio de idiomas JJ

//   const changeLng = lng => {
//     i18next.changeLanguage(lng)
//     setVisible(false)
//   };

//   const [visible, setVisible] = useState(false)
  
//   const teme = useContext(themeContext) //funcion para utilizar el darkMode
//   //alerta para cuando el usuario hace click en soporte
//   const contacto = () => {
//     Alert.alert(
//       (t("sup")),
//       (t("contact", "3322114455") ),
//       [
//         {
//           text: "OK"
//         }
//       ]
//     )
//     }
//   //alerta creada para cuando el usuario quiere cerrar sesion o cambiarla (identificar cual es)
//   const confi  = () => { 
//     Alert.alert(
//       (t("precaution")),
//       (t("Confirmation")),
//       [
//         {
//           text: (t("Yes")), onPress: () => {
//             supabase.auth.signOut()
//             navigation.push('Login')

//           }
//         },
//         {
//           text: (t("No")), onPress: () => {
//           }
//         }
//       ]
//     )
//   }
//   //alerta para cuando el usuario quiere eliminar su cuenta (falta configuracion logica para dar de baja el dato de la base de datos en caso de confirmacion del usuario)
//   const elimina  = () => { 
//     Alert.alert(
//       (t("delacc")),
//       (t("elimconf")),
//       [
//         {
//           text: (t("Yes")), onPress: () => {
//             navigation.push('Login')
//             alert(t("accountelim"))
//           }
//         },
//         {
//           text: (t("No")), onPress: () => {
//           }
//         }
//       ]
//     )
//   }

//     return (
//         /*se utiliza realiza el cambio a darkMode en el fondo JJ*/
//         <View style={[styles.container, {backgroundColor: teme.background}]}>
//           {/*Funcion para utilizar el boton del lenguaje, esta abre una pestaña y permite elegir el idioma de la aplicacion JJ*/} 
//           <ScrollView >
//           <Modal visible= {visible} onRequestClose={() => setVisible(false)}>
//           <Pressable
//               style={[styles.button, styles.buttonClose]}
//               onPress={() => setVisible(!visible)}>
//               {/* <Text  style={[styles.textBack, {color: teme.color}]}> </Text> */}
//               <Icono name="close" style={{fontSize: 30}} />
//             </Pressable>
//             <View style= {[styles.language, {backgroundColor: teme.background}]}>
//               <FlatList data= {Object.keys(language_resources)} renderItem={({item})=> (
//               <TouchableOpacity onPress={()=> changeLng(item)}>
//                 <Text style = {[styles.lngname, {color: teme.color}]}>
//                   {languageList[item].nativeName}
//                 </Text>
//               </TouchableOpacity>)}/>
              
//             </View>
//           </Modal>

//           {/*Se utilizan en todos los botones el cambio de color del texto y {t("texto)} para modificar el lenguaje" ademas se realizan los push a otras pantallas para poder segui con la interaccion JJ*/}     
          
//           <TouchableOpacity style={styles.button} onPress={()=> setVisible(true)}>
//             <View style={styles.contOpc}>
//               <Icono name="language" style={width >= 800 ? styles.tinyLogo : styles.tinyLogo5} />
//               <Text style={[width >= 800 ? styles.text : styles.text5, {color: teme.color}]}>{t("change-language")} </Text>
//             </View>
//           </TouchableOpacity>
          
//           <TouchableOpacity style={styles.button} onPress={() => navigation.push(t("profile"))}>
//             <View style={styles.contOpc}>
//               <Icono name="user" style={width >= 800 ? styles.tinyLogo : styles.tinyLogo5} />
//               <Text style={[width >= 800 ? styles.text : styles.text5, {color: teme.color}]}>{t("Profile")} </Text>
//             </View>
//           </TouchableOpacity>
          
//           <TouchableOpacity style={styles.button} onPress={confi}>
//             <View style={styles.contOpc}>
//               <Icono name="exchange" style={width >= 800 ? {fontSize: 35} : {fontSize: 25}} />
//               <Text style={[width >= 800 ? styles.text : styles.text5, {color: teme.color}]}>{t("Cha-user")} </Text>      
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.button} onPress={confi}>
//             <View style={styles.contOpc}>
//               <Icono name="key" style={width >= 800 ? styles.tinyLogo : styles.tinyLogo5} />
//               <Text style={[width >= 800 ? styles.text : styles.text5, {color: teme.color}]}>{t("Cha-pass")} </Text>
//             </View>
//           </TouchableOpacity>
            
//           <TouchableOpacity style={styles.button} onPress={()=> navigation.push()}>
//             <View style={styles.contOpc}>
//               <Icono name="comment" style={width >= 800 ? styles.tinyLogo : styles.tinyLogo5} />
//               <Text style={[width >= 800 ? styles.text : styles.text5, {color: teme.color}]}>{t("nots")} </Text>
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.button} onPress={() => navigation.push(t("themesel"))}>
//             <View style={styles.contOpc}>
//               <Icono name="mobile" style={width >= 800 ? {fontSize: 50} : {fontSize: 37}}/>
//               <Text style={[width >= 800 ? styles.text : styles.text5, {color: teme.color}]}>{t("Theme")} </Text>
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.button}>
//             <View style={styles.contOpc}>
//               <Icon name="shield-check" type="octicon" size={width >= 800 ? height*.027 : height*.04} />
//               <Text style={[width >= 800 ? styles.text : styles.text5, {color: teme.color}]}>{t("2pasos")} </Text>
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.button} onPress={elimina}>
//             <View style={styles.contOpc}>
//               <Icono name="trash" style={width >= 800 ? styles.tinyLogo : styles.tinyLogo5} />  
//               <Text style={[width >= 800 ? styles.text : styles.text5, {color: teme.color}]}>{t("dlt-account")} </Text>
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.button} onPress={contacto}>
//             <View style={styles.contOpc}>
//               <Icono name="question-circle" style={width >= 800 ? styles.tinyLogo : styles.tinyLogo5} />
//               <Text style={[width >= 800 ? styles.text : styles.text5, {color: teme.color}]}>{t("sup")} </Text>
//             </View>
//           </TouchableOpacity>
                
//           <TouchableOpacity style={styles.button} onPress={() => navigation.push(t("termycondi"))}>
//             <View style={styles.contOpc}>
//               <Icono name="info-circle" style={width >= 800 ? styles.tinyLogo : styles.tinyLogo5} />
//               <Text style={[width >= 800 ? styles.text : styles.text5, {color: teme.color}]}>{t("trm-y-con")} </Text>
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.button} onPress={() => navigation.push("Privacidad")}>
//             <View style={styles.contOpc}>
//               <Icono name="lock" style={width >= 800 ? {fontSize: 50} : {fontSize: 30}} />
//               <Text style={[width >= 800 ? styles.text : styles.text5, {color: teme.color}]}>{t("priv")}</Text>
//             </View>
//           </TouchableOpacity>

//           <Pressable style={[styles.contLogout, {backgroundColor: teme.bla}]} onPress={confi}>
//             <Text style={[styles.textLogout,{color: teme.color}]}> <Icono name="sign-out" type='octicon' size={height*.027} style={styles.BackLogo} /> {t("log-out")} </Text>
//             </Pressable>
//             </ScrollView>
//         </View>
        
//       );
// }
    
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#ceecff',
//       alignItems: 'stretch',
      
//     },

//     contLogout: {
//       borderColor: '#000', 
//       backgroundColor: '#fff',
//       padding: '1.5%', 
//       margin: '1%', 
//       borderRadius: 15,
//       alignSelf: 'center',
//       borderWidth: 1,
      
//   },
//   contOpc:{
//     paddingVertical: 7,
//     paddingHorizontal: 10,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "baseline"
//   },
//     text: {
//       position: "absolute",
//       left: 70,
//       top:5,
//       color:'#28398d', 
//       fontSize: height*.027,
//       alignSelf: 'flex-start',
//       fontFamily: 'Quicksand-Bold',
//     },

//     text5: {
//       position: "absolute",
//       left: 70,
//       top:5,
//       color:'#28398d', 
//       fontSize: height*.027,
//       alignSelf: 'flex-start',
//       fontFamily: 'Quicksand-Bold',
//     }

//     ,
//     textLogout:{
//       color:'#28398d', 
//       fontSize: height*.027,
//       alignSelf: 'flex-start',
//       fontFamily: 'Quicksand-Bold',
//     },
//     BackLogo: {
//       color:'#000', 
//       fontWeight: 'bold', 
//       //size: height*.05,
//       alignSelf: 'center',

//     },
//     button: {
//       alignItems: 'flex-start',
//       padding: 10,
//     },

//     tinyLogo5:{
//       fontSize: height*.04,
//     },

//     tinyLogo: {
//       fontSize: height*.03,
//     },
//     language: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 10,
//     backgroundColor: '#ceecff'
//     },
//     lngname: {
//       fontSize: 30,
//       alignSelf: 'center',
//       fontWeight: 'bold',
//       fontStyle: 'italic'
//     }
// });

// export default Setting







import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import {
  Globe,
  User,
  Users,
  Lock,
  Bell,
  Moon,
  Shield,
  Trash2,
  HelpCircle,
  FileText,
  Eye,
  LogOut,
  ChevronRight,
} from "react-native-feather";
import i18next, { language_resources } from "../helper/idiom-changer";
import languageList from "../components/languageList.json";
import { useTranslation } from "react-i18next";
import adjust from "../assets/fonts/ajust.js";
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

import ModalLanguajes from "@/components/ModalLanguajes";

const SettingItem = ({ icon: Icon, title, onPress }) => (
  <TouchableOpacity className="flex-row items-center py-4 px-6 border-b border-gray-200" onPress={onPress}>
    <Icon stroke="#FF4136" width={24} height={24} />
    <Text className="flex-1 ml-4 text-base text-gray-800">{title}</Text>
    <ChevronRight stroke="#9CA3AF" width={20} height={20} />
  </TouchableOpacity>
)

const SettingsGroup = ({ title, children }) => (
  <View className="mb-6">
    <Text className="px-6 py-2 text-sm font-semibold text-gray-500 uppercase">{title}</Text>
    {children}
  </View>
)

const confi  = () => { 
  Alert.alert(
    (t("precaution")),
    (t("Confirmation")),
    [
      {
        text: (t("Yes")), onPress: () => {
          supabase.auth.signOut();
          navigation.push('Login');
        }
      },
      {
        text: (t("No")), onPress: () => {
        }
      }
    ]
  )
}

const changeLng = lng => {
  if(lng === "" || lng === null || lng === undefined) return;
  i18next.changeLanguage(lng);
};

const SettingsScreen = ({navigation}) => {

  const {t} = useTranslation();

  const [modalLanguajeVisible, setModalLanguajeVisible] = useState(false);
  
  const handleSettingPress = (setting) => {
    console.log(`Pressed: ${setting}`);
    switch (setting) {
      case "Idioma":
        setModalLanguajeVisible(true);
        break;
      case "":
        
        break;
      case "":
        
        break;
      case "Términos y condiciones":
        navigation.push(t("termycondi"))
        break;
      case "Cerrar sesión":
        confi();
        break;
      default:
        break;
    }
    
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <SettingsGroup title="Cuenta">
          <SettingItem icon={Globe} title={t("language")} onPress={() => handleSettingPress("Idioma")} />
          <SettingItem icon={User} title="Perfil" onPress={() => handleSettingPress("Perfil")} />
          <SettingItem icon={Users} title="Cambiar usuario" onPress={() => handleSettingPress("Cambiar usuario")} />
          <SettingItem
            icon={Lock}
            title="Cambiar contraseña"
            onPress={() => handleSettingPress("Cambiar contraseña")}
          />
        </SettingsGroup>

        <SettingsGroup title="Preferencias">
          <SettingItem icon={Bell} title="Notificaciones" onPress={() => handleSettingPress("Notificaciones")} />
          <SettingItem icon={Moon} title="Tema" onPress={() => handleSettingPress("Tema")} />
          <SettingItem
            icon={Shield}
            title="Verificación de dos pasos"
            onPress={() => handleSettingPress("Verificación de dos pasos")}
          />
        </SettingsGroup>

        <SettingsGroup title="Privacidad y Seguridad">
          <SettingItem icon={Trash2} title="Eliminar cuenta" onPress={() => handleSettingPress("Eliminar cuenta")} />
          <SettingItem icon={Eye} title="Privacidad" onPress={() => handleSettingPress("Privacidad")} />
        </SettingsGroup>

        <SettingsGroup title="Ayuda y Legal">
          <SettingItem icon={HelpCircle} title="Soporte" onPress={() => handleSettingPress("Soporte")} />
          <SettingItem
            icon={FileText}
            title="Términos y condiciones"
            onPress={() => handleSettingPress("Términos y condiciones")}
          />
        </SettingsGroup>

        <View className="mt-6 mb-8">
          <TouchableOpacity
            className="flex-row items-center justify-center py-2 px-6 bg-red-500 m-auto rounded-full"
            onPress={() => handleSettingPress("Cerrar sesión")}
          >
            <LogOut stroke="#FFFFFF" width={24} height={24} />
            <Text className="ml-2 text-base font-bold text-white">Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {
        modalLanguajeVisible && 
          <ModalLanguajes
            onClose={() => setModalLanguajeVisible(false)}
            onAccept={(languaje) => {
              changeLng(languaje);
              setModalLanguajeVisible(false);
            }}
          />
      }

    </SafeAreaView>
  )
}

export default SettingsScreen;

