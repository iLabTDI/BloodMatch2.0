import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SocialIcon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome5 } from '@expo/vector-icons';
import GenericModal from '../components/GenericModal';
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from 'expo-image-picker';

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
           const data = await getDates(email.trim(), password.trim());
           const usuario = data[0];
            if (usuario && usuario.password === password) {
                // setGlobalData('usuario', ema);
                setGlobalData('email', email);
                navigation.push('Home');
            } else {
                setTitleModal("Error");
                setTextModal("Correo y/o contraseña incorrectos");
                setIsModalVisible(true);
            }
        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            setTitleModal("Error");
            setTextModal("Error al intentar iniciar sesión");
            setIsModalVisible(true);
            // alert.apply("error")
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
        - Debe incluir al menos una letra minúscula
        - Debe tener al menos un número 
        - Debe tener al menos un símbolo especial
        - No debe tener espacios
        `);
        setIsModalVisible(true);
    }

    const handleSubmitRegister = async () => {
        let validateFields = [vFirstName = validations.firstName(register.firstName),
        vLastName = validations.lastName(register.lastName),
        vBirthDate = validations.birthDate(register.birthDate),
        vState = validations.state(register.state),
        vMunicipality = validations.municipality(register.municipality),
        vPhoneNumber = validations.phoneNumber(register.phoneNumber),
        vEmail = await validations.email(register.email),
        vPassword = validations.password(register.password),
        vPasswordConfirm = validations.passwordConfirm(register.password, register.passwordConfirm),
        vBloodType = validations.bloodType(register.bloodType),
        vUriImage = validations.image(register.uriImage),
        vTermsAgree = validations.termsAgree(register.termsAgree)];

        const firstError = validateFields.find(el => el.message);

        if (firstError) {
            setTitleModal("Error");
            setTextModal(firstError.message);
            setIsModalVisible(true);
        } else {
            // Register new user 
            try {
                let user = register.email.trim();
                await New_User(
                    register.email.trim(),
                    register.firstName.trim(),
                    register.lastName.trim(),
                    register.birthDate,
                    register.bloodType.trim(),
                    register.bloodTypeRol.trim(),
                    register.gender.trim(),
                    register.password.trim(),
                    register.state.trim(),
                    register.municipality.trim(),
                    register.phoneNumber.trim(),
                    user,
                    register.uriImage.trim()
                );

                setTitleModal("Éxito");
                setTextModal("El formulario se envió correctamente");
                setIsModalVisible(true); 
                setRegister({
                    firstName: "",
                    lastName: "",
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
                setIsImageLoading(false);
                setIsImageLoaded(false);
                setActiveTab('login');
            } catch (error) {
                setTitleModal("Error");
                setTextModal("Error al intentar registrar nuevo usuario, por favor intentalo mas tarde");
                setIsModalVisible(true);   
            }
        }
    }

    return (
<<<<<<< HEAD
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

=======
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
                            {t("log-in")}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={`flex-1 py-4 ${activeTab === 'register' ? 'bg-red-500' : 'bg-gray-200'}`}
                        onPress={() => setActiveTab('register')}
                    >
                        <Text className={`text-center font-semibold ${activeTab === 'register' ? 'text-white' : 'text-gray-600'}`}>
                            {t("rgst")}
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
                            placeholder="Correo"
                            className="bg-gray-100 rounded-full py-3 px-4 mb-4"
                            keyboardType="email-address"
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
                            {/* <SocialIcon type="twitter" /> */}
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

>>>>>>> 58caf9ffc74fb5e4d13fd47e616cf4f4a90f8536
export default LogIn;
