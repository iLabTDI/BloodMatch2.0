import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
    Platform,
    ActivityIndicator,
    StatusBar,
    KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SocialIcon } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome5 } from "@expo/vector-icons";
import GenericModal from "../components/GenericModal";
import ModalForgotPassword from "../components/ModalForgotPassword";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useTranslation } from "react-i18next";
const PlaceImage = require("../assets/logotipo.png");
import { getDates } from "../lib/querys";
import { setGlobalData } from "../backend/querys/inserts/New_email";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { send, EmailJSResponseStatus } from "@emailjs/react-native";
import "react-native-url-polyfill/auto";
import Constants from "expo-constants";

import { handleSubmit, getUrl } from "../lib/querys";
import validations from "../helper/validations.js";
import { New_User } from "../lib/querys";
import estadosMunicipios from "../assets/estados_municipios.json";
import WhiteFullScreen from "../components/WhiteFullScreen";

const LogIn = (props) => {
    const { navigation } = props;
    const { t } = useTranslation();

    // Login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Login/Register UI helpers components
    const [activeTab, setActiveTab] = useState("login");
    const [seePassword, setSeePassword] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [isLoadingLogIn, setIsLoadingLogIn] = useState(false);
    const [isLoadingRegister, setIsLoadingRegister] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [municipios, setMunicipios] = useState([]);

    // Modal in error case
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [textModal, setTextModal] = useState("");

    const [isModalForgotPasswordVisible, setIsModalForgotPasswordVisible] =
        useState(false);

    // Register
    const [register, setRegister] = useState({
        firstName: "",
        lastName: "",
        userName: "",
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

    const [isLoading, setIsLoading] = useState(true);

    const saveSession = async (email) => {
        try {
            await AsyncStorage.setItem("email", email);
            console.log(`Guardado: ${email}`);
        } catch (error) {
            console.error("Error al guardar en AsyncStorage:", error);
        }
    };

    const getSession = async () => {
        try {
            const value = await AsyncStorage.getItem("email");
            if (value !== null) {
                console.log(`Valor leído de email:`, value);
                return value;
            } else {
                console.log(`No se encontró valor para email`);
                return null;
            }
        } catch (error) {
            console.error("Error al leer de AsyncStorage:", error);
            return null;
        }
    };

    useEffect(() => {
        getSession()
            .then((res) => {
                if (res !== null) {
                    setGlobalData("email", res);
                    navigation.push("Home");
                } else {
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                console.log("Error al recuperar la sesion: ", error);
            });
    }, []);

    const DoSignIn = async () => {
        setIsLoadingLogIn(true);
        try {
            const usuario = await getDates(email.trim());

            console.log("USUARIO ISÑOÑIÑOUÑAEJ: ", usuario);

            if (usuario) {
                if (usuario.Is_Verified) {
                    const passwordMatch = await bcrypt.compareSync(
                        password,
                        usuario.Password
                    );

                    if (passwordMatch) {
                        setGlobalData("email", email);
                        if ((await getSession()) === null) {
                            await saveSession(email);
                        }
                        navigation.push("Home");
                    } else {
                        setTitleModal(t("error"));
                        setTextModal(t("error_email_pass"));
                        setIsModalVisible(true);
                    }
                } else {
                    setTitleModal(t("error"));
                    setTextModal(t("no_validated"));
                    setIsModalVisible(true);
                }
            } else {
                setTitleModal(t("error"));
                setTextModal(t("error_email_pass"));
                setIsModalVisible(true);
            }
        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            setTitleModal(t("error"));
            setTextModal(t("error_login"));
            setIsModalVisible(true);
        }
        setIsLoadingLogIn(false);
    };

    const toggleModal = () => setIsModalVisible(!isModalVisible);

    const handleInputChange = (field, value) => {
        setRegister((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const printRegister = () => {
        console.log(
            "**********************************************************"
        );
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
    };

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
                    setTitleModal(t("error"));
                    setTextModal(t("error_image"));
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
        setTitleModal(t("characteristics_pass_title"));
        setTextModal(t("characteristics_pass"));
        setIsModalVisible(true);
    };

    const submitVerificationEmail = async (email, name, token) => {
        let res = {
            status: 0,
            message: "",
        };
        try {
            await send(
                Constants.expoConfig.extra.EMAILJS_SERVICE_ID,
                Constants.expoConfig.extra.EMAILJS_TEMPLATE_ID_WELCOME,
                {
                    email,
                    to_name: name,
                    verification_link: `https://bloodmatch-verification-email.onrender.com/verificacion/${token}`,
                },
                {
                    publicKey: Constants.expoConfig.extra.EMAILJS_PUBLIC_KEY,
                }
            );
            res.status = 200;
            res.message = "success";
            console.log("SUCCESS! ", res);
        } catch (err) {
            if (err instanceof EmailJSResponseStatus) {
                console.log("EmailJS Request Failed...", err);
            }
            res.status = 500;
            res.message = "error";
            console.log("ERROR", err, res);
        }
        return res;
    };

    const handleSubmitRegister = async () => {
        setIsLoadingRegister(true);
        const token = uuidv4();
        let validateFields = [
            (vFirstName = validations.firstName(register.firstName)),
            (vLastName = validations.lastName(register.lastName)),
            (vBirthDate = validations.birthDate(register.birthDate)),
            (vState = validations.state(register.state)),
            (vMunicipality = validations.municipality(register.municipality)),
            (vPhoneNumber = validations.phoneNumber(register.phoneNumber)),
            (vEmail = await validations.email(register.email)),
            (vPassword = validations.password(register.password)),
            (vPasswordConfirm = validations.passwordConfirm(
                register.password,
                register.passwordConfirm
            )),
            (vBloodType = validations.bloodType(register.bloodType)),
            (vUriImage = validations.image(register.uriImage)),
            (vTermsAgree = validations.termsAgree(register.termsAgree)),
        ];

        const firstError = validateFields.find((el) => el.message);

        if (firstError) {
            setTitleModal(t("error"));
            setTextModal(firstError.message);
            setIsModalVisible(true);
        } else {
            // Register new user
            try {
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
                    register.uriImage.trim(),
                    token
                );

                let resEmailSend = await submitVerificationEmail(
                    register.email.trim(),
                    register.firstName.trim(),
                    token
                );
                if (resEmailSend.status === 200) {
                    setTitleModal(t("success"));
                    setTextModal(t("success_form_submit"));
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
                    setActiveTab("login");
                } else {
                    setTitleModal(t("error"));
                    setTextModal(t("error_form_submit"));
                    setIsModalVisible(true);
                }
            } catch (error) {
                setTitleModal(t("error"));
                setTextModal(t("error_form_submit"));
                setIsModalVisible(true);
            }
        }
        setIsLoadingRegister(false);
    };

    const INPUT_HEIGHT = 48;

    return (
        <>
            {isLoading ? (
                <WhiteFullScreen />
            ) : (
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <SafeAreaView className="flex-1 bg-red-50">
                        <StatusBar
                            backgroundColor={"#FEF2F2"}
                            barStyle={"dark-content"}
                        />

                        <ScrollView
                            contentContainerClassName="flex-grow justify-center items-center p-4"
                            showsVerticalScrollIndicator={false}
                        >
                            <View className="w-full max-w-md">
                                {/* Logo y título */}
                                <View className="mb-8 items-center">
                                    <Image
                                        source={PlaceImage}
                                        className="w-24 h-24"
                                        resizeMode="contain"
                                    />
                                    <Text className="text-3xl font-bold text-red-600 mt-2">
                                        BloodMatch
                                    </Text>
                                </View>

                                {/* Contenedor principal */}
                                <View className="bg-white rounded-3xl shadow-lg overflow-hidden w-11/12 m-auto">
                                    {/* Tabs de navegación */}
                                    <View className="flex-row">
                                        <TouchableOpacity
                                            className={`flex-1 py-4 ${
                                                activeTab === "login"
                                                    ? "bg-red-500"
                                                    : "bg-gray-200"
                                            }`}
                                            onPress={() =>
                                                setActiveTab("login")
                                            }
                                        >
                                            <Text
                                                className={`text-center font-semibold ${
                                                    activeTab === "login"
                                                        ? "text-white"
                                                        : "text-gray-600"
                                                }`}
                                            >
                                                {t("log_in")}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            className={`flex-1 py-4 ${
                                                activeTab === "register"
                                                    ? "bg-red-500"
                                                    : "bg-gray-200"
                                            }`}
                                            onPress={() =>
                                                setActiveTab("register")
                                            }
                                        >
                                            <Text
                                                className={`text-center font-semibold ${
                                                    activeTab === "register"
                                                        ? "text-white"
                                                        : "text-gray-600"
                                                }`}
                                            >
                                                {t("register")}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View className="p-6">
                                        {/* Login */}
                                        {activeTab === "login" ? (
                                            <>
                                                <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                                    {t("title_login")}
                                                </Text>

                                                {/* Email input */}
                                                <View className="bg-gray-100 rounded-full mb-4 flex-row items-center px-4">
                                                    <FontAwesome5
                                                        name="envelope"
                                                        size={18}
                                                        color="gray"
                                                    />
                                                    <TextInput
                                                        placeholder={t("email")}
                                                        className="flex-1 ml-3"
                                                        keyboardType="email-address"
                                                        value={email}
                                                        onChangeText={(val) =>
                                                            setEmail(val)
                                                        }
                                                        style={{
                                                            height: INPUT_HEIGHT,
                                                        }}
                                                    />
                                                </View>

                                                {/* Password input */}
                                                <View className="bg-gray-100 rounded-full mb-6 flex-row items-center px-4">
                                                    <FontAwesome5
                                                        name="lock"
                                                        size={18}
                                                        color="gray"
                                                    />
                                                    <TextInput
                                                        placeholder={t(
                                                            "password"
                                                        )}
                                                        className="flex-1 ml-3"
                                                        secureTextEntry={
                                                            !seePassword
                                                        }
                                                        value={password}
                                                        onChangeText={(val) =>
                                                            setPassword(val)
                                                        }
                                                        style={{
                                                            height: INPUT_HEIGHT,
                                                        }}
                                                    />
                                                    <TouchableOpacity
                                                        onPress={() =>
                                                            setSeePassword(
                                                                !seePassword
                                                            )
                                                        }
                                                    >
                                                        <FontAwesome5
                                                            name={
                                                                seePassword
                                                                    ? "eye-slash"
                                                                    : "eye"
                                                            }
                                                            size={20}
                                                            color="gray"
                                                        />
                                                    </TouchableOpacity>
                                                </View>

                                                {/* Login button */}
                                                <TouchableOpacity
                                                    className={`rounded-full py-3.5 px-4 mb-4 ${
                                                        isLoadingLogIn
                                                            ? "bg-red-300"
                                                            : "bg-red-500"
                                                    }`}
                                                    onPress={() => DoSignIn()}
                                                    disabled={isLoadingLogIn}
                                                >
                                                    {isLoadingLogIn ? (
                                                        <ActivityIndicator
                                                            color="white"
                                                            size="small"
                                                        />
                                                    ) : (
                                                        <Text className="text-white text-center font-semibold">
                                                            {t("log_in")}
                                                        </Text>
                                                    )}
                                                </TouchableOpacity>

                                                {/* Forgot password */}
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        setIsModalForgotPasswordVisible(
                                                            true
                                                        )
                                                    }
                                                    className="mb-2"
                                                >
                                                    <Text className="text-red-500 text-center">
                                                        {t("forgot_password")}
                                                    </Text>
                                                </TouchableOpacity>
                                            </>
                                        ) : (
                                            // Register
                                            <>
                                                <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                                    {t("title_register")}
                                                </Text>

                                                {/* First name */}
                                                <View className="bg-gray-100 rounded-full mb-4 flex-row items-center px-4">
                                                    <FontAwesome5
                                                        name="user"
                                                        size={18}
                                                        color="gray"
                                                    />
                                                    <TextInput
                                                        placeholder={t("name")}
                                                        className="flex-1 ml-3"
                                                        value={
                                                            register.firstName
                                                        }
                                                        onChangeText={(value) =>
                                                            handleInputChange(
                                                                "firstName",
                                                                value
                                                            )
                                                        }
                                                        style={{
                                                            height: INPUT_HEIGHT,
                                                        }}
                                                    />
                                                </View>

                                                {/* Last name */}
                                                <View className="bg-gray-100 rounded-full mb-4 flex-row items-center px-4">
                                                    <FontAwesome5
                                                        name="user"
                                                        size={18}
                                                        color="gray"
                                                    />
                                                    <TextInput
                                                        placeholder={t(
                                                            "last_name"
                                                        )}
                                                        className="flex-1 ml-3"
                                                        value={
                                                            register.lastName
                                                        }
                                                        onChangeText={(value) =>
                                                            handleInputChange(
                                                                "lastName",
                                                                value
                                                            )
                                                        }
                                                        style={{
                                                            height: INPUT_HEIGHT,
                                                        }}
                                                    />
                                                </View>

                                                {/* Date of birth */}
                                                <TouchableOpacity
                                                    className="bg-gray-100 rounded-full mb-4 flex-row items-center px-4"
                                                    onPress={() =>
                                                        setShowPicker(true)
                                                    }
                                                    style={{
                                                        height: INPUT_HEIGHT,
                                                    }}
                                                >
                                                    <FontAwesome5
                                                        name="calendar-alt"
                                                        size={18}
                                                        color="gray"
                                                    />
                                                    <Text className="flex-1 ml-3 text-black/60">
                                                        {register.birthDate
                                                            ? register.birthDate.toLocaleDateString(
                                                                  "es-ES",
                                                                  {
                                                                      year: "numeric",
                                                                      month: "long",
                                                                      day: "numeric",
                                                                  }
                                                              )
                                                            : t("dob")}
                                                    </Text>
                                                    <FontAwesome5
                                                        name="chevron-down"
                                                        size={16}
                                                        color="gray"
                                                    />
                                                    {showPicker && (
                                                        <DateTimePicker
                                                            value={
                                                                register.birthDate ||
                                                                new Date()
                                                            }
                                                            mode="date"
                                                            display={
                                                                Platform.OS ===
                                                                "ios"
                                                                    ? "inline"
                                                                    : "default"
                                                            }
                                                            onChange={
                                                                handleCalendar
                                                            }
                                                        />
                                                    )}
                                                </TouchableOpacity>

                                                {/* Gender selection */}
                                                <View className="flex-row justify-between mb-4">
                                                    <TouchableOpacity
                                                        className={`flex-1 py-3.5 px-4 rounded-full mr-2 flex-row justify-center items-center ${
                                                            register.gender ===
                                                            "female"
                                                                ? "bg-red-500"
                                                                : "bg-gray-200"
                                                        }`}
                                                        onPress={() =>
                                                            handleInputChange(
                                                                "gender",
                                                                "female"
                                                            )
                                                        }
                                                    >
                                                        <FontAwesome5
                                                            name="venus"
                                                            size={16}
                                                            color={
                                                                register.gender ===
                                                                "female"
                                                                    ? "white"
                                                                    : "gray"
                                                            }
                                                            style={{
                                                                marginRight: 8,
                                                            }}
                                                        />
                                                        <Text
                                                            className={`text-center ${
                                                                register.gender ===
                                                                "female"
                                                                    ? "text-white"
                                                                    : "text-gray-600"
                                                            }`}
                                                        >
                                                            {t("i_am_a_woman")}
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        className={`flex-1 py-3.5 px-4 rounded-full ml-2 flex-row justify-center items-center ${
                                                            register.gender ===
                                                            "male"
                                                                ? "bg-red-500"
                                                                : "bg-gray-200"
                                                        }`}
                                                        onPress={() =>
                                                            handleInputChange(
                                                                "gender",
                                                                "male"
                                                            )
                                                        }
                                                    >
                                                        <FontAwesome5
                                                            name="mars"
                                                            size={16}
                                                            color={
                                                                register.gender ===
                                                                "male"
                                                                    ? "white"
                                                                    : "gray"
                                                            }
                                                            style={{
                                                                marginRight: 8,
                                                            }}
                                                        />
                                                        <Text
                                                            className={`text-center ${
                                                                register.gender ===
                                                                "male"
                                                                    ? "text-white"
                                                                    : "text-gray-600"
                                                            }`}
                                                        >
                                                            {t("i_am_a_man")}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>

                                                {/* State and Municipality */}
                                                <View className="flex-row justify-between">
                                                    <View className="bg-gray-100 rounded-full mb-4 w-[48%] flex-row items-center px-2">
                                                        <FontAwesome5
                                                            name="map-marker-alt"
                                                            size={18}
                                                            color="gray"
                                                            style={{
                                                                marginLeft: 8,
                                                            }}
                                                        />
                                                        <Picker
                                                            selectedValue={
                                                                register.state
                                                            }
                                                            onValueChange={(
                                                                itemValue
                                                            ) => {
                                                                handleInputChange(
                                                                    "state",
                                                                    itemValue
                                                                );
                                                                setMunicipios(
                                                                    Array.isArray(
                                                                        estadosMunicipios[
                                                                            itemValue
                                                                        ]
                                                                    )
                                                                        ? estadosMunicipios[
                                                                              itemValue
                                                                          ]
                                                                        : []
                                                                );
                                                                handleInputChange(
                                                                    "municipality",
                                                                    ""
                                                                );
                                                            }}
                                                            style={{
                                                                color: "gray",
                                                                height: INPUT_HEIGHT,
                                                                flex: 1,
                                                                marginLeft: 4,
                                                            }}
                                                        >
                                                            <Picker.Item
                                                                label={t(
                                                                    "state"
                                                                )}
                                                                value=""
                                                            />
                                                            {Object.keys(
                                                                estadosMunicipios
                                                            ).map((estado) => (
                                                                <Picker.Item
                                                                    key={estado}
                                                                    label={
                                                                        estado
                                                                    }
                                                                    value={
                                                                        estado
                                                                    }
                                                                />
                                                            ))}
                                                        </Picker>
                                                    </View>

                                                    <View className="bg-gray-100 rounded-full mb-4 w-[48%] flex-row items-center px-2">
                                                        <FontAwesome5
                                                            name="city"
                                                            size={16}
                                                            color="gray"
                                                            style={{
                                                                marginLeft: 8,
                                                            }}
                                                        />
                                                        <Picker
                                                            selectedValue={
                                                                register.municipality
                                                            }
                                                            onValueChange={(
                                                                itemValue
                                                            ) =>
                                                                handleInputChange(
                                                                    "municipality",
                                                                    itemValue
                                                                )
                                                            }
                                                            style={{
                                                                color: "gray",
                                                                height: INPUT_HEIGHT,
                                                                flex: 1,
                                                                marginLeft: 4,
                                                            }}
                                                            enabled={
                                                                municipios.length >
                                                                0
                                                            }
                                                        >
                                                            <Picker.Item
                                                                label={t(
                                                                    "municipality"
                                                                )}
                                                                value=""
                                                            />
                                                            {municipios.map(
                                                                (municipio) => (
                                                                    <Picker.Item
                                                                        key={
                                                                            municipio
                                                                        }
                                                                        label={
                                                                            municipio
                                                                        }
                                                                        value={
                                                                            municipio
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                        </Picker>
                                                    </View>
                                                </View>

                                                {/* Phone number */}
                                                <View className="bg-gray-100 rounded-full mb-4 flex-row items-center px-4">
                                                    <FontAwesome5
                                                        name="phone"
                                                        size={18}
                                                        color="gray"
                                                    />
                                                    <TextInput
                                                        placeholder={t(
                                                            "phone_number"
                                                        )}
                                                        className="flex-1 ml-3"
                                                        keyboardType="phone-pad"
                                                        value={
                                                            register.phoneNumber
                                                        }
                                                        onChangeText={(value) =>
                                                            handleInputChange(
                                                                "phoneNumber",
                                                                value
                                                            )
                                                        }
                                                        style={{
                                                            height: INPUT_HEIGHT,
                                                        }}
                                                    />
                                                </View>

                                                {/* Email */}
                                                <View className="bg-gray-100 rounded-full mb-4 flex-row items-center px-4">
                                                    <FontAwesome5
                                                        name="envelope"
                                                        size={18}
                                                        color="gray"
                                                    />
                                                    <TextInput
                                                        placeholder={t("email")}
                                                        className="flex-1 ml-3"
                                                        keyboardType="email-address"
                                                        value={register.email}
                                                        onChangeText={(value) =>
                                                            handleInputChange(
                                                                "email",
                                                                value
                                                            )
                                                        }
                                                        style={{
                                                            height: INPUT_HEIGHT,
                                                        }}
                                                    />
                                                </View>

                                                {/* Password */}
                                                <View className="bg-gray-100 rounded-full mb-4 flex-row items-center px-4">
                                                    <FontAwesome5
                                                        name="lock"
                                                        size={18}
                                                        color="gray"
                                                    />
                                                    <TextInput
                                                        placeholder={t(
                                                            "password"
                                                        )}
                                                        className="flex-1 ml-3"
                                                        secureTextEntry={true}
                                                        value={
                                                            register.password
                                                        }
                                                        onChangeText={(value) =>
                                                            handleInputChange(
                                                                "password",
                                                                value
                                                            )
                                                        }
                                                        style={{
                                                            height: INPUT_HEIGHT,
                                                        }}
                                                    />
                                                    <TouchableOpacity
                                                        onPress={
                                                            handleInfoPassword
                                                        }
                                                    >
                                                        <FontAwesome5
                                                            name="info-circle"
                                                            size={20}
                                                            color="gray"
                                                        />
                                                    </TouchableOpacity>
                                                </View>

                                                {/* Confirm Password */}
                                                <View className="bg-gray-100 rounded-full mb-4 flex-row items-center px-4">
                                                    <FontAwesome5
                                                        name="lock"
                                                        size={18}
                                                        color="gray"
                                                    />
                                                    <TextInput
                                                        placeholder={t(
                                                            "confirm_password"
                                                        )}
                                                        className="flex-1 ml-3"
                                                        secureTextEntry={true}
                                                        value={
                                                            register.passwordConfirm
                                                        }
                                                        onChangeText={(value) =>
                                                            handleInputChange(
                                                                "passwordConfirm",
                                                                value
                                                            )
                                                        }
                                                        style={{
                                                            height: INPUT_HEIGHT,
                                                        }}
                                                    />
                                                </View>

                                                {/* User type selection */}
                                                <View className="flex-row justify-between mb-4">
                                                    <TouchableOpacity
                                                        className={`flex-1 py-3.5 px-4 rounded-full mr-2 flex-row justify-center items-center ${
                                                            register.bloodTypeRol ===
                                                            "donor"
                                                                ? "bg-red-500"
                                                                : "bg-gray-200"
                                                        }`}
                                                        onPress={() =>
                                                            handleInputChange(
                                                                "bloodTypeRol",
                                                                "donor"
                                                            )
                                                        }
                                                    >
                                                        <FontAwesome5
                                                            name="heart"
                                                            size={16}
                                                            color={
                                                                register.bloodTypeRol ===
                                                                "donor"
                                                                    ? "white"
                                                                    : "gray"
                                                            }
                                                            style={{
                                                                marginRight: 8,
                                                            }}
                                                        />
                                                        <Text
                                                            className={`text-center ${
                                                                register.bloodTypeRol ===
                                                                "donor"
                                                                    ? "text-white"
                                                                    : "text-gray-600"
                                                            }`}
                                                        >
                                                            {t("donor")}
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        className={`flex-1 py-3.5 px-4 rounded-full ml-2 flex-row justify-center items-center ${
                                                            register.bloodTypeRol ===
                                                            "recipient"
                                                                ? "bg-red-500"
                                                                : "bg-gray-200"
                                                        }`}
                                                        onPress={() =>
                                                            handleInputChange(
                                                                "bloodTypeRol",
                                                                "recipient"
                                                            )
                                                        }
                                                    >
                                                        <FontAwesome5
                                                            name="user-plus"
                                                            size={16}
                                                            color={
                                                                register.bloodTypeRol ===
                                                                "recipient"
                                                                    ? "white"
                                                                    : "gray"
                                                            }
                                                            style={{
                                                                marginRight: 8,
                                                            }}
                                                        />
                                                        <Text
                                                            className={`text-center ${
                                                                register.bloodTypeRol ===
                                                                "recipient"
                                                                    ? "text-white"
                                                                    : "text-gray-600"
                                                            }`}
                                                        >
                                                            {t("recipient")}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>

                                                {/* Blood type */}
                                                <View className="bg-gray-100 rounded-full mb-4 flex-row items-center px-4">
                                                    <FontAwesome5
                                                        name="tint"
                                                        size={18}
                                                        color="gray"
                                                    />
                                                    <Picker
                                                        selectedValue={
                                                            register.bloodType
                                                        }
                                                        onValueChange={(
                                                            itemValue
                                                        ) =>
                                                            handleInputChange(
                                                                "bloodType",
                                                                itemValue
                                                            )
                                                        }
                                                        style={{
                                                            color: "gray",
                                                            height: INPUT_HEIGHT,
                                                            flex: 1,
                                                            marginLeft: 8,
                                                        }}
                                                    >
                                                        <Picker.Item
                                                            label={t(
                                                                "blood_type"
                                                            )}
                                                            value=""
                                                        />
                                                        <Picker.Item
                                                            label="A+"
                                                            value="A+"
                                                        />
                                                        <Picker.Item
                                                            label="A-"
                                                            value="A-"
                                                        />
                                                        <Picker.Item
                                                            label="B+"
                                                            value="B+"
                                                        />
                                                        <Picker.Item
                                                            label="B-"
                                                            value="B-"
                                                        />
                                                        <Picker.Item
                                                            label="AB+"
                                                            value="AB+"
                                                        />
                                                        <Picker.Item
                                                            label="AB-"
                                                            value="AB-"
                                                        />
                                                        <Picker.Item
                                                            label="O+"
                                                            value="O+"
                                                        />
                                                        <Picker.Item
                                                            label="O-"
                                                            value="O-"
                                                        />
                                                    </Picker>
                                                </View>

                                                {/* Profile image */}
                                                <TouchableOpacity
                                                    className="bg-gray-100 rounded-full mb-4 flex-row items-center px-4"
                                                    onPress={pickImage}
                                                    style={{
                                                        height: INPUT_HEIGHT,
                                                    }}
                                                >
                                                    <FontAwesome5
                                                        name="user-circle"
                                                        size={18}
                                                        color="gray"
                                                    />
                                                    <Text className="flex-1 ml-3 text-black/60">
                                                        {isImageLoaded
                                                            ? t(
                                                                  "profile_image_success"
                                                              )
                                                            : t(
                                                                  "profile_image"
                                                              )}
                                                    </Text>
                                                    <FontAwesome5
                                                        name="upload"
                                                        size={18}
                                                        color="gray"
                                                    />
                                                </TouchableOpacity>

                                                {/* Image loading indicator */}
                                                {isImageLoading && (
                                                    <View className="items-center mb-4">
                                                        <ActivityIndicator
                                                            color={"red"}
                                                            size={"large"}
                                                        />
                                                    </View>
                                                )}

                                                {/* Profile image preview */}
                                                {isImageLoading === false &&
                                                    isImageLoaded === true && (
                                                        <View className="w-full flex flex-row justify-center mb-4">
                                                            <Image
                                                                source={{
                                                                    uri: register.uriImage,
                                                                }}
                                                                className="w-36 h-36 rounded-full border-2 border-red-500"
                                                            />
                                                        </View>
                                                    )}

                                                {/* Terms and conditions */}
                                                <View className="flex-row items-center mb-4">
                                                    <TouchableOpacity
                                                        className="mr-2"
                                                        onPress={() => {
                                                            handleInputChange(
                                                                "termsAgree",
                                                                !register.termsAgree
                                                            );
                                                        }}
                                                    >
                                                        {register.termsAgree ? (
                                                            <FontAwesome5
                                                                name="check-square"
                                                                size={22}
                                                                color="red"
                                                            />
                                                        ) : (
                                                            <FontAwesome5
                                                                name="square"
                                                                size={22}
                                                                color="gray"
                                                            />
                                                        )}
                                                    </TouchableOpacity>

                                                    <Text className="text-gray-600">
                                                        {t("accept_the")}
                                                    </Text>
                                                    <TouchableOpacity
                                                        onPress={() =>
                                                            navigation.push(
                                                                "termycondi"
                                                            )
                                                        }
                                                        className="ml-1"
                                                    >
                                                        <Text className="text-red-500 font-medium">
                                                            {t("terms")}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>

                                                {/* Register button */}
                                                <TouchableOpacity
                                                    className={`rounded-full py-3.5 px-4 mb-4 ${
                                                        isLoadingRegister
                                                            ? "bg-red-300"
                                                            : "bg-red-500"
                                                    }`}
                                                    onPress={
                                                        handleSubmitRegister
                                                    }
                                                    disabled={isLoadingRegister}
                                                >
                                                    {isLoadingRegister ? (
                                                        <ActivityIndicator
                                                            color="white"
                                                            size="small"
                                                        />
                                                    ) : (
                                                        <Text className="text-white text-center font-semibold">
                                                            {t("start_helping")}
                                                        </Text>
                                                    )}
                                                </TouchableOpacity>
                                            </>
                                        )}
                                    </View>
                                </View>

                                <Text className="text-center text-gray-600 mt-6">
                                    {t("footer_login")}
                                </Text>
                            </View>
                        </ScrollView>

                        {/* Modals */}
                        <GenericModal
                            isVisible={isModalVisible}
                            onClose={toggleModal}
                        >
                            <Text className="text-xl font-bold mb-4">
                                {titleModal}
                            </Text>
                            <Text>{textModal}</Text>
                        </GenericModal>

                        <ModalForgotPassword
                            isVisible={isModalForgotPasswordVisible}
                            onClose={() =>
                                setIsModalForgotPasswordVisible(false)
                            }
                        />
                    </SafeAreaView>
                </KeyboardAvoidingView>
            )}
        </>
    );
};

export default LogIn;
