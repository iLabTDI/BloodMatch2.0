//archivo creado para el funcionamiento de la aplicacion, en este simplemente implemente el dark mode

import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import AuthNavigator from './navigation/AuthNavigator';
import { useFonts } from 'expo-font';
import {EventRegister} from 'react-native-event-listeners';
import themeContext from './helper/ThemeCon';
import darkMode from './helper/DarkMode';
import { defaultTheme } from '@rneui/base';
import { useTransition } from 'react-i18next';
import i18next from 'i18next';
import { supabase } from './lib/supabase'
export default function App () {
  // isAuthenticated = is...
  const [fontsLoaded] = useFonts({
    'Inter-SemiBoldItalic': 'https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12',
    'Quicksand-Bold': require('./assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-Regular': require('./assets/fonts/Quicksand-Regular.ttf'),
  });
  
  const [theme, setTheme] = useState(false)

  useEffect(()=>{
    let eventListener = EventRegister.addEventListener('Cambiar el tema', (data) =>{
      setTheme(data);
      console.log(data)
    });
    return () => {
      EventRegister.removeEventListener(eventListener)
    };
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <themeContext.Provider value = {theme === true ? darkMode.dark : darkMode.light}>
      <NavigationContainer >
      {/*{isAuthenticated ? AuthNavigator : DrawerNavigation} */}
        <AuthNavigator/>
      </NavigationContainer>
    </themeContext.Provider>
  );
}
