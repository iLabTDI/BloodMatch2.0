import { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Animated,
    Dimensions,
    ActivityIndicator,
} from "react-native";
import { Mail, ArrowRight, Check, AlertCircle } from "react-native-feather";
import { isExistingEmail, updatePassword } from "@/lib/querys";
import { send, EmailJSResponseStatus } from "@emailjs/react-native";
import "react-native-url-polyfill/auto";
import Constants from "expo-constants";

const { height } = Dimensions.get("window");

const ModalForgotPassword = ({ isVisible, onClose }) => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: email input, 2: success message
    const [errorMessage, setErrorMessage] = useState("");

    const slideAnim = useRef(new Animated.Value(height)).current;

    useEffect(() => {
        if (isVisible) {
            Animated.spring(slideAnim, {
                toValue: -height / 8,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: height,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }, [isVisible]);

    function generateRandomLength() {
        return Math.floor(Math.random() * (20 - 8 + 1)) + 8;
    }

    const generateRandomPassword = (passLength = generateRandomLength()) => {
        if (passLength < 8) {
            throw new Error("La contraseña debe tener al menos 8 caracteres.");
        }

        const capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const tinyLetters = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const symbols = '!@#$%^&*(),.?":{}|<>';
        const all = capitalLetters + tinyLetters + numbers + symbols;

        let password = [
            capitalLetters[Math.floor(Math.random() * capitalLetters.length)],
            tinyLetters[Math.floor(Math.random() * tinyLetters.length)],
            numbers[Math.floor(Math.random() * numbers.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
        ];

        for (let i = password.length; i < passLength; i++) {
            password.push(all[Math.floor(Math.random() * all.length)]);
        }

        password = password.sort(() => Math.random() - 0.5);

        return password.join("");
    };

    const updateRandomPassword = async (email, password) => {
        let resQuery = await updatePassword(email, password);
        if (resQuery === null) {
            console.log("fracaso");
            return false;
        } else {
            console.log("exito");
            return true;
        }
    };

    const submitEmail = async (email, messageEmail) => {
        let res = {
            status: 0,
            message: "",
        };
        try {
            await send(
                Constants.expoConfig.extra.EMAILJS_SERVICE_ID,
                Constants.expoConfig.extra.EMAILJS_TEMPLATE_ID,
                {
                    email,
                    message: messageEmail,
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

    const handleResetPassword = async () => {
        if (!email || email.trim() === "") {
            setErrorMessage("El correo electrónico es obligatorio");
            return;
        }
        const emailRegex =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(email.trim())) {
            setErrorMessage("El correo electrónico no es válido");
            return;
        }
        setIsLoading(true);
        let vEmail = await isExistingEmail(email.trim());
        if (!vEmail) {
            setErrorMessage("El correo proporcionado no esta registrado");
            setIsLoading(false);
            return;
        } else {
            let randomPassword = generateRandomPassword();
            let resSubmitEmail = await submitEmail(email, randomPassword);
            if (resSubmitEmail.status === 200) {
                // ATUALIZAR PASSWORD
                let resUpdatePassword = await updateRandomPassword(
                    email,
                    randomPassword
                );
                if (resUpdatePassword === true) {
                    setStep(2);
                } else {
                    setErrorMessage(
                        "Ha ocurrido un error, intentelo mas tarde"
                    );
                }
            } else {
                setErrorMessage(
                    "No se ha podido enviar el correo, intentelo mas tarde"
                );
            }
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setEmail("");
            setStep(1);
            setErrorMessage("");
        }, 300);
    };

    if (!isVisible) return null;

    return (
        <View className="absolute bg-black/50 w-screen h-screen z-50 justify-center items-center">
            <Animated.View
                className="bg-white w-10/12 rounded-xl shadow-xl p-5"
                style={{ transform: [{ translateY: slideAnim }] }}
            >
                <View className="w-full items-end">
                    <TouchableOpacity
                        onPress={handleClose}
                        className="p-2 rounded-full active:bg-gray-200"
                    >
                        <Text className="font-medium text-xl text-gray-500">
                            ×
                        </Text>
                    </TouchableOpacity>
                </View>

                {step === 1 ? (
                    // Paso 1: Formulario para ingresar email
                    <View className="px-2 pb-4">
                        <View className="items-center mb-6">
                            <View className="w-16 h-16 bg-red-100 rounded-full items-center justify-center mb-4">
                                <Mail stroke="#FF4136" width={32} height={32} />
                            </View>
                            <Text className="text-2xl font-bold text-gray-800 mb-1">
                                ¿Olvidaste tu contraseña?
                            </Text>
                            <Text className="text-gray-600 text-center">
                                Ingresa tu correo electrónico y te enviaremos
                                instrucciones para restablecer tu contraseña.
                            </Text>
                        </View>

                        <View className="mb-4">
                            <Text className="text-sm font-medium text-gray-700 mb-1">
                                Correo electrónico
                            </Text>
                            <View className="relative">
                                <View className="absolute left-3 top-3">
                                    <Mail
                                        stroke="#9CA3AF"
                                        width={20}
                                        height={20}
                                    />
                                </View>
                                <TextInput
                                    className="border border-gray-300 rounded-lg pl-2 py-3 bg-white text-gray-800"
                                    placeholder="tu@email.com"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>

                            {errorMessage ? (
                                <View className="flex-row items-center mt-2">
                                    <AlertCircle
                                        stroke="#EF4444"
                                        width={16}
                                        height={16}
                                    />
                                    <Text className="text-red-500 text-sm ml-1">
                                        {errorMessage}
                                    </Text>
                                </View>
                            ) : null}
                        </View>

                        <TouchableOpacity
                            className={`flex-row items-center justify-center py-3 px-4 rounded-lg ${
                                isLoading ? "bg-gray-400" : "bg-red-500"
                            }`}
                            onPress={handleResetPassword}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="white" size="small" />
                            ) : (
                                <>
                                    <Text className="text-white font-bold mr-2">
                                        Enviar instrucciones
                                    </Text>
                                    <ArrowRight
                                        stroke="white"
                                        width={18}
                                        height={18}
                                    />
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                ) : (
                    // Paso 2: Mensaje de exito
                    <View className="px-2 pb-4">
                        <View className="items-center mb-6">
                            <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-4">
                                <Check
                                    stroke="#10B981"
                                    width={32}
                                    height={32}
                                />
                            </View>
                            <Text className="text-2xl font-bold text-gray-800 mb-1">
                                ¡Correo enviado!
                            </Text>
                            <Text className="text-gray-600 text-center">
                                Hemos enviado instrucciones para restablecer tu
                                contraseña a{" "}
                                <Text className="font-bold">{email}</Text>.
                                Revisa tu bandeja de entrada y sigue los pasos
                                indicados.
                            </Text>
                        </View>

                        <TouchableOpacity
                            className="bg-red-500 py-3 px-4 rounded-lg items-center"
                            onPress={handleClose}
                        >
                            <Text className="text-white font-bold">
                                Entendido
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="mt-4"
                            onPress={() => setStep(1)}
                        >
                            <Text className="text-red-500 text-center">
                                Volver a intentar con otro correo
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Animated.View>
        </View>
    );
};

export default ModalForgotPassword;
