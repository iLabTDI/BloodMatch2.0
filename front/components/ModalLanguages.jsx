import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from "react-i18next";

const ModalFilters = ({onClose, onAccept}) => {
    const { t } = useTranslation();
    const [language, setLanguage] = useState(null);

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
                    <Text className="font-bold text-2xl mb-4">{t("select_language")}</Text>

                    <Picker
                        selectedValue={t("select_option")}
                        onValueChange={(itemValue) => setLanguage(itemValue)}
                    >
                        <Picker.Item label={t("select_language")} value="" />
                        <Picker.Item label="Español (MX)" value="len_esp" />
                        <Picker.Item label="English (US)" value="len_en" />
                    </Picker>

                    <View
                        className="flex flex-row justify-end gap-2 mt-4"
                    >
                        <TouchableOpacity
                            onPress={onClose}
                            className="mt-4 bg-slate-400 py-2 px-4 rounded-full self-end"
                        >
                            <Text className="text-white font-bold">{t("cancel")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => onAccept(language)}
                            className="mt-4 bg-red-500 py-2 px-4 rounded-full self-end"
                        >
                            <Text className="text-white font-bold">{t("accept")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default ModalFilters;
