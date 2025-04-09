import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Modal = ({ isVisible, onClose, secondUser, onAccept }) => {
    const { t } = useTranslation();

    if (!isVisible) return null;

    return (
        <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 z-10">
                <View className="bg-white rounded-lg p-3 w-11/12 max-h-full m-auto">
                    <Text className="text-base absolute p-2">{t("delete_chat")} {secondUser}?</Text>
                    <View className="flex flex-row justify-end mt-1">
                        <TouchableOpacity
                            onPress={onClose}
                            className="bg-red-500 flex items-center w-12 py-2 rounded-full self-end mr-2"
                        >
                            <FontAwesome name="close" size={16} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onAccept}
                            className="bg-red-500 flex items-center w-12 py-2 rounded-full self-end"
                        >
                            <FontAwesome name="check" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
        </View>
    );
};

export default Modal;
