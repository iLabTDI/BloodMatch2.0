import React, {useState, useContext, useEffect} from "react";import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, View, TextInput, Text, Button, TouchableOpacity, Modal, ScrollView, Image,Dimensions} from "react-native";
import DatePicker from "react-native-modern-datepicker"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
//import * as ImagePicker from 'expo-image-picker';

//Validaciones
import  { setGlobalImage } from "../backend/querys/inserts/New_Image";
import  { getGlobalImage } from "../backend/querys/inserts/New_Image";
import { validateName } from '../helper/validations/validationName';
import { validatePassword } from "../helper/validations/validationPassw";
//import { validateEmail } from "../helper/validations/validationEmail";
import { validatePhone } from "../helper/validations/validationPhone"
import { ValidateJalisco } from "../helper/validations/validationCity"
import { validateDate } from "../helper/validations/validationDate"
import { validateGender } from "../helper/validations/validationGender"
import { StateVal } from "../helper/validations/validationState"
import { Bloodtype } from "../helper/validations/validationTypeBlood"
import { validateUser } from "../helper/validations/validationUser"
import { ConfirmPass} from "../helper/validations/validationConPass"
import { ModalPicker, ModalPickerg } from "../components/ModalPicker";
import { size } from "lodash";
import themeContext from "../helper/ThemeCon";
import 'react-native-url-polyfill/auto';

//Agregar para subir foto
import * as ImagePicker from 'expo-image-picker';
import { ButtonGeneric } from '../components/Buttons';
import Picker from "react-native-picker";
import { useIsFocused } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { supabase } from "../lib/supabase";
import New_User from "../backend/querys/inserts/New_User";

import Customer from "./Customer";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const PlaceImage = require('../assets/logotipo.png');
//apartado para seleccionar la imagen


const NewReg = (props) => {
    const { t } = useTranslation();
    const { navigation } = props;
    const teme = useContext(themeContext);

    const [registroCompleto, setRegistroCompleto] = useState(false);
    const [image, setImage] = useState(require('../images/user.png'));
    const [gen, setGen] = useState(t('slcgen'));
    const [type, setType] = useState(t('slctype'));
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState('');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [passcon, setPasscon] = useState("")
    const [email, setEmail] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const[url,setUrl] = useState("")

    const [errorType, setErrorType] = useState('');
    const [errorGen, setErrorGen] = useState('');
    const [errorDate, setErrorDate] = useState('');
    const [errorFirstName, setErrorFirstName] = useState("")
    const [errorLastname, setErrorLastName] = useState("")
    const [errorPhone, setErrorPhone] = useState("")
    const [errorUser, setErrorUser] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorPasscon, setErrorPasscon] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorState, setErrorState] = useState("")
    const [errorCity, setErrorCity] = useState("")
    const imageExtern=getGlobalImage("images");
  
    const [isModalVisible, setisModalVisible] = useState(false);
    const [isModalVisibleg, setisModalVisibleg] = useState(false);
  
    const [currentView, setCurrentView] = useState(0);
  
    const totalViews = 16; // Número total de vistas de nuestra app
   
  
  //funcion creada para manejar la vista, esta nos permite ir hacia el frente hayamos ingresado o no datos (de momento)
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true
    });
    console.log(" lo que imprime es",result.uri);
    if (!result.cancelled) {
      console.log("lo que se va a enviar es=",result.uri);
      setGlobalImage("images",result.uri);
      Alert.alert("imagen guardada");
      
      
  
    }
  };
  const handleNextView = () => {
    // Verificar que se hayan ingresado todos los datos antes de pasar a la siguiente vista
    if (currentView === totalViews - 1) {
      // Verificar que la contraseña no sea nula antes de registrar al usuario
      if (password === '') {
        Alert.alert(
          "Error",
          "Debes ingresar una contraseña",
          [{ text: "OK", onPress: () => {} }]
        );

      } else {
        if(handleView()){
          setCurrentView(currentView + 1);
        }
      }
    } else {
      // Si no estamos en la última vista, simplemente pasamos a la siguiente
      if(handleView()){
        setCurrentView(currentView + 1);
      }
    }
  };
  

 //Con esta funcion controlamos la regresion de las vistas se modifica totalViwes dependiendo del numero de vistas que existan la app
    const handlePrevView = () => {
        if (currentView < totalViews && currentView != totalViews-13) {
            setCurrentView(currentView -1);
            if (currentView == totalViews-13){
              setCurrentView(navigation.navigate("Login"));
            }
        }
    };

  //Funcion creada para controlar los picker (fecha, genero y tipo de sangre)
    const handleInputChange = (text, field) => {
      switch (field) {
        case 'type':
          setType(text);
          break;
        case 'gen':
          setGen(text);
          break;
        case 'date':
          setDate(text);
          break;
        default:
          break;
      }
    };
  
    const handleOnChange = () => {
      setOpen(true);
    };
  
  useEffect(() => {
    verificarRegistroCompleto();
  }, [firstName, lastName, email, date, type, gen, password, passcon, state, city, user, phone]);

  //Funcion creada para validar que los datos ingresados sean correctos y pasar a la subida del usuario a la base de datos
  const registerUser = () => {
    const registroData = {
      Email: email,
      FirstName: firstName, 
      LastName: lastName, 
      Birthdate: date, 
      Blood_Type: type, 
      Sexo: gen, 
      password:password, 
      State: state, 
      City: city, 
      Phone: phone,
      UserName: user
    };
    //console.log(registroData)
    //New_User(registroData);
    console.log("la imagen enviada es",imageExtern)
    New_User(email, firstName, lastName, date, type, gen, password, state, city,phone, user,imageExtern);
   
    //Customer(email);

    //New_User('raufalfonso@gmail.com', 'A', 'Hehshs', '2024/03/21', 'AB+', 'Masculino', 'password', 'Jalisco', 'Guad', '3320740052', 'Rauf453');

    

    navigation.push('Login', { registroData });
  };

  const verificarRegistroCompleto = () => {
    if (firstName && lastName && email && date && type && gen && password && passcon && state && city && user && phone) {
      setRegistroCompleto(true);
    } else {
      setRegistroCompleto(false);
    }
  };

  const renderView = ({firstName, lastName, email, date, type, gen, password, passcon, state, city, user, phone}) => {
  
    console.log("la imagen tiene",imageExtern);
    switch (currentView) {
      case 0:
        return(
          <>
            <View style={[styles.container, {backgroundColor: teme.background}]}>
              <Text style={styles.text}>¿Cuál es su nombre?</Text>
              <TextInput style={[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]}
                  placeholder= {t("wname")}
                  value={firstName}
                  onChangeText={val => setFirstName(val)}
                  error={errorFirstName}
                  defaultValue={firstName}
              />
              <View style={styles.primeraView}>
                <TouchableOpacity style={styles.arrowright} onPress={handleNextView}>
                    <MaterialCommunityIcons name="arrow-right-circle" color="#000000" size={60} />
                </TouchableOpacity>
              </View>
            </View>
            </>
          );
       
        case 1:
          return(
            <>
            <View style={[styles.container, {backgroundColor: teme.background}]}>
              <Text style={styles.text}>¿Cuáles son sus apellidos?</Text>
              <TextInput style={[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]}
                  placeholder= {t("wlaname")}
                  value={lastName}
                  onChangeText={val => setLastName(val)}
                  error={errorLastname}
                  defaultValue={lastName}
              />
                <View style={styles.controlBoton}>
                  <TouchableOpacity style={styles.arrowleft} onPress={handlePrevView}>
                    <MaterialCommunityIcons name="arrow-left-circle" color="#000000" size={60} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.arrowright} onPress={handleNextView}>
                    <MaterialCommunityIcons name="arrow-right-circle" color="#000000" size={60} />
                  </TouchableOpacity>
          </View>
            </View>
            </>
          );
        case 2:
          return (
            <>
              <View style={[styles.container, { backgroundColor: teme.background }]}>
                <Text style={styles.text}>¿Cuál es su fecha de nacimiento?</Text>
                <TextInput
                  style={[styles.dateSelect, { backgroundColor: teme.bla }, { color: teme.color }]}
                  placeholder={t('slcdate')}
                  value={date}
                  onChangeText={(val) => handleInputChange(val, 'date')}
                  error={errorDate}
                  defaultValue={date}
                />
                <TouchableOpacity style={styles.calendar} onPress={handleOnChange}>
                  <MaterialCommunityIcons name="calendar-clock-outline" color="#000000" size={60} />
                </TouchableOpacity>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={open}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <DatePicker
                        mode="calendar"
                        selected={date}
                        minimumDate={null}
                        onDateChange={(val) => {
                          setDate(val);
                          setOpen(false);
                        }}
                      />
                      <TouchableOpacity style={styles.calendar} onPress={() => setOpen(false)}>
                        <MaterialCommunityIcons name="cancel" color="#000000" size={30} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
              <View style={styles.controlBoton}>
                <TouchableOpacity style={styles.arrowleft} onPress={handlePrevView}>
                  <MaterialCommunityIcons name="arrow-left-circle" color="#000000" size={60} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.arrowright} onPress={handleNextView}>
                  <MaterialCommunityIcons name="arrow-right-circle" color="#000000" size={60} />
                </TouchableOpacity>
              </View>
            </>
          );
        case 3:
          return (
            <>
              <View style={[styles.container, { backgroundColor: teme.background }]}>
                <Text style={styles.text}>¿Cuál es su tipo de sangre?</Text>
                <TouchableOpacity onPress={() => setisModalVisible(true)}>
                  <Text style={[styles.textInput, { backgroundColor: teme.bla }, { color: teme.color }]}>
                    {type}
                  </Text>
                </TouchableOpacity>
                <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible}
                  onRequestClose={() => setisModalVisible(false)}
                >
                  <ModalPicker changeModalVisibility={() => setisModalVisible(false)} setType={setType} />
                </Modal>
                <View style={styles.controlBoton}>
                  <TouchableOpacity style={styles.arrowleft} onPress={handlePrevView}>
                    <MaterialCommunityIcons name="arrow-left-circle" color="#000000" size={60} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.arrowright} onPress={handleNextView}>
                    <MaterialCommunityIcons name="arrow-right-circle" color="#000000" size={60} />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          );
        case 4:
          return (
            <>
              <View style={[styles.container, { backgroundColor: teme.background }]}>
                <Text style={styles.text}>¿Cuál es su género?</Text>
                  <TouchableOpacity onPress={() => setisModalVisibleg(true)}>
                    <Text style={[styles.textInput, { backgroundColor: teme.bla }, { color: teme.color }]}>
                      {gen}
                    </Text>
                  </TouchableOpacity>
                <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisibleg}
                  onRequestClose={() => setisModalVisibleg(false)}
                >
                  <ModalPickerg changeModalVisibilitygen={() => setisModalVisibleg(false)} setGen={setGen} />
                </Modal>
                <View style={styles.controlBoton}>
                  <TouchableOpacity style={styles.arrowleft} onPress={handlePrevView}>
                    <MaterialCommunityIcons name="arrow-left-circle" color="#000000" size={60} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.arrowright} onPress={handleNextView}>
                    <MaterialCommunityIcons name="arrow-right-circle" color="#000000" size={60} />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          );
          case 5: //email
            return (
              <View style={[styles.container, { backgroundColor: teme.background }]}>
                <Text style={styles.text}>¿Cuál es su correo electronico?</Text>
                <TextInput style={[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]}
                  placeholder= {t("wemail")}
                  value={email}
                  onChangeText={val => setEmail(val)}
                  //error={errorEmail}
                  //defaultValue={email}
                />
                <View style={styles.controlBoton}>
                  <TouchableOpacity style={styles.arrowleft} onPress={handlePrevView}>
                    <MaterialCommunityIcons name="arrow-left-circle" color="#000000" size={60} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.arrowright} onPress={handleNextView}>
                    <MaterialCommunityIcons name="arrow-right-circle" color="#000000" size={60} />
                  </TouchableOpacity>
                </View>
            </View>
            )
          case 6: //estado
            return(
              <View style={[styles.container, { backgroundColor: teme.background }]}>
                <Text style={styles.text}>¿En que estado reside actualmente?</Text>
                <TextInput style={[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]}
                  placeholder= {t("wstate")}
                  value={state}
                  onChangeText={val => setState(val)}
                  error={errorState}
                  defaultValue={state}
                />
                <View style={styles.controlBoton}>
                  <TouchableOpacity style={styles.arrowleft} onPress={handlePrevView}>
                    <MaterialCommunityIcons name="arrow-left-circle" color="#000000" size={60} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.arrowright} onPress={handleNextView}>
                    <MaterialCommunityIcons name="arrow-right-circle" color="#000000" size={60} />
                  </TouchableOpacity>
                </View>
            </View>
            )
          case 7: //ciudad-municipio
            return(
              <View style={[styles.container, { backgroundColor: teme.background }]}>
                <Text style={styles.text}>¿En qué municipio reside actualmente?</Text>
              <TextInput style={[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]}
                placeholder= {t("wcity")}
                value={city}
                onChangeText={val => setCity(val)}
                error={errorCity}
                defaultValue={city}
            />
              <View style={styles.controlBoton}>
                <TouchableOpacity style={styles.arrowleft} onPress={handlePrevView}>
                  <MaterialCommunityIcons name="arrow-left-circle" color="#000000" size={60} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.arrowright} onPress={handleNextView}>
                  <MaterialCommunityIcons name="arrow-right-circle" color="#000000" size={60} />
                </TouchableOpacity>
              </View>
            </View>
            )
          case 8: //telefono(celular)
            return (
              <View style={[styles.container, { backgroundColor: teme.background }]}>
                <Text style={styles.text}>¿Cuál es su número de telefono celular?</Text>
              <TextInput style={[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]}
              placeholder= {t("wcelp")}
              value={phone}
              onChangeText={val => setPhone(val)}
              error={errorPhone}
              defaultValue={phone}
          />  
            <View style={styles.controlBoton}>
                <TouchableOpacity style={styles.arrowleft} onPress={handlePrevView}>
                  <MaterialCommunityIcons name="arrow-left-circle" color="#000000" size={60} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.arrowright} onPress={handleNextView}>
                  <MaterialCommunityIcons name="arrow-right-circle" color="#000000" size={60} />
                </TouchableOpacity>
            </View>
          </View>
              )
          case 9: //Usuario
              return (
                <View style={[styles.container, { backgroundColor: teme.background }]}>
                  <Text style={styles.text}>¿Cuál será su nombre de usuario?</Text>
                <TextInput style={[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]}
                placeholder= {t("wuser")}
                value={user}
                onChangeText={val => setUser(val)}
                error={errorUser}
                defaultValue={user}
            />
              <View style={styles.controlBoton}>
                <TouchableOpacity style={styles.arrowleft} onPress={handlePrevView}>
                  <MaterialCommunityIcons name="arrow-left-circle" color="#000000" size={60} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.arrowright} onPress={handleNextView}>
                  <MaterialCommunityIcons name="arrow-right-circle" color="#000000" size={60} />
                </TouchableOpacity>
              </View>
            </View>
              )
          case 10: //contraseña
            return (
              <View style={[styles.container, { backgroundColor: teme.background }]}>
                <Text style={styles.text}>¿Cuál será su contraseña?</Text>
              <TextInput style={[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]}
                placeholder= {t("wpass")}
                value={password}
                secureTextEntry= {true}
                onChangeText={val => setPassword(val)}
                error={errorPassword}
                defaultValue={password}
            />
              <View style={styles.controlBoton}>
                <TouchableOpacity style={styles.arrowleft} onPress={handlePrevView}>
                  <MaterialCommunityIcons name="arrow-left-circle" color="#000000" size={60} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.arrowright} onPress={handleNextView}>
                  <MaterialCommunityIcons name="arrow-right-circle" color="#000000" size={60} />
                </TouchableOpacity>
              </View>
            </View>
            )
          case 11: //confirmacion-contraseña
            return(
              <View style={[styles.container, { backgroundColor: teme.background }]}>
                <Text style={styles.text}>Ingrese la misma contraseña</Text>
              <TextInput style={[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]}
                placeholder= {t("passconf")}
                value={passcon}
                secureTextEntry= {true}
                onChangeText={val => setPasscon(val)}    
                error={errorPasscon}
                defaultValue={passcon}
            />
              <View style={styles.controlBoton}>
               
                <View style={styles.controlBoton}>
                <TouchableOpacity style={styles.arrowleft} onPress={handlePrevView}>
                  <MaterialCommunityIcons name="arrow-left-circle" color="#000000" size={60} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.arrowright} onPress={handleNextView}>
                  <MaterialCommunityIcons name="arrow-right-circle" color="#000000" size={60} />
                </TouchableOpacity>
               
              </View>
              </View>
               
            </View>
            )
            case 12:// select the image 
              return(
                
          <View style={[styles.contImage, width >= 800 ? styles.contImageGnde : styles.contImage]}>
          <StatusBar hidden={true} />
          <Text style={styles.text}>Seleccione una imagen</Text>
          <TouchableOpacity style={styles.editimage} onPress={pickImage}>
            <MaterialCommunityIcons name="pencil-plus-outline" color={'#000000'} size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.arrowleft} onPress={handlePrevView}>
                  <MaterialCommunityIcons name="arrow-left-circle" color="#000000" size={60} />
                </TouchableOpacity>
                <ButtonGeneric text= {t("confr")}
            title='Logear'
            onPress={() => registerUser(email,password,user,lastName,firstName,date,type,state,city,phone,imageExtern)}
        />
                <TouchableOpacity style={styles.arrowright} onPress={handleNextView}>
                  <MaterialCommunityIcons name="arrow-right-circle" color="#000000" size={60} />
                </TouchableOpacity>
              
   
        </View>
        
        
          )
          case 13:

          return(
            <ButtonGeneric text= {t("confr")}
            title='Logear'
            onPress={() => registerUser(email,password,user,lastName,firstName,date,type,state,city,phone,imageExtern)}
        />
          );

            
            
            
               
        default:
          return null;
      }
    };
    
    const handleView = () => {
      switch(currentView){
        case 0:
          if(!validateName(firstName)){
            setErrorFirstName("Debes de ingresar un nuevo nombre nuevamente")
            return false;
          }
          break;
        case 1:
          if(!validateName(lastName)){
            setErrorLastName("Debes de ingresar tus apellidos correctamente")
            return false;
          }
          break;
        case 2:
          if(!validateDate(date)){
            setErrorDate("Debes de ingresar tus apellidos correctamente")
            return false;
          }
          break; 
        case 3:
          if(!Bloodtype(type)){
            setErrorType("Debes de ingresar tus apellidos correctamente")
            return false;
          }
          break;
        case 4:
          if(!validateGender(gen)){
            setErrorGen("Debes de ingresar tus apellidos correctamente")
            return false;
          }
          break;
        case 5:
          //if(!validateEmail(email)){
           // setErrorEmail("Debes de ingresar tus apellidos correctamente")
            //return false;
         // }
          break;
        case 6:
          /*if(!StateVal(state)){
            setErrorState("Debes de ingresar tus apellidos correctamente")
            return false;
          }*/
          break;
        case 7:
          /*if(!ValidateJalisco(city)){
            setErrorCity("Debes de ingresar tus apellidos correctamente")
            return false;
          }*/
          break;
        case 8:
          if(!validatePhone(phone)){
            setErrorPhone("Debes de ingresar tus apellidos correctamente")
            return false;
          }
          break;
        case 9:
          /*if(!validateUser(user)){
            setErrorUser("Debes de ingresar tus apellidos correctamente")
            return false;
          }*/
          break;
        case 10:
          /*
          if(!validatePassword(password)){
            setErrorPassword("Debes de ingresar tus apellidos correctamente")
            return false;
          }*/
          break;   
        case 11:
          if(!ConfirmPass(passcon)){
            setErrorPasscon("Debes de ingresar tus apellidos correctamente")
            return false;
          }
          break;   
      }
      return true;
    };
    return (
      <View style={[styles.container, { backgroundColor: teme.background }]}>
        <ScrollView style={{ width: '100%' }}>
          <Text style={styles.title}>{t('register')}</Text>
          {/*Aqui es donde voy a agregar la imagen (logo) de la aplicacion, sin quirarle funcionalidad*/}
          <Image
            source={PlaceImage} style={styles.image}
          />
          {renderView({firstName, lastName, email, date, type, gen, password, passcon, state, city, user, phone})}
        </ScrollView>
      </View>
    );
  };
  
  
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#a3a3ff",
    },
    text: {
      marginTop: '15%',
      fontStyle: 'italic',
      fontWeight: 'bold',
      fontSize: 20,
      alignSelf: 'center'
    },
    image: {
      alignSelf: 'center',
      width: 200, // Define un ancho
      height: 200, // Define un alto
      resizeMode: 'contain' // Esto es para asegurar que la imagen se escale correctamente.
    },
    editimage: {
      alignSelf: 'center',
    },
    
  dateSelect: {
        marginTop:'05%',
        width:'83%',
        height: 80,
        borderRadius: 25,
        marginVertical: 10,
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 18,
        borderWidth:1,
        textAlign: 'center',
        borderColor: '#161238',
        alignSelf: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
  },
    textInput: {
        marginTop:'10%',
        width:'83%',
        height: 80,
        borderRadius: 25,
        marginVertical: 10,
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 18,
        borderWidth:1,
        textAlign: 'center',
        borderColor: '#161238',
        alignSelf: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    title: {
        fontSize:28, 
        fontWeight: 'bold', 
        fontStyle: 'italic',
        marginTop:'12%', 
        textAlign:"center"
    },
    calendar:{
      alignItems: 'center',
  },
    arrowright:{
      paddingRight: 50,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    arrowleft:{
      paddingLeft: 50,
      alignItems: 'flex-start',
      justifyContent: 'center'
  },
    centeredView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView:{
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset:{
           width: 0,
           height: 2 
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    controlBoton:{
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center'
    },
    primeraView: {
      justifyContent: 'flex-end',
      flexDirection: 'row',
      alignItems: 'center'
    },
});

export default NewReg;