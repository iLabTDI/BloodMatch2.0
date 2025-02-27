import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, Alert, TextInput } from "react-native";
import { useTranslation } from "react-i18next";
import { getGlobalData } from "../backend/querys/inserts/New_email";
import { updatePhone } from "../lib/querys";

const ModalUpdatePhone = ({ isVisible, onClose, onPhoneUpdated, setIsLoading }) => {
  const { t } = useTranslation();
  const email = getGlobalData("email");
  const [phone, setPhone] = useState("");

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

  const onAccept = async () => {
    if (!phone) {
      Alert.alert(t("insert_a_new_phone"));
      return;
    }
    
    if (!/^\+?[0-9\s\-\(\)]{7,15}$/.test(phone)) {
      Alert.alert(t("invalid_phone_format"));
      return;
    }

    const digitCount = phone.replace(/\D/g, "").length;
    if (digitCount < 7 || digitCount > 15) {
      Alert.alert(t("invalid_phone_format"));
      return;
    }

    try {
      setIsLoading(true);
      await updatePhone(email, phone);
      Alert.alert(t("update_phone_success"));
      onPhoneUpdated(phone); 
      onClose();
      setPhone("");
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert(t("update_phone_error"));
    }
  };

  if (!isVisible) return null;

  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 justify-end">
      <Animated.View
        style={{
          transform: [{ translateY: slideAnim }],
        }}
        className="bg-white rounded-t-3xl p-6 w-full pb-10"
      >
        <Text className="font-bold text-2xl mb-4">{t("update_phone")}</Text>

        <View className="mb-4">
          <TextInput
            className="border border-gray-300 rounded-xl p-4 text-base"
            placeholder={t("type_new_phone")}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={15}
            placeholderTextColor="#9CA3AF"
          />
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

export default ModalUpdatePhone;
