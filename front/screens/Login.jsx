import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SocialIcon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome5 } from '@expo/vector-icons';
import GenericModal from '../components/GenericModal';
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from 'expo-image-picker';
import CryptoJS from 'crypto-js';
import { useTranslation } from "react-i18next";
const PlaceImage = require('../assets/logotipo.png');
import { getDates } from '../lib/querys';
import  { setGlobalData } from "../backend/querys/inserts/New_email";

import { handleSubmit,getUrl } from "../lib/querys";
import validations from "../helper/validations.js";
import { New_User } from "../lib/querys";

const LogIn = (props) => {

    const { navigation } = props;
    const { t } = useTranslation();

    // Login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Login/Register UI helpers components
    const [activeTab, setActiveTab] = useState('login');
    const [seePassword, setSeePassword] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    // Modal in error case
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [textModal, setTextModal] = useState("");

    // Register
    const [register, setRegister] = useState({
        firstName: "",
        lastName: "",
        userName:"",
        birthDate: null,
        gender: "female",
        state: "",
        municipality: "",
        phoneNumber: "",
        email: "",
        password: "",
        passwordConfirm: "",
        bloodTypeRol: "donor",
        bloodType: "",
        uriImage: "",
        termsAgree: false,

    });

    const DoSignIn = async () => {

        
        try { 
            const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
            
            const getDatesDatabase = await getDates(email, hashedPassword);
            const dates = getDatesDatabase[0];
           
          
            if (dates) {
              if (hashedPassword === dates.password) {
                setGlobalData('dates', dates);
                Alert.alert("Email encontrado ")
                navigation.push('Home');
              } else {
                setTitleModal("Error");
                setTextModal("Nombre de usuario y/o contraseña incorrectos");
                setIsModalVisible(true);
              }
            } else {
              setTitleModal("Error");
              setTextModal("Usuario no encontrado");
              setIsModalVisible(true);
            }
          }  catch (error) {
            console.error("Error en el inicio de sesión:", error);
            setTitleModal("Error");
            setTextModal("Error al intentar iniciar sesión");
            setIsModalVisible(true);
            alert.apply("error")
        }
    };
       
    const toggleModal = () => setIsModalVisible(!isModalVisible);

    const handleInputChange = (field, value) => {
        setRegister((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    }

    const printRegister = () => {
        console.log("**********************************************************");
        console.log("Nombre: ", register.firstName);
        console.log("Apellido: ", register.lastName);
        console.log("Nacimiento: ", register.birthDate);
        console.log("Genero: ", register.gender);
        console.log("Estado: ", register.state);
        console.log("Municipio: ", register.municipality);
        console.log("Telefono: ", register.phoneNumber);
        console.log("Email: ", register.email);
        console.log("Password: ", register.password);
        console.log("Password 2: ", register.passwordConfirm);
        console.log("Rol: ", register.bloodTypeRol);
        console.log("Sangre: ", register.bloodType);
        console.log("Imagen: ", register.uriImage);
        console.log("Terminos: ", register.termsAgree);
    }

    const handleCalendar = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) handleInputChange("birthDate", selectedDate);
    };
 
    const pickImage = async () => {
        setIsImageLoading(true);
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                allowsEditing: true,
            });
    
            if (!result.cancelled) {
                const fileName = await handleSubmit(result.assets[0].uri);
                const data2 = await getUrl(fileName);
                const imageUrl = data2.publicUrl;
    
                handleInputChange("uriImage", imageUrl);
    
                if (imageUrl.length > 0) {
                    setIsImageLoaded(true);
                } else {
                    setTitleModal("Error");
                    setTextModal("No se puede guardar la imagen!");
                    setIsModalVisible(true);
                }
            }
        } catch (error) {
            console.log("Error al seleccionar la imagen:", error);
        } finally {
            setIsImageLoading(false);
        }
    };

    const handleInfoPassword = () => {
        setTitleModal("Caracteristicas necesarias de la contraseña: ");
        setTextModal(`
        - Debe tener al menos 8 caracteres
        - Debe incluir al menos una letra mayúscula
        - DSebe incluir al menos una letra minúscula
        - Debe tener al menos un número 
        - Debe tener al menos un símbolo especial
        - No debe tener espacios
        `);
        setIsModalVisible(true);
    }

    const handleSubmitRegister = async () => {
       // printRegister();
        //console.log("entra")
        let validateFields = await Promise.all([
            validations.firstName(register.firstName),
            validations.lastName(register.lastName),
            validations.birthDate(register.birthDate),
            validations.state(register.state),
            validations.municipality(register.municipality),
            validations.phoneNumber(register.phoneNumber),
            validations.email(register.email),
            validations.password(register.password),
            validations.passwordConfirm(register.password, register.passwordConfirm),
            validations.bloodType(register.bloodType),
            validations.image(register.uriImage),
            validations.termsAgree(register.termsAgree)
        ]);
        
        validateFields.reverse();
        
        validateFields.reverse();

        validateFields.forEach(el => {
           
            if(el.message){
                setTitleModal("Error");
                setTextModal(el.message);
                setIsModalVisible(true);
            }
        });
        console.log("lo que hay es jjjj",validateFields )
        const allTrue = validateFields.every(element => element === true);
        console.log("all",allTrue)
        if(allTrue){
            
        const verification=await New_User(register)
        console.log("la verificacion es",verification)
       if(verification){
        Alert.alert("datos insertados correctamente")
        setRegister({
            firstName: "",
            lastName: "",
            birthDate: "",
            gender: "",
            state: "",
            municipality: "",
            phoneNumber: "",
            email: "",
            password: "",
            passwordConfirm: "",
            bloodTypeRol: "",
            bloodType: "",
            uriImage: "",
            termsAgree: false,
        });
        setActiveTab("login")
       }else{
        Alert.alert("email existente  ")
   
        
        

       }
        }
      

        
    }

    // return (
    //     <View style={[styles.container, { backgroundColor: theme.background }]}>
    //         <Image source={PlaceImage} style={styles.image} />
    //         <TextInput
    //             style={[styles.textInput, { backgroundColor: theme.bla }, { color: theme.color }]}
    //             placeholder="Usuario"
    //             value={user}
    //             onChangeText={val => setUser(val)}
    //             error={errorUserName}
    //         />
    //         <TextInput
    //             style={[styles.textInput, { backgroundColor: theme.bla }, { color: theme.color }]}
    //             placeholder="Contraseña"
    //             secureTextEntry={true}
    //             value={password}
    //             onChangeText={val => setPassword(val)}
    //             error={errorPassword}
    //         />
    //         <ButtonGeneric
    //             text={t("log-in")}
    //             onPress={() => {
    //                 DoSignIn();
    //             }}
    //         />
    //           <TouchableOpacity style={styles.regisButton} onPress={() => { navigation.navigate('new-reg') }}>
    //             <Text style={{ ...styles.textLink, marginStart: '40%' }}>{t("rgst")}</Text>
    //         </TouchableOpacity>
    //     </View>
    // );

    return (
        <SafeAreaView className="flex-1 bg-red-50">
            <ScrollView contentContainerClassName="flex-grow justify-center items-center p-2">
                <View className="w-full max-w-md p-5">
                <View className="mb-8 items-center">
                    <Image
                        source={PlaceImage}
                        className="w-24 h-24"
                        resizeMode="contain"
                    />
                    <Text className="text-3xl font-bold text-red-600 mt-2">BloodMatch</Text>
                </View>
                <View className="bg-white rounded-3xl shadow-lg overflow-hidden">
                    <View className="flex-row">
                    <TouchableOpacity
                        className={`flex-1 py-4 ${activeTab === 'login' ? 'bg-red-500' : 'bg-gray-200'}`}
                        onPress={() => setActiveTab('login')}
                    >
                        <Text className={`text-center font-semibold ${activeTab === 'login' ? 'text-white' : 'text-gray-600'}`}>
                        Iniciar sesión
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={`flex-1 py-4 ${activeTab === 'register' ? 'bg-red-500' : 'bg-gray-200'}`}
                        onPress={() => setActiveTab('register')}
                    >
                        <Text className={`text-center font-semibold ${activeTab === 'register' ? 'text-white' : 'text-gray-600'}`}>
                        Registrarse
                        </Text>
                    </TouchableOpacity>
                    </View>
        
                    <View className="p-6">
                    
                    {/* Login */}
                    {activeTab === 'login' ? (
                        <>
                        <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">
                            ¡Conéctate para salvar vidas!
                        </Text>
                        <TextInput
                            placeholder="Email"
                            className="bg-gray-100 rounded-full py-3 px-4 mb-4"
                            value={email}
                            onChangeText={val => setEmail(val)}
                        />
                        <View className='flex-row max-w-full items-center bg-gray-100 rounded-full px-4 mb-6'>
                            <TextInput
                                placeholder="Contraseña"
                                className=" w-11/12 py-3"
                                secureTextEntry={!seePassword}
                                value={password}
                                onChangeText={val => setPassword(val)}
                            />
                            <TouchableOpacity onPress={() => setSeePassword(!seePassword)}>
                            {
                                seePassword ? (
                                <FontAwesome5 name="eye-slash" size={24} color="gray" />
                                ) : (
                                <FontAwesome5 name="eye" size={24} color="gray" />
                                )
                            }
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity className="bg-red-500 rounded-full py-3 px-4 mb-4" onPress={() => DoSignIn()}>
                            <Text className="text-white text-center font-semibold">Iniciar sesión</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => { navigation.navigate('new-reg') }}>
                            <Text className="text-red-500 text-center mb-4">¿Olvidaste tu contraseña?</Text>
                        </TouchableOpacity>
                        <View className="flex-row justify-center space-x-4 mb-4">
                            <SocialIcon type="google" />
                            <SocialIcon type="facebook" />
                            <SocialIcon type="twitter" />
                        </View>
                        </>
                    ) : (
                        // Register
                        <>
                        <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">
                            Únete a la comunidad BloodMatch
                        </Text>
                        
                        <TextInput
                            placeholder="Nombre(s)"
                            className="bg-gray-100 rounded-full py-3 px-4 mb-4"
                            value={register.firstName}
                            onChangeText={(value) => handleInputChange("firstName", value)}
                        />

                        <TextInput
                            placeholder="Apellidos"
                            className="bg-gray-100 rounded-full py-3 px-4 mb-4"
                            value={register.lastName}
                            onChangeText={(value) => handleInputChange("lastName", value)}
                        />
                           

                        <TouchableOpacity
                            className="bg-gray-100 rounded-full py-3 px-4 mb-4 flex flex-row justify-between"
                            onPress={ () => setShowPicker(true)}
                        >
                            <Text className="text-black/60">
                                {register.birthDate
                                ? register.birthDate.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
                                : "Fecha de nacimiento"}
                            </Text>
                            <FontAwesome5 name="calendar-alt" size={24} color="gray"/>
                            {showPicker &&
                                <DateTimePicker
                                    value={register.birthDate || new Date()}
                                    mode="date" 
                                    display={Platform.OS === "ios" ? "inline" : "default"} 
                                    onChange={handleCalendar} 
                                />
                            }
                        </TouchableOpacity>

                        <View className="flex-row justify-between mb-4">
                            <TouchableOpacity
                                className={`flex-1 py-2 px-4 rounded-full mr-2 ${register.gender === 'female' ? 'bg-red-500' : 'bg-gray-200'}`}
                                onPress={() => handleInputChange('gender', 'female')}
                            >
                            <Text className={`text-center ${register.gender === 'female' ? 'text-white' : 'text-gray-600'}`}>Soy mujer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className={`flex-1 py-2 px-4 rounded-full ml-2 ${register.gender === 'male' ? 'bg-red-500' : 'bg-gray-200'}`}
                                onPress={() => handleInputChange('gender','male')}
                            >
                            <Text className={`text-center ${register.gender === 'male' ? 'text-white' : 'text-gray-600'}`}>Soy hombre</Text>
                            </TouchableOpacity>
                        </View>
        
                        <View className='flex-row justify-between'>
                            <View className="bg-gray-100 rounded-full mb-4 w-[48%]">
                                <Picker
                                    selectedValue={register.state}
                                    onValueChange={(itemValue) => handleInputChange('state',itemValue)}
                                    style={{color: 'gray', height: 52}}
                                >
                                    <Picker.Item label="Estado" value="" style={{fontSize: 15}}/>
                                    <Picker.Item label="Jalisco" value="Jalisco" />
                                    <Picker.Item label="Oaxaca" value="Oaxaca" />
                                </Picker>
                            </View>
                            <View className="bg-gray-100 rounded-full mb-4 w-[48%]">
                                <Picker
                                    selectedValue={register.municipality}
                                    onValueChange={(itemValue) => handleInputChange('municipality',itemValue)}
                                    style={{color: 'gray', height: 52 }}
                                >
                                    <Picker.Item label="Municipio" value="" style={{fontSize: 15}}/>
                                    <Picker.Item label="Tonala" value="Tonala" />
                                    <Picker.Item label="Guadalajara" value="Guadalajara" />
                                </Picker>
                            </View>
                        </View>
                        
                        <TextInput
                            placeholder="Numero telefonico"
                            className="bg-gray-100 rounded-full py-3 px-4 mb-4"
                            value={register.phoneNumber}
                            onChangeText={(value) => handleInputChange('phoneNumber',value)}
                        />
        
                        <TextInput
                            placeholder="Correo electrónico"
                            className="bg-gray-100 rounded-full py-3 px-4 mb-4"
                            keyboardType="email-address"
                            value={register.email}
                            onChangeText={(value) => handleInputChange('email',value)}
                        />

                        <View className='bg-gray-100 rounded-full px-4 mb-4 flex-row justify-between items-center'>
                            <TextInput
                                placeholder="Contraseña"
                                className="w-3/4"
                                secureTextEntry
                                value={register.password}
                                onChangeText={(value) => handleInputChange('password',value)}
                            />
                            <TouchableOpacity onPress={handleInfoPassword}>
                                <FontAwesome5 name="info-circle" size={24} color="gray" />
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            placeholder="Confirmar contraseña"
                            className="bg-gray-100 rounded-full py-3 px-4 mb-4"
                            secureTextEntry
                            value={register.passwordConfirm}
                            onChangeText={(value) => handleInputChange('passwordConfirm',value)}
                        />

                        <View className="flex-row justify-between mb-4">
                            <TouchableOpacity
                                className={`flex-1 py-2 px-4 rounded-full mr-2 ${register.bloodTypeRol === 'donor' ? 'bg-red-500' : 'bg-gray-200'}`}
                                onPress={() => handleInputChange('bloodTypeRol', 'donor')}
                            >
                            <Text className={`text-center ${register.bloodTypeRol === 'donor' ? 'text-white' : 'text-gray-600'}`}>Donador</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className={`flex-1 py-2 px-4 rounded-full ml-2 ${register.bloodTypeRol === 'recipient' ? 'bg-red-500' : 'bg-gray-200'}`}
                                onPress={() => handleInputChange('bloodTypeRol', 'recipient')}	
                            >
                            <Text className={`text-center ${register.bloodTypeRol === 'recipient' ? 'text-white' : 'text-gray-600'}`}>Receptor</Text>
                            </TouchableOpacity>
                        </View>

                        <View className="bg-gray-100 rounded-full pr-4 mb-4">
                            <Picker
                                selectedValue={register.bloodType}
                                onValueChange={(itemValue) => handleInputChange('bloodType',itemValue)}
                                style={{color: 'gray', height: 52 }}
                            >
                                <Picker.Item label="Grupo sanguíneo" value="" style={{fontSize: 15}}/>
                                <Picker.Item label="A+" value="A+" />
                                <Picker.Item label="A-" value="A-" />
                                <Picker.Item label="B+" value="B+" />
                                <Picker.Item label="B-" value="B-" />
                                <Picker.Item label="AB+" value="AB+" />
                                <Picker.Item label="AB-" value="AB-" />
                                <Picker.Item label="O+" value="O+" />
                                <Picker.Item label="O-" value="O-" />
                            </Picker>
                        </View>

                        <TouchableOpacity
                            className="bg-gray-100 rounded-full py-3 px-4 mb-4 flex flex-row justify-between"
                            onPress={pickImage}
                        >
                            <Text className="text-black/60">{
                                isImageLoaded 
                                ? "Imagen cargada"
                                : "Imagen de perfil"
                            }</Text>
                            <FontAwesome5 name="upload" size={24} color="gray" />
                        </TouchableOpacity>

                        {isImageLoading && <ActivityIndicator
                            color={'red'}
                            size={'large'}
                        />}

                        { (isImageLoading === false && isImageLoaded === true) &&
                            <View className='w-full flex flex-row justify-center mb-4'>
                                <Image
                                    source={{uri: register.uriImage}}
                                    className='w-36 h-36 rounded-full'
                                />
                            </View>
                        }
                        
                        <View className="flex-row items-center mb-4">
                            <TouchableOpacity className="mr-2" onPress={() => {handleInputChange('termsAgree', !register.termsAgree)}}>
                            {
                                register.termsAgree ? (
                                <FontAwesome5 name="check-square" size={24} color="red" />
                                ) : (
                                <FontAwesome5 name="square" size={24} color="gray" />
                                )
                            }
                            </TouchableOpacity>

                            <Text className="text-gray-600 h-full">
                                Acepto los
                            </Text>
                            <TouchableOpacity 
                                onPress={() => navigation.push(t("termycondi"))}
                                className='ml-1 h-full'
                            > 
                                <Text className="text-red-500">
                                    términos y condiciones
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity 
                            className="bg-red-500 rounded-full py-3 px-4 mb-4"
                            onPress={handleSubmitRegister}
                        >
                            <Text className="text-white text-center font-semibold">Comienza a ayudar</Text>
                        </TouchableOpacity>
                        </>
                    )}
                    </View>
                </View>
        
                <Text className="text-center text-gray-600 mt-6">
                    Unirte a BloodMatch es un paso hacia salvar vidas.
                </Text>
                </View>

                
            </ScrollView>
            <GenericModal isVisible={isModalVisible} onClose={toggleModal}>
                <Text className="text-xl font-bold mb-4">{titleModal}</Text>
                <Text>{textModal}</Text>
            </GenericModal>
        </SafeAreaView>
    );
};

export default LogIn;
