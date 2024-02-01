import React, {useState, useContext} from "react";
import { StyleSheet, View, TextInput, Text, Button, TouchableOpacity, Modal, ScrollView, Image} from "react-native";
import DatePicker from "react-native-modern-datepicker"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//Validaciones
import { validateName } from '../helper/validations/validationName';
import { validatePassword } from "../helper/validations/validationPassw";
import { validateEmail } from "../helper/validations/validationEmail";
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

import { ButtonGeneric } from '../components/Buttons';
import Picker from "react-native-picker";
import { useIsFocused } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { supabase } from "../lib/supabase";
import New_User from "../backend/querys/inserts/New_User";
const PlaceImage = require('../assets/logotipo.png');

const NewReg = (props) => {
    const { t } = useTranslation();
    const { navigation } = props;
    const teme = useContext(themeContext);
  
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
  
    const [isModalVisible, setisModalVisible] = useState(false);
    const [isModalVisibleg, setisModalVisibleg] = useState(false);
  
    const [currentView, setCurrentView] = useState(0);
    const totalViews = 13; // Número total de vistas de nuestra app
  
  //funcion creada para manejar la vista, esta nos permite ir hacia el frente hayamos ingresado o no datos (de momento)
    const handleNextView = () => {
      if (currentView < totalViews - 1) {
        setCurrentView(currentView + 1);
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

    const subida = async (email,password,usuario,lastName,firstName,date,type,state,city,phone) => {
      try {
          console.log("Datos recibidos: ", password, email,usuario,lastName,firstName,date,type,state,city,phone);
          const { user, error } = await supabase.auth.signUp({
            email: email,
            password: password,
          });
          if (error) {
            console.log(error);
          } else {
            const { data, error } = await supabase.auth.signInWithPassword({
                  email: email,
                  password: password,
            })
            const UID =  data.user.id;
            console.log("New user data:", UID);
            New_User(UID,email,usuario,lastName,firstName,date,type,state,city,phone);
            navigation.navigate('Home');

                      }
        } catch (error) {
          console.error("Error en handleLogin:", error);
        }
  };     

  //Funcion creada para validar que los datos ingresados sean correctos y pasar a la subida del usuario a la base de datos
  const registerUser = async(email, password,user,lastName,firstName,date,type,state,city,phone) =>{
//        if (!validateData()) {
//         return;
//         }
        try {
          await subida(email,password,user,lastName,firstName,date,type,state,city,phone);
          console.log("Registro exitoso")
        } catch (error) {
          console.error("Error al registrar al usuario, intentar de nuevo", error)
        }
        console.log('okey')
    }
  
    const renderView = ({firstName, lastName, email, date, type, gen, password, passcon, state, city, user, phone}) => {
      switch (currentView) {
        case 0:
          return(
            <>
            <View style={[styles.container, {backgroundColor: teme.background}]}>
              <TextInput style={[styles.textInput, , {backgroundColor: teme.bla}, {color: teme.color}]}
                    placeholder=        {t("wname")}
                    value={firstName}
                    onChangeText={val => setFirstName(val)}
                    error={errorFirstName}
                    defaultValue={firstName}

                />
                <TouchableOpacity style={styles.arrowright} onPress={handleNextView}>
                <MaterialCommunityIcons name="arrow-right-circle" color="#000000" size={60} />
              </TouchableOpacity>
            </View>
            </>
          );
        case 1:
          return(
            <>
            <View style={[styles.container, {backgroundColor: teme.background}]}>
              <TextInput style={[styles.textInput, , {backgroundColor: teme.bla}, {color: teme.color}]}
                  placeholder= {t("wlaname")}
                  value={lastName}
                  onChangeText={val => setLastName(val)}
                  error={errorLastname}
                  defaultValue={lastName}
                />
                <TouchableOpacity style={styles.arrowright} onPress={handleNextView}>
                <MaterialCommunityIcons name="arrow-right-circle" color="#000000" size={60} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.arrowleft} onPress={handlePrevView}>
                  <MaterialCommunityIcons name="arrow-left-circle" color="#000000" size={60} />
                </TouchableOpacity>
            </View>
            </>
          );
        case 2:
          return (
            <>
              <View style={[styles.container, { backgroundColor: teme.background }]}>
                <TextInput
                  style={[styles.textInput, { backgroundColor: teme.bla }, { color: teme.color }]}
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
              <TouchableOpacity style={styles.arrowright} onPress={handleNextView}>
                <MaterialCommunityIcons name="arrow-right-circle" color="#000000" size={60} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.arrowleft} onPress={handlePrevView}>
                  <MaterialCommunityIcons name="arrow-left-circle" color="#000000" size={60} />
                </TouchableOpacity>
            </>
          );
        case 3:
          return (
            <>
              <View style={[styles.container, { backgroundColor: teme.background }]}>
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
                <TouchableOpacity style={styles.arrowright} onPress={handleNextView}>
                  <MaterialCommunityIcons name="arrow-right-circle" color="#000000" size={60} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.arrowleft} onPress={handlePrevView}>
                  <MaterialCommunityIcons name="arrow-left-circle" color="#000000" size={60} />
                </TouchableOpacity>
              </View>
            </>
          );
        case 4:
          return (
            <>
              <View style={[styles.container, { backgroundColor: teme.background }]}>
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
                <TouchableOpacity style={styles.arrowright} onPress={
                handleNextView}>
                  <MaterialCommunityIcons name="arrow-right-circle" color="#000000" size={60} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.arrowleft} onPress={handlePrevView}>
                  <MaterialCommunityIcons name="arrow-left-circle" color="#000000" size={60} />
                </TouchableOpacity>
              </View>
            </>
          );
          case 5: //email
            return (
              <View style={[styles.container, { backgroundColor: teme.background }]}>
              <TextInput style={[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]}
                placeholder= {t("wemail")}
                value={email}
                onChangeText={val => setEmail(val)}
                error={errorEmail}
                defaultValue={email}
            />
            <TouchableOpacity style={styles.arrowright} onPress={
                handleNextView}>
                  <MaterialCommunityIcons name="arrow-right-circle" color="#000000" size={60} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.arrowleft} onPress={handlePrevView}>
                  <MaterialCommunityIcons name="arrow-left-circle" color="#000000" size={60} />
                </TouchableOpacity>
            </View>
            )
          case 6: //estado
            return(
              <View style={[styles.container, { backgroundColor: teme.background }]}>
              <TextInput style={[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]}
                placeholder= {t("wstate")}
                value={state}
                onChangeText={val => setState(val)}
                error={errorState}
                defaultValue={state}
            />
            <TouchableOpacity style={styles.arrowright} onPress={
                handleNextView}>
                  <MaterialCommunityIcons name="arrow-right-circle" color="#000000" size={60} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.arrowleft} onPress={handlePrevView}>
                  <MaterialCommunityIcons name="arrow-left-circle" color="#000000" size={60} />
                </TouchableOpacity>
            </View>
            )
          case 7: //ciudad-municipio
            return(
              <View style={[styles.container, { backgroundColor: teme.background }]}>
              <TextInput style={[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]}
                placeholder= {t("wcity")}
                value={city}
                onChangeText={val => setCity(val)}
                error={errorCity}
                defaultValue={city}
            />
            <TouchableOpacity style={styles.arrowright} onPress={
                handleNextView}>
                  <MaterialCommunityIcons name="arrow-right-circle" color="#000000" size={60} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.arrowleft} onPress={handlePrevView}>
                  <MaterialCommunityIcons name="arrow-left-circle" color="#000000" size={60} />
                </TouchableOpacity>
            </View>
            )
          case 8: //telefono(celular)
            return (
              <View style={[styles.container, { backgroundColor: teme.background }]}>
              <TextInput style={[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]}
              placeholder= {t("wcelp")}
              value={phone}
              onChangeText={val => setPhone(val)}
              error={errorPhone}
              defaultValue={phone}
          />  
                <TouchableOpacity style={styles.arrowright} onPress={handleNextView}>
                  <MaterialCommunityIcons name="arrow-right-circle" color="#000000" size={60} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.arrowleft} onPress={handlePrevView}>
                  <MaterialCommunityIcons name="arrow-left-circle" color="#000000" size={60} />
                </TouchableOpacity>
          </View>
              )
          case 9: //Usuario
              return (
                <View style={[styles.container, { backgroundColor: teme.background }]}>
                <TextInput style={[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]}
                placeholder= {t("wuser")}
                value={user}
                onChangeText={val => setUser(val)}
                error={errorUser}
                defaultValue={user}
            /> 
                <TouchableOpacity style={styles.arrowright} onPress={handleNextView}>
                  <MaterialCommunityIcons name="arrow-right-circle" color="#000000" size={60} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.arrowleft} onPress={handlePrevView}>
                  <MaterialCommunityIcons name="arrow-left-circle" color="#000000" size={60} />
                </TouchableOpacity>
            </View>
              )
          case 10: //contraseña
            return (
              <View style={[styles.container, { backgroundColor: teme.background }]}>
              <TextInput style={[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]}
                placeholder= {t("wpass")}
                value={password}
                secureTextEntry= {true}
                onChangeText={val => setPassword(val)}
                error={errorPassword}
                defaultValue={password}
            />
                <TouchableOpacity style={styles.arrowright} onPress={handleNextView}>
                  <MaterialCommunityIcons name="arrow-right-circle" color="#000000" size={60} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.arrowleft} onPress={handlePrevView}>
                  <MaterialCommunityIcons name="arrow-left-circle" color="#000000" size={60} />
                </TouchableOpacity>
            </View>
            )
          case 11: //confirmacion-contraseña
            return(
              <View style={[styles.container, { backgroundColor: teme.background }]}>
              <TextInput style={[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]}
                placeholder= {t("passconf")}
                value={passcon}
                secureTextEntry= {true}
                onChangeText={val => setPasscon(val)}    
                error={errorPasscon}
                defaultValue={passcon}
            />
                <TouchableOpacity style={styles.calendar} onPress={handlePrevView}>
                  <MaterialCommunityIcons name="arrow-left-circle" color="#000000" size={60} />
                </TouchableOpacity>
                <ButtonGeneric text= {t("confr")}
                    title='Logear'
                    onPress={() => registerUser(email,password,user,lastName,firstName,date,type,state,city,phone)}
                />
            </View>
            )
        default:
          return null;
      }
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
    image: {
      marginTop: 10,
      marginVertical: 10,
      width: 180,
      height: 210,
      alignItems: 'center',
      alignSelf: 'center'
  },
    textInput: {
        marginTop:'35%',
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
        alignItems: 'center'
    },
    arrowright:{
      paddingRight: 50,
      alignItems: 'flex-end'
    },
    arrowleft:{
      paddingLeft: 50,
      alignItems: 'flex-start'
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
});

export default NewReg;