import { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    Animated,
    Alert,
} from "react-native";
import { styled } from "nativewind";
import { Eye, EyeOff, Lock, X, Shield } from "react-native-feather";
import { useTranslation } from "react-i18next";
import { FontAwesome5 } from '@expo/vector-icons';
import GenericModal from "../components/GenericModal";
import { getDates, updatePassword } from "../lib/querys";
import { getGlobalData } from "@/backend/querys/inserts/New_email";
import validations from "../helper/validations.js";
import bcrypt from "bcryptjs";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const AnimatedView = Animated.createAnimatedComponent(StyledView);

const ModalChangePassword = ({ visible, onClose }) => {
    const { t } = useTranslation();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [textModal, setTextModal] = useState("");

    const slideAnim = useRef(new Animated.Value(300)).current;

    useEffect(() => {
        if (visible) {
            slideAnim.setValue(300);
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 70,
                friction: 12,
                useNativeDriver: true,
            }).start();
        }
    }, [visible, slideAnim]);

    const handleClose = () => {
        Animated.timing(slideAnim, {
            toValue: 300,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            onClose();
            // Limpiar los campos al cerrar
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        });
    };

    const handleSavePassword = async() => {
        setIsLoading(true);
        
        const email = getGlobalData("email");

        try {
            const user = await getDates(email);
    
            if (user) {
                const passwordMatch = await bcrypt.compare(currentPassword, user.Password);
                if (passwordMatch) {
                    let isTheSamePassword = validations.passwordConfirm(currentPassword, newPassword);
                    if(isTheSamePassword === true){
                        alert(t("same_password_error"));
                    }else{
                        let validation = validations.password(newPassword);
                        if(validation === true){
                            let confirmValidation = validations.passwordConfirm(newPassword, confirmPassword);
                            if(confirmValidation === true){
                                let res = await updatePassword(email, newPassword);
                                if(res !== null){
                                    alert(t("update_password_success"));
                                }else{
                                    alert(t("an_error_has_occurred"));
                                }
                            }else{
                                alert(t("no_is_the_same_password"));
                            }
                        }else{
                            alert(t("invalid_password"));
                        }
                    }
                } else {
                    alert(t("invalid_current_password"));
                }
            } else {
                alert(t("invalid_user"));
            }
        } catch (error) {
            alert(`${t("error_to_consult")}, ${error}`);
        }

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setIsLoading(false);
    };

    const handleInfoPassword = () => {
        setTitleModal(t("characteristics_pass_title"));
        setTextModal(t("characteristics_pass"));
        setIsModalVisible(true);
    }

    if (!visible) return null;

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="none"
            onRequestClose={handleClose}
        >
            <GenericModal isVisible={isModalVisible} onClose={() => setIsModalVisible(!isModalVisible)}>
                <Text className="text-xl font-bold mb-4">{titleModal}</Text>
                <Text>{textModal}</Text>
            </GenericModal>
            <StyledView className="flex-1 bg-black/50 justify-end">
                <AnimatedView
                    style={{
                        transform: [{ translateY: slideAnim }],
                    }}
                    className="bg-white rounded-t-3xl"
                >
                    {/* Header */}
                    <StyledView className="flex-row justify-between items-center p-5 border-b border-gray-200">
                        <StyledView className="flex-row items-center">
                            <Shield stroke="#FF4136" width={24} height={24} />
                            <StyledText className="text-xl font-bold text-gray-800 ml-2">
                                {t("change_password")}
                            </StyledText>
                        </StyledView>
                        <StyledTouchableOpacity onPress={handleClose}>
                            <X stroke="#6B7280" width={24} height={24} />
                        </StyledTouchableOpacity>
                    </StyledView>

                    <StyledView className="p-5">
                        {/* Current Password */}
                        <StyledView className="mb-4">
                            <StyledText className="text-sm font-medium text-gray-700 mb-1">
                                {t("current_password")}
                            </StyledText>
                            <StyledView className="relative">
                                <StyledView className="absolute left-3 top-3">
                                    <Lock
                                        stroke="#9CA3AF"
                                        width={20}
                                        height={20}
                                    />
                                </StyledView>
                                <StyledTextInput
                                    className="border border-gray-300 rounded-lg pl-3 pr-12 py-3 bg-white text-gray-800"
                                    placeholder={t("type_current_password")}
                                    secureTextEntry={!showCurrentPassword}
                                    value={currentPassword}
                                    onChangeText={setCurrentPassword}
                                />
                                <StyledTouchableOpacity
                                    className="absolute right-3 top-3"
                                    onPress={() =>
                                        setShowCurrentPassword(
                                            !showCurrentPassword
                                        )
                                    }
                                >
                                    {showCurrentPassword ? (
                                        <EyeOff
                                            stroke="#9CA3AF"
                                            width={20}
                                            height={20}
                                        />
                                    ) : (
                                        <Eye
                                            stroke="#9CA3AF"
                                            width={20}
                                            height={20}
                                        />
                                    )}
                                </StyledTouchableOpacity>
                            </StyledView>
                        </StyledView>

                        {/* New Password */}
                        <StyledView className="mb-4">
                            <StyledText className="text-sm font-medium text-gray-700 mb-1">
                                {t("new_password")}
                            </StyledText>
                            <StyledView className="relative">
                                <StyledView className="absolute left-3 top-3">
                                    <Lock
                                        stroke="#9CA3AF"
                                        width={20}
                                        height={20}
                                    />
                                </StyledView>
                                <View className="flex flex-row justify-between border border-gray-300 rounded-lg pl-3 pr-10 bg-white text-gray-800">
                                    <StyledTextInput  
                                        className="py-3"
                                        placeholder={t("type_password")}
                                        secureTextEntry={!showNewPassword}
                                        value={newPassword}
                                        onChangeText={setNewPassword}
                                        />
                                    <TouchableOpacity onPress={handleInfoPassword} className="flex justify-center">
                                        <FontAwesome5 name="info-circle" size={20} color="gray"/>
                                    </TouchableOpacity>
                                </View>
                                <StyledTouchableOpacity
                                    className="absolute right-3 top-3"
                                    onPress={() =>
                                        setShowNewPassword(!showNewPassword)
                                    }
                                >
                                    {showNewPassword ? (
                                        <EyeOff
                                            stroke="#9CA3AF"
                                            width={20}
                                            height={20}
                                        />
                                    ) : (
                                        <Eye
                                            stroke="#9CA3AF"
                                            width={20}
                                            height={20}
                                        />
                                    )}
                                </StyledTouchableOpacity>
                            </StyledView>
                        </StyledView>

                        {/* Confirm Password */}
                        <StyledView className="mb-6">
                            <StyledText className="text-sm font-medium text-gray-700 mb-1">
                                {t("confirm_password")}
                            </StyledText>
                            <StyledView className="relative">
                                <StyledView className="absolute left-3 top-3">
                                    <Lock
                                        stroke="#9CA3AF"
                                        width={20}
                                        height={20}
                                    />
                                </StyledView>
                                <StyledTextInput
                                    className="border border-gray-300 rounded-lg pl-3 pr-12 py-3 bg-white text-gray-800"
                                    placeholder={t("type_new_password")}
                                    secureTextEntry={!showConfirmPassword}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                />
                            </StyledView>
                        </StyledView>

                        {/* Buttons */}
                        <StyledView className="flex-row space-x-3 mb-6">
                            <StyledTouchableOpacity
                                className="flex-1 py-3 rounded-full bg-gray-200"
                                onPress={handleClose}
                            >
                                <StyledText className="text-center font-medium text-gray-700">
                                    {t("cancel")}
                                </StyledText>
                            </StyledTouchableOpacity>

                            <StyledTouchableOpacity
                                className="flex-1 py-3 rounded-full bg-red-500 flex-row justify-center items-center"
                                onPress={handleSavePassword}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <ActivityIndicator
                                        color="white"
                                        size="small"
                                    />
                                ) : (
                                    <StyledText className="text-center font-medium text-white">
                                        {t("save")}
                                    </StyledText>
                                )}
                            </StyledTouchableOpacity>
                        </StyledView>
                    </StyledView>
                </AnimatedView>
            </StyledView>
        </Modal>
    );
};

export default ModalChangePassword;
