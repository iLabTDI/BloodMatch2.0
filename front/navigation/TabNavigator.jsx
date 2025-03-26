
import React from 'react'
import { View, Text, Settings } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";

//Screens
import Home from '../screens/Home';
import Customer from '../screens/Customer';
import Messenger from '../screens/Messenger';
import Locate from '../screens/Locate';
import Setting from '../screens/Setting';
import Chatbot from '../screens/Chatbot';

import Location from '@/screens/Locate2';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    const {t} = useTranslation();
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor:'#EF4444',
                tabBarActiveBackgroundColor: '#FEE2E2',
                tabBarShowLabel: true,
                tabBarStyle: {
                    height: 60,
                },
                tabBarItemStyle: {
                    // flexDirection: 'row',
                    // alignItems: 'center',
                },
            }}>
            <Tab.Screen
                name = 'Home_Tab'
                component = { Home }
                options={{ 
                    tabBarLabel: t("home"),
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                    headerShown: false
                }} 
            />
             <Tab.Screen
                name = 'Chatbot'
                component = { Chatbot }
                options={{ 
                    tabBarLabel: t("chat_bot"),
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="robot-love" color={color} size={size} />
                    ),
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "#EF4444",
                        elevation: 0, 
                        shadowOpacity: 0,
                    },
                    headerTintColor: "#FFFFFF",
                    headerTitleAlign: "center",
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
            />*/ }
           
               <Tab.Screen
                name = {t("map_label")}
                component = { Locate }
                options={{ 
                    tabBarLabel: t("map"),
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="map-marker-radius" color={color} size={size} />
                    ),
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "#EF4444",
                        elevation: 0, 
                        shadowOpacity: 0,
                    },
                    headerTintColor: "#FFFFFF",
                    headerTitleAlign: "center",
                }} 
            />
            <Tab.Screen
                name = {t("messenger_label")}
                component = { Messenger }
                options={{ 
                    tabBarLabel: t("messenger"),
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="facebook-messenger" color={color} size={size} />
                    ),
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "#EF4444",
                        elevation: 0, 
                        shadowOpacity: 0,
                    },
                    headerTintColor: "#FFFFFF",
                    headerTitleAlign: "center",
                }} 
            />
            <Tab.Screen
                name = {t("profile_label")}
                component = { Customer }
                options={{ 
                    tabBarLabel: t("profile"),
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-outline" color={color} size={size} />
                    ),
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "#EF4444",
                        elevation: 0, // Quita la sombra en Android
                        shadowOpacity: 0, // Quita la sombra en iOS
                    },
                    headerTintColor: "#FFFFFF",
                    headerTitleAlign: "center",
                }} 
            />
            <Tab.Screen
                name = {t("settings_label")}
                component = { Setting }
                options={{  
                    tabBarLabel: t("settings"),
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cog" color={color} size={size} />
                    ),
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "#EF4444",
                        elevation: 0, 
                        shadowOpacity: 0,
                    },
                    headerTintColor: "#FFFFFF",
                    headerTitleAlign: "center",
                }} 
            />
             
          

        </Tab.Navigator>
    )
}
