import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTranslation } from "react-i18next";
import { getGlobalData } from "../backend/querys/inserts/New_email";
import { updateLocation } from "../lib/querys";
import estadosMunicipios from "../assets/estados_municipios.json"; 

const ModalUpdateLocation = ({ isVisible, onClose, onLocationUpdated, setIsLoading }) => {
  const { t } = useTranslation();
  const email = getGlobalData("email");
  const [selectedState, setSelectedState] = useState("");
  const [selectedMunicipality, setSelectedMunicipality] = useState("");
  const [municipalities, setMunicipalities] = useState([]);
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (isVisible) {
      slideAnim.setValue(300);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  useEffect(() => {
    if (selectedState) {
      setMunicipalities(estadosMunicipios[selectedState] || []);
    } else {
      setMunicipalities([]);
    }
  }, [selectedState]);

  const onAccept = async () => {
    if (!selectedState || !selectedMunicipality) {
      Alert.alert(t("select_location"));
      return;
    }
    try {
      setIsLoading(true);
      await updateLocation(email, selectedState, selectedMunicipality);
      Alert.alert(t("update_location_success"));
      onLocationUpdated(selectedState, selectedMunicipality);
      onClose();
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert(t("update_location_error"));
    }
  };

  if (!isVisible) return null;

  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 justify-end">
      <Animated.View style={{ transform: [{ translateY: slideAnim }] }} className="bg-white rounded-t-3xl p-6 w-full pb-10">
        <Text className="font-bold text-2xl mb-4">{t("update_location")}</Text>
        <View className="flex-row justify-between">
          <View className="bg-gray-100 rounded-full mb-4 w-[48%]">
            <Picker selectedValue={selectedState} onValueChange={setSelectedState} style={{ color: "gray", height: 52 }}>
              <Picker.Item label={t("state")} value="" />
              {Object.keys(estadosMunicipios).map((estado) => (
                <Picker.Item key={estado} label={estado} value={estado} />
              ))}
            </Picker>
          </View>
          <View className="bg-gray-100 rounded-full mb-4 w-[48%]">
            <Picker selectedValue={selectedMunicipality} onValueChange={setSelectedMunicipality}>
              <Picker.Item label={t("municipality")} value="" />
              {municipalities.map((municipio) => (
                <Picker.Item key={municipio} label={municipio} value={municipio} />
              ))}
            </Picker>
          </View>
        </View>
        <View className="flex flex-row justify-end gap-2 mt-4">
          <TouchableOpacity onPress={onClose} className="mt-4 bg-slate-400 py-2 px-4 rounded-full">
            <Text className="text-white font-bold">{t("cancel")}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onAccept} className="mt-4 bg-red-500 py-2 px-4 rounded-full">
            <Text className="text-white font-bold">{t("accept")}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default ModalUpdateLocation;