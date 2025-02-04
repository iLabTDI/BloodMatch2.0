import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';

const ModalFilters = ({onClose}) => {
    const [filterCategory, setFilterCategory] = useState(null);
    const [filter, setFilter] = useState("");

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
                    <Text className="font-bold text-2xl mb-4">Buscar por:</Text>

                    <Picker
                        selectedValue={"Selecciona una categoría"}
                        onValueChange={(itemValue) => setFilterCategory(itemValue)}
                    >
                        <Picker.Item label="Selecciona una categoría" value="" />
                        <Picker.Item label="Grupo sanguíneo" value="Grupo sanguíneo" />
                        <Picker.Item label="Sexo" value="Sexo" />
                        <Picker.Item label="Edad" value="Edad" />
                        <Picker.Item label="Mi municipio" value="Mi municipio" />
                        <Picker.Item label="Mi estado" value="Mi estado" />
                    </Picker>

                    {
                        filterCategory === "Grupo sanguíneo" ? (
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
                        filterCategory === "Sexo" ? (
                            <Picker
                                selectedValue={"Masculino"}
                                onValueChange={(itemValue) => setFilter(itemValue)}
                            >
                                <Picker.Item label="Masculino" value="Masculino" />
                                <Picker.Item label="Femenino" value="Femenino" />
                            </Picker>
                        ) : 
                        filterCategory === "Edad" ? (
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
                        filterCategory === "Mi municipio" ? (
                            <Text>Filtrar por municipio</Text>
                        ) : 
                        filterCategory === "Mi estado" ? (
                            <Text>Filtrar por estado</Text>
                        ) : null 
                    }

                    <View
                        className="flex flex-row justify-end gap-2 mt-4"
                    >
                        <TouchableOpacity
                            onPress={onClose}
                            className="mt-4 bg-slate-400 py-2 px-4 rounded-full self-end"
                        >
                            <Text className="text-white font-bold">Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onClose}
                            className="mt-4 bg-red-500 py-2 px-4 rounded-full self-end"
                        >
                            <Text className="text-white font-bold">Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default ModalFilters;
