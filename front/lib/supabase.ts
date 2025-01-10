
import Constants from 'expo-constants';
import 'react-native-url-polyfill/auto'
import * as SecureStore from 'expo-secure-store'
import { createClient } from '@supabase/supabase-js'
const url="https://fvrbxlqmqpxrjrsqtlnw.supabase.co/storage/v1/object/public/prueba/cr7.jpg"
import { updateImages } from './querys';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key)
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value)
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key)
  },
}

const supabaseUrl = Constants.expoConfig.extra.supabaseUrl ;


const supabaseAnonKey =Constants.expoConfig.extra.supabaseAnonKey;
console.log(supabaseUrl,supabaseAnonKey)

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: ExpoSecureStoreAdapter as any,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  })
 

 