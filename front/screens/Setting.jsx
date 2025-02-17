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





// * * * * * * * * * * * * * * * * * * * * * * * * * * HOME VIEW * * * * * * * * * * * * * * * * * * * * * * * * * *

  // import React, { useState, useRef } from 'react';
  // import { View, Text, Image, Animated, PanResponder, Dimensions, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, ScrollView, Platform, StyleSheet } from 'react-native';
  // import { styled } from 'nativewind';
  // import { Heart, X, MessageCircle, MapPin, User, Settings, Search } from 'react-native-feather';
  // import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
  // import Constants from 'expo-constants';
  // import { Picker } from '@react-native-picker/picker';
  // import ModalFilters from './components/ModalFilters';

  // const StyledView = styled(View);
  // const AnimatedView = Animated.createAnimatedComponent(StyledView);

  // const SCREEN_WIDTH = Dimensions.get('window').width;
  // const SCREEN_HEIGHT = Dimensions.get('window').height;

  // const users = [
  //   { id: 1, name: 'María', age: 28, bloodType: 'A+', description: 'Donadora de sangre disponible cerca de ti', image: require('./assets/logotipo.png') },
  //   { id: 2, name: 'Carlos', age: 35, bloodType: 'O-', description: 'Necesito donación urgente', image: require('./assets/logotipo.png') },
  //   { id: 3, name: 'Carlos', age: 35, bloodType: 'AB+', description: 'Necesito donación urgente', image: require('./assets/logotipo.png') },
  //   { id: 4, name: 'Carlos', age: 35, bloodType: 'O-', description: 'Necesito donación urgente', image: require('./assets/logotipo.png') },
  //   { id: 5, name: 'Carlos', age: 35, bloodType: 'A+', description: 'Necesito donación urgente', image: require('./assets/logotipo.png') },
  //   { id: 6, name: 'Carlos', age: 35, bloodType: 'A-', description: 'Necesito donación urgente', image: require('./assets/logotipo.png') }
  // ];

  // const Card = ({ user, pan, panResponders }) => (
  //   <AnimatedView
  //     className="absolute w-[300px] h-[400px] bg-white rounded-xl shadow-lg"
  //     style={{
  //       transform: [{ translateX: pan.x }, { translateY: pan.y }],
  //     }}
  //     {...panResponders.panHandlers}
  //   >
  //     <Image source={user.image} className="w-full h-3/4 rounded-t-xl" />
  //     <View className="p-4">
  //       <Text className="text-xl font-bold">{user.name}, {user.age}</Text>
  //       <Text className="text-lg font-semibold text-red-500">{user.bloodType}</Text>
  //       <Text className="text-sm text-gray-600">{user.description}</Text>
  //       <View className="mt-2 bg-green-500 rounded-full px-3 py-1 self-start">
  //         <Text className="text-white font-semibold">Disponible para donar</Text>
  //       </View>
  //     </View>
  //   </AnimatedView>
  // );

  // const HomeTab = () => {
  //   const [currentIndex, setCurrentIndex] = useState(0);
  //   const [showModalFilter, setShowModalFilter] = useState(false);
  //   const pan = useState(new Animated.ValueXY())[0];

  //   const panResponders = PanResponder.create({
  //     onMoveShouldSetPanResponder: () => true,
  //     onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
  //     onPanResponderRelease: (_, gesture) => {
  //       if (gesture.dx > 120) {
  //         Animated.spring(pan, {
  //           toValue: { x: SCREEN_WIDTH + 100, y: gesture.dy },
  //           useNativeDriver: false,
  //         }).start(() => {
  //           setCurrentIndex(currentIndex + 1);
  //           pan.setValue({ x: 0, y: 0 });
  //         });
  //         console.log(`Match con ${users[currentIndex].name}`);
  //       } else if (gesture.dx < -120) {
  //         Animated.spring(pan, {
  //           toValue: { x: -SCREEN_WIDTH - 100, y: gesture.dy },
  //           useNativeDriver: false,
  //         }).start(() => {
  //           setCurrentIndex(currentIndex + 1);
  //           pan.setValue({ x: 0, y: 0 });
  //         });
  //         console.log(`Reject  ${users[currentIndex].name}`);
  //       } else {
  //         Animated.spring(pan, {
  //           toValue: { x: 0, y: 0 },
  //           useNativeDriver: false,
  //         }).start();
  //       }
  //     },
  //   });

  //   const handleMatch = () => {
  //     Animated.timing(pan, {
  //       toValue: { x: SCREEN_WIDTH + 100, y: 0 },
  //       duration: 300,
  //       useNativeDriver: false,
  //     }).start(() => {
  //       setCurrentIndex(currentIndex + 1);
  //       pan.setValue({ x: 0, y: 0 });
  //     });
  //     console.log(`Match con ${users[currentIndex].name}`);
  //   };

  //   const handleReject = () => {
  //     Animated.timing(pan, {
  //       toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
  //       duration: 300,
  //       useNativeDriver: false,
  //     }).start(() => {
  //       setCurrentIndex(currentIndex + 1);
  //       pan.setValue({ x: 0, y: 0 });
  //     });
  //     console.log(`Reject  ${users[currentIndex].name}`);
  //   };

  //   return (
  //     <KeyboardAvoidingView 
  //       behavior={Platform.OS === "ios" ? "padding" : "height"}
  //       className="flex-1 bg-gray-100"
  //     >
  //       <TouchableOpacity onPress={() => setShowModalFilter(true)} className="bg-white p-4 border-b border-gray-200" style={styles.search}>
  //         <View className="flex-row items-center bg-gray-100 rounded-full px-2 py-2 pr-5">
  //           <TouchableOpacity
  //             className="flex-1 ml-2 text-base"
  //             onPress={() => setShowModalFilter(true)}
  //           >
  //             <Text className="text-[#9CA3AF]">Buscar donantes o receptores según ...</Text>
  //           </TouchableOpacity> 
  //           <FontAwesome5 name="sliders-h" size={24} color="black" />
  //         </View>
  //       </TouchableOpacity>
  //       <ScrollView 
  //         contentContainerStyle={{ flexGrow: 1 }}
  //         keyboardShouldPersistTaps="handled"
  //       >
  //         <View className="flex-1 items-center justify-center">
  //           <Card user={users[currentIndex]} pan={pan} panResponders={panResponders} />
  //           <View className="flex-row justify-between w-full mt-8 mb-4 px-2">
  //             <TouchableOpacity
  //               className="bg-red-500 w-16 h-16 rounded-full items-center justify-center"
  //               onPress={handleReject}
  //             >
  //               <X stroke="white" width={32} height={32} />
  //             </TouchableOpacity>
  //             <TouchableOpacity
  //               className="bg-green-500 w-16 h-16 rounded-full items-center justify-center"
  //               onPress={handleMatch}
  //             >
  //               <Heart stroke="white" fill="white" width={32} height={32} />
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //       </ScrollView>
  //       {showModalFilter && <ModalFilters onClose={() => setShowModalFilter(false)}/>}
  //     </KeyboardAvoidingView>
  //   );
  // };

  // const ChatbotTab = () => (
  //   <View className="flex-1 items-center justify-center bg-gray-100">
  //     <Text className="text-xl">Chatbot</Text>
  //   </View>
  // );

  // const LocationTab = () => (
  //   <View className="flex-1 items-center justify-center bg-gray-100">
  //     <Text className="text-xl">Ubicación</Text>
  //   </View>
  // );

  // const MessagesTab = () => (
  //   <View className="flex-1 items-center justify-center bg-gray-100">
  //     <Text className="text-xl">Mensajes</Text>
  //   </View>
  // );

  // const ProfileTab = () => (
  //   <View className="flex-1 items-center justify-center bg-gray-100">
  //     <Text className="text-xl">Perfil</Text>
  //   </View>
  // );

  // const SettingsTab = () => (
  //   <View className="flex-1 items-center justify-center bg-gray-100">
  //     <Text className="text-xl">Ajustes</Text>
  //   </View>
  // );

  // const tabs = [
  //   { key: 'home', title: 'Inicio', icon: Heart, component: HomeTab },
  //   { key: 'chatbot', title: 'Chatbot', icon: MessageCircle, component: ChatbotTab },
  //   { key: 'location', title: 'Ubicación', icon: MapPin, component: LocationTab },
  //   { key: 'messages', title: 'Mensajes', icon: MessageCircle, component: MessagesTab },
  //   { key: 'profile', title: 'Perfil', icon: User, component: ProfileTab },
  //   { key: 'settings', title: 'Ajustes', icon: Settings, component: SettingsTab },
  // ];

  // export default function HomeScreen() {
  //   const [activeTab, setActiveTab] = useState('home');

  //   const renderTabBar = () => (
  //     <View className="flex-row bg-white border-t border-gray-200">
  //       {tabs.map((tab) => {
  //         const isFocused = activeTab === tab.key;
  //         const Icon = tab.icon;
  //         return (
  //           <TouchableOpacity
  //             key={tab.key}
  //             className={`flex-1 items-center justify-center py-4 ${isFocused ? 'bg-red-50' : ''}`}
  //             onPress={() => setActiveTab(tab.key)}
  //           >
  //             <Icon stroke={isFocused ? '#EF4444' : '#6B7280'} width={24} height={24} />
  //             <Text className={`text-xs mt-1 ${isFocused ? 'text-red-500' : 'text-gray-500'}`}>
  //               {tab.title}
  //             </Text>
  //           </TouchableOpacity>
  //         );
  //       })}
  //     </View>
  //   );

  //   const ActiveComponent = tabs.find(tab => tab.key === activeTab)?.component || HomeTab;

  //   return (
  //     <SafeAreaView className="flex-1 bg-gray-100">
  //       <KeyboardAvoidingView 
  //         behavior={Platform.OS === "ios" ? "padding" : "height"}
  //         className="flex-1"
  //       >
  //         <View className="flex-1">
  //           <ActiveComponent />
  //         </View>
  //         {renderTabBar()}
  //       </KeyboardAvoidingView>
  //     </SafeAreaView>
  //   );
  // }

  // const styles = StyleSheet.create({
  //   search: {
  //     marginTop: Constants.statusBarHeight
  //   }
  // });











// * * * * * * * * * * * * * * * * * * * * * * * * * * PROFILE VIEW * * * * * * * * * * * * * * * * * * * * * * * * * *
// import { useState } from "react"
// import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from "react-native"
// import { styled } from "nativewind"
// import { Camera, MapPin, Mail, User, Droplet } from "react-native-feather"

// const StyledView = styled(View)
// const StyledText = styled(Text)
// const StyledImage = styled(Image)
// const StyledTouchableOpacity = styled(TouchableOpacity)
// const StyledScrollView = styled(ScrollView)
// const StyledSafeAreaView = styled(SafeAreaView)

// const ProfileScreen = () => {
//   const [profileImage, setProfileImage] = useState(require("./assets/logotipo.png"))

//   const handleEditProfileImage = () => {
//     // Aquí iría la lógica para cambiar la imagen de perfil
//     console.log("Editar imagen de perfil")
//   }

//   return (
//     <StyledSafeAreaView className="flex-1 bg-gray-100">
//       <StyledScrollView>
//         <StyledView className="items-center pt-8 pb-6 bg-red-500">
//           <StyledView className="relative">
//             <StyledImage source={profileImage} className="w-32 h-32 rounded-full border-4 border-white" />
//             <StyledTouchableOpacity
//               onPress={handleEditProfileImage}
//               className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md"
//             >
//               <Camera stroke="#FF4136" width={20} height={20} />
//             </StyledTouchableOpacity>
//           </StyledView>
//           <StyledText className="mt-4 text-2xl font-bold text-white">Juan Pérez</StyledText>
//         </StyledView>

//         <StyledView className="px-4 py-6">
//           <ProfileItem icon={Mail} label="Correo" value="juan.perez@example.com" />
//           <ProfileItem icon={User} label="Género" value="Masculino" />
//           <ProfileItem icon={Droplet} label="Tipo de sangre" value="O+" />
//           <ProfileItem icon={MapPin} label="Ubicación" value="Ciudad de México, México" />
//         </StyledView>

//         <StyledTouchableOpacity className="mx-4 bg-red-500 py-3 px-6 rounded-full items-center">
//           <StyledText className="text-white font-bold text-lg">Editar Perfil</StyledText>
//         </StyledTouchableOpacity>
//       </StyledScrollView>
//     </StyledSafeAreaView>
//   )
// }

// const ProfileItem = ({ icon: Icon, label, value }) => (
//   <StyledView className="flex-row items-center mb-4">
//     <StyledView className="bg-red-100 p-2 rounded-full mr-4">
//       <Icon stroke="#FF4136" width={24} height={24} />
//     </StyledView>
//     <StyledView>
//       <StyledText className="text-gray-600 text-sm">{label}</StyledText>
//       <StyledText className="text-gray-800 font-semibold">{value}</StyledText>
//     </StyledView>
//   </StyledView>
// )

// export default ProfileScreen




// * * * * * * * * * * * * * * * * * * * * * * * * * * CHATS VIEW * * * * * * * * * * * * * * * * * * * * * * * * * *
// import { useState } from "react"
// import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, TextInput } from "react-native"
// import { Search, ChevronRight } from "react-native-feather"

// const chats = [
//   {
//     id: "1",
//     name: "María González",
//     avatar: require("./assets/logotipo.png"),
//     lastMessage: "Gracias por tu donación, me has salvado la vida!",
//     timestamp: "10:30 AM",
//     unread: 2,
//   },
//   {
//     id: "2",
//     name: "Carlos Rodríguez",
//     avatar: require("./assets/logotipo.png"),
//     lastMessage: "¿Cuándo estarás disponible para donar?",
//     timestamp: "Ayer",
//     unread: 0,
//   },
//   {
//     id: "3",
//     name: "Ana Martínez",
//     avatar: require("./assets/logotipo.png"),
//     lastMessage: "Necesito tu tipo de sangre urgentemente",
//     timestamp: "Lun",
//     unread: 1,
//   }
// ]

// const MessagesScreen = () => {
//   const [searchQuery, setSearchQuery] = useState("")

//   const renderChatItem = ({ item }) => (
//     <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200">
//       <Image source={item.avatar} className="w-12 h-12 rounded-full mr-4" />
//       <View className="flex-1">
//         <View className="flex-row justify-between items-center">
//           <Text className="font-bold text-lg text-gray-800">{item.name}</Text>
//           <Text className="text-sm text-gray-500">{item.timestamp}</Text>
//         </View>
//         <Text numberOfLines={1} className="text-gray-600 mt-1">
//           {item.lastMessage}
//         </Text>
//       </View>
//       <View className="flex-row items-center">
//         {item.unread > 0 && (
//           <View className="bg-red-500 rounded-full w-6 h-6 items-center justify-center mr-2">
//             <Text className="text-white font-bold text-xs">{item.unread}</Text>
//           </View>
//         )}
//         <ChevronRight stroke="#9CA3AF" width={20} height={20} />
//       </View>
//     </TouchableOpacity>
//   )

//   const filteredChats = chats.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <View className="p-4 border-b border-gray-200">
//         <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2">
//           <Search stroke="#9CA3AF" width={20} height={20} />
//           <TextInput
//             className="flex-1 ml-2 text-base text-gray-700"
//             placeholder="Buscar chats"
//             placeholderTextColor="#9CA3AF"
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//           />
//         </View>
//       </View>
//       <FlatList
//         data={filteredChats}
//         renderItem={renderChatItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ flexGrow: 1 }}
//         ListEmptyComponent={
//           <View className="flex-1 items-center justify-center">
//             <Text className="text-gray-500 text-lg">No se encontraron chats</Text>
//           </View>
//         }
//       />
//     </SafeAreaView>
//   )
// }

// export default MessagesScreen


// * * * * * * * * * * * * * * * * * * * * * * * * * * CHAT VIEW * * * * * * * * * * * * * * * * * * * * * * * * * *

// import { useState, useRef, useEffect } from "react"
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   FlatList,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native"
// import { styled } from "nativewind"
// import { ArrowLeft, Send, Phone, Video } from "react-native-feather"

// const StyledView = styled(View)
// const StyledText = styled(Text)
// const StyledImage = styled(Image)
// const StyledTouchableOpacity = styled(TouchableOpacity)
// const StyledTextInput = styled(TextInput)
// const StyledSafeAreaView = styled(SafeAreaView)
// const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView)

// const initialMessages = [
//   { id: "1", text: "Hola, ¿cómo estás?", sender: "other", timestamp: "10:00 AM" },
//   { id: "2", text: "¡Hola! Estoy bien, gracias. ¿Y tú?", sender: "me", timestamp: "10:02 AM" },
//   {
//     id: "3",
//     text: "Muy bien. ¿Estás disponible para donar sangre esta semana?",
//     sender: "other",
//     timestamp: "10:05 AM",
//   },
//   { id: "4", text: "Sí, claro. ¿Cuándo necesitas la donación?", sender: "me", timestamp: "10:07 AM" },
//   { id: "5", text: "¿Te parece bien este jueves por la tarde?", sender: "other", timestamp: "10:10 AM" },
// ]

// const ChatScreen = () => {
//   const [messages, setMessages] = useState(initialMessages)
//   const [inputMessage, setInputMessage] = useState("")
//   const flatListRef = useRef(null)

//   useEffect(() => {
//     if (flatListRef.current) {
//       flatListRef.current.scrollToEnd({ animated: true })
//     }
//   }, [flatListRef]) //Fixed dependency

//   const handleSendMessage = () => {
//     if (inputMessage.trim() === "") return

//     const newMessage = {
//       id: String(messages.length + 1),
//       text: inputMessage,
//       sender: "me",
//       timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//     }

//     setMessages([...messages, newMessage])
//     setInputMessage("")
//   }

//   const renderMessage = ({ item }) => (
//     <StyledView className={`mb-2 ${item.sender === "me" ? "items-end" : "items-start"}`}>
//       <StyledView className={`p-3 rounded-2xl ${item.sender === "me" ? "bg-red-500" : "bg-gray-200"}`}>
//         <StyledText className={`${item.sender === "me" ? "text-white" : "text-gray-800"}`}>{item.text}</StyledText>
//       </StyledView>
//       <StyledText className="text-xs text-gray-500 mt-1">{item.timestamp}</StyledText>
//     </StyledView>
//   )

//   return (
//     <StyledSafeAreaView className="flex-1 bg-white">
//       <StyledKeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
//         {/* Header */}
//         <StyledView className="flex-row items-center p-4 border-b border-gray-200">
//           <StyledTouchableOpacity>
//             <ArrowLeft stroke="#FF4136" width={24} height={24} />
//           </StyledTouchableOpacity>
//           <StyledImage source={require("./assets/logotipo.png")} className="w-10 h-10 rounded-full mx-3" />
//           <StyledView className="flex-1">
//             <StyledText className="font-bold text-lg">María González</StyledText>
//             <StyledText className="text-sm text-gray-500">En línea</StyledText>
//           </StyledView>
//           <StyledTouchableOpacity className="mr-4">
//             <Phone stroke="#FF4136" width={24} height={24} />
//           </StyledTouchableOpacity>
//           <StyledTouchableOpacity>
//             <Video stroke="#FF4136" width={24} height={24} />
//           </StyledTouchableOpacity>
//         </StyledView>

//         {/* Messages */}
//         <FlatList
//           ref={flatListRef}
//           data={messages}
//           renderItem={renderMessage}
//           keyExtractor={(item) => item.id}
//           contentContainerStyle={{ padding: 16 }}
//         />

//         {/* Input */}
//         <StyledView className="flex-row items-center border-t border-gray-200 p-2">
//           <StyledTextInput
//             className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2"
//             placeholder="Escribe un mensaje..."
//             value={inputMessage}
//             onChangeText={setInputMessage}
//           />
//           <StyledTouchableOpacity onPress={handleSendMessage}>
//             <Send stroke="#FF4136" width={24} height={24} />
//           </StyledTouchableOpacity>
//         </StyledView>
//       </StyledKeyboardAvoidingView>
//     </StyledSafeAreaView>
//   )
// }

// export default ChatScreen



// * * * * * * * * * * * * * * * * * * * * * * * * * * CONFIG VIEW * * * * * * * * * * * * * * * * * * * * * * * * * *
"use client"
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from "react-native"
import { styled } from "nativewind"
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
} from "react-native-feather"

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

const SettingsScreen = () => {
  const handleSettingPress = (setting) => {
    console.log(`Pressed: ${setting}`)
    // Aquí iría la lógica para navegar a la pantalla correspondiente
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <SettingsGroup title="Cuenta">
          <SettingItem icon={Globe} title="Lenguaje" onPress={() => handleSettingPress("Lenguaje")} />
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
    </SafeAreaView>
  )
}

export default SettingsScreen

