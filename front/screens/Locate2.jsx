import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { getGlobalData } from "../backend/querys/inserts/New_email";
import { setExpoTokenNotification } from "../lib/querys";

// Configurar el comportamiento de las notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Location() {
  const [expoPushToken, setExpoPushToken] = useState(null);

  useEffect(() => {
    registerForPushNotifications();
  }, []);

  async function registerForPushNotifications() {
    if (!Device.isDevice) {
      Alert.alert("Error", "Las notificaciones solo funcionan en dispositivos físicos.");
      return;
    }

    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado", "Habilita las notificaciones en la configuración.");
      return;
    }

    // Obtener token de Expo
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    setExpoPushToken(token);

    // Guardar token en la base de datos
    const email = getGlobalData("email");
    await setExpoTokenNotification(email, token);
  }

  async function pushNotificacion() {
    if (!expoPushToken) {
      Alert.alert("Error", "No se pudo obtener el token de notificación.");
      return;
    }

    // Enviar notificación local
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "📍 Notificación de Ubicación",
        body: "¡Haz clic aquí para ver el mapa!",
        data: { screen: "Mapa" },
      },
      trigger: null, // Muestra la notificación inmediatamente
    });
  }

  return (
    <View className="flex-1 justify-center items-center bg-blue-100">
      <Text>Location Screen</Text>
      <TouchableOpacity className="bg-red-500 mt-4 p-4 rounded-lg" onPress={pushNotificacion}>
        <Text className="text-3xl text-white">Ver mapa</Text>
      </TouchableOpacity>
    </View>
  );
}

