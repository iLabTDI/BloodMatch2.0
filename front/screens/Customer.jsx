import React, { useState, useContext, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { Camera, MapPin, Mail, User, Droplet } from "react-native-feather"

import * as ImagePicker from 'expo-image-picker';
import themeContext from "../helper/ThemeCon";
import { useTranslation } from "react-i18next";
import {supabase}from '../lib/supabase'
import { handleSubmit } from "../lib/querys";
import { getGlobalData } from '../backend/querys/inserts/New_email';

import RedLoader from "@/components/RedLoader";

const Customer = ({  }) => {
  const theme = useContext(themeContext);
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [image, setImage] = useState();

  const [isLoading, setIsLoading] = useState(false);

// function where i  open the gallery
  const pickImage = async () => {
    // setImage();
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true
      });
      
      if (!result.cancelled) {
        const email = getGlobalData('email');
        
        // Subir la imagen y obtener el nombre del archivo
        const fileName = await handleSubmit(result.assets[0].uri);
        console.log("Nombre del archivo subido:", fileName);

        // Obtener la URL pública de la imagen subida
        const { data: data2, error: error2 } = await supabase.storage
          .from('prueba')
          .getPublicUrl(fileName);

        if (error2) {
          throw error2;
        }

        // data2 contendrá la URL de la imagen
        const imageUrl = data2.publicUrl;
        console.log('Imagen URL:', imageUrl);

        // Actualizar la URL de la imagen en la base de datos de usuarios
        const { data, error } = await supabase
          .from('users') 
          .update({ "Url": imageUrl }) 
          .eq('Email', email); 

        if (error) {
          throw error;
        } else {
          setImage({uri:imageUrl})
          Alert.alert(t("image_saved"));
        }
      }
    } catch (error) {
      Alert.alert(t("image_error"));
      console.error(error);
    }
  };

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      const email = getGlobalData('email');
      console.log(" lo que imprime es",email);
      const { data, error } = await supabase
        .from('users') // Nombre de la tabla de usuarios
        .select('*')
        .eq('Email',email);
  
      if (error) {
        console.error('Error fetching user:', error.message);
      } else {
        // Verificar si hay datos y manejar los casos de múltiples filas o ninguna fila
        if (data && data.length > 0) {
          
          setUser(data[0]);
          const usuarioEncontrado = data[0];
          const urlEncontrado = usuarioEncontrado.Url;
          console.log("el url que se encontro es=",urlEncontrado);
          setImage({ uri: urlEncontrado}); //  in this part  i get the url from the the image
        } else {
          console.log(data)
          console.error('No user data fousnd');
        }
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);
  
  const ProfileItem = ({ icon: Icon, label, value }) => (
    <View className="flex-row items-center mb-4">
      <View className="bg-red-100 p-2 rounded-full mr-4">
        <Icon stroke="#FF4136" width={24} height={24} />
      </View>
      <View>
        <Text className="text-gray-600 text-sm">{label}</Text>
        <Text className="text-gray-800 font-semibold">{value}</Text>
      </View>
    </View>
  )

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar backgroundColor={"#fff"} style="dark"/>

        <View className="items-center pt-8 pb-6 bg-red-500">
          {isLoading 
          ? <RedLoader/>
          : (<View className="relative border-4 border-white rounded-full">
            <Image source={image} className="w-32 h-32 rounded-full border-4 border-white" />
            <TouchableOpacity
              onPress={pickImage}
              className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md"
              >
              <Camera stroke="#FF4136" width={20} height={20} />
            </TouchableOpacity>
          </View>)
          }
          <Text className="mt-8 text-2xl font-bold text-white">{isLoading ? "..." : (`${user?.FirstName} ${user?.LastName}`)}</Text> 
        </View>

        <View className="px-4 py-6">
          <ProfileItem 
            icon={Mail} 
            label={t("email")}
            value={isLoading ? "..." : user?.Email}
          />
          <ProfileItem 
            icon={User} 
            label={t("gender")}
            value={isLoading ? "..." : ((user?.Gender === "male") ? t("male") : t("female"))} 
          />
          <ProfileItem 
            icon={Droplet} 
            label={t("blood_type")}
            value={isLoading ? "..." : user?.Blood_Type} 
          />
          <ProfileItem 
            icon={MapPin} 
            label={t("location")}
            value={isLoading ? "..." : (`${user?.City}, ${user?.State}`)} 
          />
        </View>
        {/* <TouchableOpacity className="mx-4 bg-red-500 py-3 px-6 rounded-full items-center">
          <Text className="text-white font-bold text-lg">Editar Perfil</Text>
        </TouchableOpacity> */}
    </SafeAreaView>
  );
}

export default Customer;
