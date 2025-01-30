import React from "react";
import { View, Text, Settings } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";

//Screens
import Home from "../screens/Home";
import Customer from "../screens/Customer";
import Messenger from "../screens/Messenger";
import Locate from "../screens/Locate";
import Setting from "../screens/Setting";
import Chatbot from "../screens/Chatbot";

import Location from "@/screens/Locate2";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#00a3e1",
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home_Tab"
        component={Home}
        options={({ route }) => ({
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
          headerShown: false,
          tabBarStyle: route.params?.hideTabBar
            ? { display: "none" }
            : undefined,
        })}
      />
      <Tab.Screen
        name="Chatbot"
        component={Chatbot}
        options={{
          tabBarLabel: "Chatbot",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="robot-love"
              color={color}
              size={size}
            />
          ),
          headerShown: false,
        }}
      />
      {/* mapa viejito no funciona cuando se buldea la aplicacion
            
            
            <Tab.Screen
                name = 'Maps'
                component = { Locate }
                options={{ 
                    tabBarLabel: 'Maps',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="map-marker-radius" color={color} size={size} />
                    ),
                }} 
            />*/}

      <Tab.Screen
        name="Location"
        component={Location}
        options={{
          tabBarLabel: "Maps",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="map-marker-radius"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messenger"
        component={Messenger}
        options={{
          tabBarLabel: "Menssenger",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="facebook-messenger"
              color={color}
              size={size}
            />
          ),
          tabBarBadge: 1,
          tabBarBadgeStyle: { backgroundColor: "blue" },
        }}
      />
      <Tab.Screen
        name={t("profile")}
        component={Customer}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={size}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={t("confi")}
        component={Setting}
        options={{
          tabBarLabel: "Configuración",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
