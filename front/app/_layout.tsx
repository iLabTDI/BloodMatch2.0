
import React, { useEffect, useState } from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import {Text, View} from 'react-native'
import AuthNavigator from '../navigation/AuthNavigator';
import {EventRegister} from 'react-native-event-listeners';
import themeContext from '../helper/ThemeCon';
import darkMode from '../helper/DarkMode';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';

export default function App () {
  const [theme, setTheme] = useState(false)

  const [fontsLoaded] = useFonts({
   // 'Inter-SemiBoldItalic': 'https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12', esta linea falla
    'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
  });

  const applyStoredLanguage = async () => {
    try {
      const storedLng = await AsyncStorage.getItem('appLanguage');
      if (storedLng) {
        i18next.changeLanguage(storedLng);
      }
    } catch (error) {
      console.error("Error loading language preference:", error);
    }
  };

  useEffect(()=>{
    let eventListener = EventRegister.addEventListener('Cambiar el tema', (data) =>{
      setTheme(data);
      console.log(data)
    });
    return () => {
      EventRegister.removeEventListener(eventListener)
    };
  });

  useEffect(() => {
    applyStoredLanguage();
  }, []);

if (!fontsLoaded) {
    return null;
  }
  return (
    // <GestureHandlerRootView style={{ flex: 1}}>
    <themeContext.Provider value = {theme === true ? darkMode.dark : darkMode.light}>

      {/*{isAuthenticated ? AuthNavigator : DrawerNavigation} */}
      <AuthNavigator/>
   
  
  
    </themeContext.Provider>
    // </GestureHandlerRootView>
  );
}
