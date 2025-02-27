import { useState, useEffect, useRef } from "react"
import { View, Text, TouchableOpacity, Animated, Alert, TextInput } from "react-native"
import { useTranslation } from "react-i18next"
import { getGlobalData } from "../backend/querys/inserts/New_email"
import { updateStatus } from "../lib/querys"

const ModalUpdateStatus = ({ isVisible, onClose, onStatusUpdated, setIsLoading }) => {
  const { t } = useTranslation();
  const email = getGlobalData("email");
  const [status, setStatus] = useState("");

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
    if (!status) {
      Alert.alert(t("insert_a_new_status"));
      return;
    }
    
    if (status.length > 250) {
      Alert.alert(t("250_characters_in_status"));
      return;
    }

    try {
      setIsLoading(true);
      await updateStatus(email, status);
      Alert.alert(t("update_status_success"));
      onStatusUpdated(status); 
      onClose();
      setStatus("");
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert(t("update_status_error"));
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
        <Text className="font-bold text-2xl mb-4">{t("update_status")}</Text>

        <View className="mb-4">
          <TextInput
            className="border border-gray-300 rounded-xl p-4 text-base"
            placeholder={t("type_new_status")}
            value={status}
            onChangeText={setStatus}
            multiline
            maxLength={250}
            numberOfLines={6}
            textAlignVertical="top"
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

export default ModalUpdateStatus;

