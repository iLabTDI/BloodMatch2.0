import React, { useState, useContext }  from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, Text, ScrollView, TouchableOpacity, Modal} from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DatePicker from "react-native-modern-datepicker"

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
//import Picker from "react-native-picker";
import { useIsFocused } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
//------------------------------SUPABASE----------------
import { supabase } from "../lib/supabase";
import New_User from "../backend/querys/inserts/New_User";
// Se va a realizar una reestructuracion del sign in para registrar nuevos usuarios, en la que los datos no se van a ingresar todos de una vez, simplemente se va a mostrar una nueva ventana por cada campo que se necesite llenar

const SignIn = ({ navigation }) => {

    const {t} = useTranslation();
    const teme = useContext(themeContext)
    const [isModalVisibleg, setisModalVisibleg] = useState(false)
    const [isModalVisibleE, setisModalVisibleE] = useState(false)
    const [isModalVisible, setisModalVisible] = useState(false)
    const [value, setValue] = useState('');
    const today = new Date()
    
    //variables donde se van a guardar los datos del sign in
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [date, setDate] = useState("")
    const [gen, setGen] = useState(t("slcgen"))
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    //const [direction, setDirection] = useState("")
    //const [suburb, setSuburb] = useState("")
    //const [postalCode, setPostalCode] = useState("")
    const [phone, setPhone] = useState("")
    const [type, setType] = useState(t("slctype"))
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [passcon, setPasscon] = useState("")
    const [open, setOpen] = useState(false) //abre y cierra el "modal"

    // errores para los datos que se guardan en el registro
    const [errorFirstName, setErrorFirstName] = useState("")
    const [errorLastname, setErrorLastName] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorDate, setErrorDate] = useState("")
    const [errorGen, setErrorGen] = useState("")
    const [errorState, setErrorState] = useState("")
    const [errorCity, setErrorCity] = useState("")
    //const [errorDirection, setErrorDirection] = useState("")
    //const [errorSuburb, setErrorSuburb] = useState("")
    //const [errorPostalCode, setErrorPostalCode] = useState("")
    const [errorPhone, setErrorPhone] = useState("")
    const [errorType, setErrorType] = useState("")
    const [errorUser, setErrorUser] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorPasscon, setErrorPasscon] = useState("")
    
    //funcion para abrir el picker de la fecha
    function handleOnChange(){
        setOpen(!open);
    }

    //funcion creada para el dropdown list de tipo de sangre
    const changeModalVisibility = (bool) => {
        setisModalVisible(bool)
    } 
    //funcion creada para el dropdown list de genero
    const changeModalVisibilitygen = (bool) => {
        setisModalVisibleg(bool)
    } 

    //funcionalidad no encontrada
    const changeModalVisibilityest = (bool) => {
        setisModalVisibleE(bool)
    } 

    // funcion creada para capturar la fecha de nacimiento en el registro
    function handleChange(propdate){
        setDate(propdate);
    }

    //Funcion creadad para subir los datos del registro en la base de datos 
    const subida = async (email,password,usuario,lastName,firstName,date,type,state,city,phone) => {
        try {
            //console.log("Datos recibidos: ", password, email,usuario,lastName,firstName,date,type,state,city,phone);
            const { user, error } = await supabase.auth.signUp({
              email: email,
              password: password,
            });
            if (error) {
              //console.log(error);
            } else {
              const { data, error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password,
              })
              const UID =  data.user.id;
              //console.log("New user data:", UID);
              New_User(UID,email,usuario,lastName,firstName,date,type,state,city,phone);
              navigation.navigate('Home');

                        }
          } catch (error) {
            //console.error("Error en handleLogin:", error);
          }
    };     

    //Funcion creada para validar que los datos ingresados sean correctos y pasar a la subida del usuario a la base de datos
    const registerUser = async(email, password,user,lastName,firstName,date,type,state,city,phone) =>{
//        if (!validateData()) {
 //         return;
 //         }
          try {
            await subida(email,password,user,lastName,firstName,date,type,state,city,phone);
            //console.log("Registro exitoso")
          } catch (error) {
            //console.error("Error al registrar al usuario, intentar de nuevo", error)
          }
          //console.log('okey')
      }
    //Validaciones de errores o del paso de datos exitoso

    const validateData = () => {
        let isValid = true
   
        //Validacion de nombre
        //console.log(firstName)
        if(!validateName(firstName)) {
            setErrorFirstName("Debe de ingresar sus nombres válidos.")
            isValid = isValid && false;
            //console.log(isValid)
        }else{
            isValid = isValid && true;
            //console.log(isValid)
        }

        //Validacion de apellido
        //console.log(lastName)
        if(!validateName(lastName)) {
            setErrorLastName("Debe de ingresar sus apellidos válidos.")
            isValid = isValid && false;
            //console.log(isValid)
        }else{
            isValid = isValid && true;
            //console.log(isValid)
        }

        // Validacion de email
        //console.log(email)
        if(!validateEmail(email)) {
            setErrorEmail("Debe de ingresar un correo válido.")
            isValid = isValid && false;
            //console.log(isValid)
        }else{
            isValid = isValid && true;
            //console.log(isValid)
        }

        //if(calcularEdad(edad) < 18){
         //   setErrorDate("solo mayores de 18 años")
          //  isValid= false
        //}
        
        //Validacion de genero
        //console.log(gen)
        if(!validateGender(gen)) {
            setErrorGen("Favor de ingresar, masculino o femenino")
            isValid = isValid && false;
            //console.log(isValid)
        }else{
            isValid = isValid && true;
            //console.log(isValid)
        }

        //estado
        //console.log(state)
        if(!StateVal(state)) {
            setErrorState("Debe de ingresar un estado válido.")
            isValid = isValid && false;
            //console.log(isValid)
        }else{
            isValid = isValid && true;
            //console.log(isValid)
        }

        //municipio
        //console.log(city)
        if(!ValidateJalisco(city)) {
            setErrorCity("Debe de ingresar una ciudad válido.")
            isValid = isValid && false;
            //console.log(isValid)
        }else{
            isValid = isValid && true;
            //console.log(isValid)
        }
        //celular
        //console.log(phone)
        if(!validatePhone(phone)) {
            setErrorPhone("Debe de ingresar un numero celular válido.")
            isValid = isValid && false;
            //console.log(isValid)
        }else{
            isValid = isValid && true;
            //console.log(isValid)
        }

        //tipo de sangre
        //console.log(type)
        if(!Bloodtype(type)) {
            setErrorType("Debe de ingresar un tipo de sangre válido.")
            isValid = isValid && false;
            //console.log(isValid)
        }else{
            isValid = isValid && true;
            //console.log(isValid)
        }

        //nombre de usuario
        //console.log(user)
        if(!validateUser(user) || user.length<8) {
            setErrorUser("Usuario ya existente.")
            isValid = isValid && false;
            //console.log(isValid)
        }else{
            isValid = isValid && true;
            //console.log(isValid)
        }

        //contraseña
        //console.log(password)
        if(!validatePassword(password)) {
            setErrorPassword("Debe de ingresar una contraseña válido.")
            isValid = isValid && false;
            //console.log(isValid)
        }else{
            isValid = isValid && true;
            //console.log(isValid)
        }

        //confirmacion de contraseña
        //console.log(passcon)
        if(ConfirmPass(passcon) && passcon !== password) {
            setErrorPasscon("Debe de ingresar la misma contraseña.")
            isValid = isValid && false;
            //console.log(isValid)
        }else{
            isValid = isValid && true;
            //console.log(isValid)
        }

        //fecha de nacimiento
        //console.log(date)
        //Pensar excepción para la edad
        if(!validateDate(date)) {
            setErrorDate("Solo mayores de 18.")
            isValid = isValid;
            //console.log(isValid)
        }else{
            isValid = isValid;
            //console.log(isValid)
        }


        //console.log(isValid)
        return isValid
    }

{/* Se implementa el dark mode, en el container se modifica el background y en cada uno de los textInput se les da el formato para 
    modificar el cuadro y el color de la letra*/}
    return (
        <View style={[styles.container, {backgroundColor: teme.background}]}>
            <ScrollView style={{width:'100%'}}>
                <Text style={styles.title}>
                    {t("register")}
                </Text>
{/* Ingresar nombre*/}
                <TextInput style={[styles.textInput, , {backgroundColor: teme.bla}, {color: teme.color}]}
                    placeholder=        {t("wname")}
                    value={firstName}
                    onChangeText={val => setFirstName(val)}
                    error={errorFirstName}
                    defaultValue={firstName}

                />
{/* Ingresar apellido*/}
                <TextInput style={[styles.textInput, , {backgroundColor: teme.bla}, {color: teme.color}]}
                placeholder= {t("wlaname")}
                value={lastName}
                onChangeText={val => setLastName(val)}
                error={errorLastname}
                defaultValue={lastName}
                />
{/* Ingresar fecha de nacimiento*/}
                <TextInput style={[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]}
                    placeholder= {t("slcdate")}
                    value={date}
                    onChangeText={val => setDate(val)}
                    error={errorDate}
                    defaultValue={date}
                /> 
                {/*boton creado para ingresar la fecha con el menu del calendario*/}
                <TouchableOpacity style={styles.calendar} onPress={handleOnChange}>
                    <MaterialCommunityIcons name = "calendar-clock-outline" color = '#000000' size={30} />
                </TouchableOpacity>

                {/*Implementacion del formato del calendario para seleccionar la fecha de nacimiento del usuario*/}
                <Modal
                animationType="slide"
                transparent= {true}
                visible = {open}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <DatePicker 
                            mode="calendar"
                            selected={date}
                            minimumDate={null}
                            onDateChange={handleChange}
                            />
                            <TouchableOpacity style={styles.calendar} onPress={handleOnChange}>
                                <MaterialCommunityIcons name = "cancel" color = '#000000' size={30} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
{/* implementacion de la dropdown list en el apartado de seleccionar tipo de sangre*/}    

                <SafeAreaView style={[styles.container, {backgroundColor: teme.background}]}>
                    
                    <TouchableOpacity  
                        onPress={()=> changeModalVisibility(true)}
                    >
                        <Text 
                        style={[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]}>{type}</Text> 
                    </TouchableOpacity>
                    <Modal
                        transparent={true}
                        animationType='fade'
                        visible={isModalVisible}
                        nRequestClose={()=> changeModalVisibility(false)}
                    >
                    <ModalPicker
                        changeModalVisibility = {changeModalVisibility}
                        setType={setType}
                        />
                    </Modal>

                </SafeAreaView>

{/*implementacion de la dropdown list en el apartado de seleccionar genero*/}
                
                <SafeAreaView style={[styles.container, {backgroundColor: teme.background}]}>
                    <TouchableOpacity
                        onPress={()=> changeModalVisibilitygen(true)}
                    >
                        <Text style={[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]}>{gen}</Text> 
                    </TouchableOpacity>
                    <Modal
                        transparent={true}
                        animationType='fade'
                        visible={isModalVisibleg}
                        nRequestClose={()=> changeModalVisibilitygen(false)}
                    >
                    <ModalPickerg
                        changeModalVisibilitygen = {changeModalVisibilitygen}
                        setGen = {setGen}
                        />
                    </Modal>

                </SafeAreaView>
 
{/* Ingresar email*/}
                <TextInput style={[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]}
                placeholder= {t("wemail")}
                value={email}
                onChangeText={val => setEmail(val)}
                error={errorEmail}
                defaultValue={email}
            />
{/* Ingresar estado*/}
            <TextInput style={[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]}
                placeholder= {t("wstate")}
                value={state}
                onChangeText={val => setState(val)}
                error={errorState}
                defaultValue={state}
            />
{/* Ingresar municipio*/}
            <TextInput style={[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]}
                placeholder= {t("wcity")}
                value={city}
                onChangeText={val => setCity(val)}
                error={errorCity}
                defaultValue={city}
            />
            {/*<TextInput
                placeholder='Ingrese su Direccion'
                value={direction}
                onChangeText={val => setDirection(val)}
                error={errorDirection}
                defaultValue={direction}
            />
            <TextInput
                placeholder='Ingrese su Colonia'
                value={suburb}
                onChangeText={val => setSuburb(val)}
                error={errorSuburb}
                defaultValue={suburb}
            />
            <TextInput
                placeholder='Ingrese su Codigo Postal'
                value={postalCode}
                onChangeText={val => setPostalCode(val)}
                error={errorPostalCode}
                defaultValue={postalCode}
        />*/}
{/* Ingresar celular*/}
            <TextInput style={[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]}
                placeholder= {t("wcelp")}
                value={phone}
                onChangeText={val => setPhone(val)}
                error={errorPhone}
                defaultValue={phone}
            />  
{/* Ingresar nombre de usuario*/}
            <TextInput style={[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]}
                placeholder= {t("wuser")}
                value={user}
                onChangeText={val => setUser(val)}
                error={errorUser}
                defaultValue={user}
            />      
{/* Ingresar contraseña*/}
            <TextInput style={[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]}
                placeholder= {t("wpass")}
                value={password}
                secureTextEntry= {true}
                onChangeText={val => setPassword(val)}
                error={errorPassword}
                defaultValue={password}
            />
{/* Ingresar confirmacion de la contraseña*/}
            <TextInput style={[styles.textInput, {backgroundColor: teme.bla}, {color: teme.color}]}
                placeholder= {t("passconf")}
                value={passcon}
                secureTextEntry= {true}
                onChangeText={val => setPasscon(val)}    
                error={errorPasscon}
                defaultValue={passcon}
            />

                <ButtonGeneric text= {t("confr")}
                    title='Logear'
                    onPress={() => registerUser(email,password,user,lastName,firstName,date,type,state,city,phone)}
                />
                <StatusBar style="auto" />
            </ScrollView>
        </View>    
      
      );
}

    
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#a3a3ff',
    },
    textInput: {
        marginTop:'2%',
        width:'83%',
        height: 40,
        borderRadius: 10,
        marginVertical: 7,
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 16,
        borderWidth:1,
        borderColor: '#161238',
        alignSelf: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize:22, 
        fontWeight: 'bold', 
        fontStyle: 'italic',
        marginTop:'4%', 
        textAlign:"center"
    },
    calendar:{
        alignItems: 'center'
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

export default SignIn