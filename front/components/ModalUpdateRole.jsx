import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, Alert, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { getGlobalData } from "../backend/querys/inserts/New_email";
import { updateRole } from "../lib/querys";

const ModalUpdateRole = ({ isVisible, onClose, onRoleUpdated, setIsLoading }) => {
  const { t } = useTranslation();
  const email = getGlobalData("email");
  const [selectedRole, setSelectedRole] = useState(null);

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
    if (!selectedRole) {
      Alert.alert(t("select_a_role"));
      return;
    }

    try {
      setIsLoading(true);
      await updateRole(email, selectedRole);
      Alert.alert(t("update_role_success"));
      onRoleUpdated(selectedRole);
      onClose();
      setSelectedRole(null);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert(t("update_role_error"));
    }
  };

  if (!isVisible) return null;

  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 justify-end">
      <Animated.View
        style={{ transform: [{ translateY: slideAnim }] }}
        className="bg-white rounded-t-3xl p-6 w-full pb-10"
      >
        <Text className="font-bold text-2xl mb-4">{t("update_role")}</Text>

        <View className="mb-4 flex-row justify-around">
          <TouchableOpacity
            className={`px-4 py-2 rounded-xl border ${selectedRole === "donor" ? "bg-red-500" : "bg-white"}`}
            onPress={() => setSelectedRole("donor")}
          >
            <Text className={`font-bold ${selectedRole === "donor" ? "text-white" : "text-black"}`}>
              {t("donor")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`px-4 py-2 rounded-xl border ${selectedRole === "recipient" ? "bg-red-500" : "bg-white"}`}
            onPress={() => setSelectedRole("recipient")}
          >
            <Text className={`font-bold ${selectedRole === "recipient" ? "text-white" : "text-black"}`}>
              {t("recipient")}
            </Text>
          </TouchableOpacity>
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

export default ModalUpdateRole;
