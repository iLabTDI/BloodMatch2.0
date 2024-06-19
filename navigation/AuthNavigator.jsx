import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../screens/SignIn';
import Login from '../screens/Login';
import TabNavigator from './TabNavigator';
import Messenger from '../screens/Messenger';
import Customers from '../screens/Customer';
import Setting from '../screens/Setting';
import Tema from '../screens/Tema';
import Chat from '../screens/Chat';
import { useTranslation } from 'react-i18next';
import Termycon from '../screens/terminos';
import Privacidad from '../screens/Privacidad';
import NewReg from '../screens/New-reg';


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
            <Stack.Screen
                name = 'SignIn'
                component = { SignIn }
                //options={{ headerShown: false, title: 'Se pudo'}} 
            />
            <Stack.Screen
                name = 'Home'
                component = { TabNavigator }
                options={{ headerShown: false}} 
            />
            <Stack.Screen
                name = 'Messenger'
                component = { Messenger }
            />
            <Stack.Screen
                name = {t("profile")}
                component = { Customers }
                //options={{ headerShown: false}} 
            />
            <Stack.Screen
                name = 'Configuracion'
                component = { Setting }
                //options={{ headerShown: false}} 
            />
            <Stack.Screen
                name = {t("themesel")}
                component = { Tema }
                //options={{ headerShown: false}} 
            />
            <Stack.Screen
                name = 'Chat'
                component = { Chat }
                //options={{ headerShown: false}} 
            />
            <Stack.Screen
                name = {t("termycondi")}
                component = { Termycon }
                //options={{ headerShown: false}} 
            />
            <Stack.Screen
                name = 'Privacidad'
                component = { Privacidad }
                //options={{ headerShown: false}} 
            />
            <Stack.Screen
                name = 'new-reg'
                component = { NewReg }
                //options={{ headerShown: false}} 
            />
        </Stack.Navigator>
      )
}