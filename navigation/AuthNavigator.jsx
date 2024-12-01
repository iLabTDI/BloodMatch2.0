

import React from 'react'
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import { useTranslation } from 'react-i18next';
;


export default function AuthNavigator() {
    const {t} = useTranslation();
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen
                name = 'Login'
                component = { Login }
                options={{ headerShown: false}} 
            />

        </Stack.Navigator>
      )
}