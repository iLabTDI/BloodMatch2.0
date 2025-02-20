import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from "react-i18next";

const ModalFilters = ({onClose}) => {
    const [filterCategory, setFilterCategory] = useState(null);
    const [filter, setFilter] = useState("");

    const { t } = useTranslation();

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
                    <Text className="font-bold text-2xl mb-4">{t("search")}</Text>

                    <Picker
                        selectedValue={t("select_a_category")}
                        onValueChange={(itemValue) => setFilterCategory(itemValue)}
                    >
                        <Picker.Item label={t("select_a_category")} value="" />
                        <Picker.Item label={t("blood_type")} value="blood_type" />
                        <Picker.Item label={t("gender")} value="gender" />
                        <Picker.Item label={t("age")} value="age" />
                        <Picker.Item label={t("my_municipality")} value="my_municipality" />
                        <Picker.Item label={t("my_state")} value="my_state" />
                    </Picker>

                    {
                        filterCategory === "blood_type" ? (
                            <Picker
                                selectedValue={"A+"}
                                onValueChange={(itemValue) => setFilter(itemValue)}
                            >
                                <Picker.Item label="A+" value="A+" />
                                <Picker.Item label="A-" value="A-" />
                                <Picker.Item label="B+" value="B+" />
                                <Picker.Item label="B-" value="B-" />
                                <Picker.Item label="AB+" value="AB+" />
                                <Picker.Item label="AB-" value="AB-" />
                                <Picker.Item label="O+" value="O+" />
                                <Picker.Item label="O-" value="O-" />
                            </Picker>
                        ) : 
                        filterCategory === "gender" ? (
                            <Picker
                                selectedValue={t("male")}
                                onValueChange={(itemValue) => setFilter(itemValue)}
                            >
                                <Picker.Item label={t("male")} value="male" />
                                <Picker.Item label={t("female")} value="female" />
                            </Picker>
                        ) : 
                        filterCategory === "age" ? (
                            <Picker
                                selectedValue={"18-25"}
                                onValueChange={(itemValue) => setFilter(itemValue)}
                            >
                                <Picker.Item label="18-25" value="18-25" />
                                <Picker.Item label="26-35" value="26-35" />
                                <Picker.Item label="36-45" value="36-45" />
                                <Picker.Item label="46-55" value="46-55" />
                                <Picker.Item label="56+" value="56+" />
                            </Picker>
                        ) : 
                        filterCategory === "my_municipality" ? (
                            <Text>{t("filter_by_municipality")}</Text>
                        ) : 
                        filterCategory === "my_state" ? (
                            <Text>{t("filter_by_state")}</Text>
                        ) : null 
                    }

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
                            onPress={onClose}
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
