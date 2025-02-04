
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
                    tabBarLabel: 'Inicio',
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
                    tabBarLabel: 'Chatbot',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="robot-love" color={color} size={size} />
                    ),
                    headerShown: false
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
                name = 'Location'
                component = { Location }
                options={{ 
                    tabBarLabel: 'Mapa',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="map-marker-radius" color={color} size={size} />
                    ),
                }} 
            />
            <Tab.Screen
                name = 'Messenger'
                component = { Messenger }
                options={{ 
                    tabBarLabel: 'Mensajes',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="facebook-messenger" color={color} size={size} />
                    ),
                    // tabBarBadge: false,
                    // tabBarBadgeStyle: { backgroundColor: 'blue' }
                }} 
            />
            <Tab.Screen
                name = {t("profile")}
                component = { Customer }
                options={{ 
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-outline" color={color} size={size} />
                    ),
                    headerShown: false
                }} 
            />
            <Tab.Screen
                name = {t("confi")}
                component = { Setting }
                options={{  
                    tabBarLabel: 'Ajustes',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cog" color={color} size={size} />
                    ),
                }} 
            />
             
          

        </Tab.Navigator>
    )
}
