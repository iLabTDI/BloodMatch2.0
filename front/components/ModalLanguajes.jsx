import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';

const ModalFilters = ({onClose, onAccept}) => {
    const [languaje, setLanguaje] = useState(null);

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
                    <Text className="font-bold text-2xl mb-4">Seleccione un idioma:</Text>

                    <Picker
                        selectedValue={"Seleccione una opción"}
                        onValueChange={(itemValue) => setLanguaje(itemValue)}
                    >
                        <Picker.Item label="Seleccione un idioma" value="" />
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
                            <Text className="text-white font-bold">Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => onAccept(languaje)}
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
