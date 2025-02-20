import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";

const Modal = ({ isVisible, onClose, children }) => {
    const { t } = useTranslation();

    if (!isVisible) return null;

    return (
        <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/50">
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View className="bg-white rounded-lg p-6 w-5/6 max-w-sm">
                    {children}
                    <TouchableOpacity
                        onPress={onClose}
                        className="mt-4 bg-red-500 py-2 px-4 rounded-full self-end"
                    >
                        <Text className="text-white font-bold">{t("close")}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default Modal;
