import React, { useState, useContext, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Dimensions, View, Text, Image, TouchableOpacity, Alert } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import themeContext from "../helper/ThemeCon";
import { useTranslation } from "react-i18next";
import {supabase,uploadFile }from '../lib/supabase'
import { handleSubmit } from "../lib/querys";
import { getGlobalData } from '../backend/querys/inserts/New_email';
import { getGlobalImage } from "../backend/querys/inserts/New_Image";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";



const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Customer = ({  }) => {
  const theme = useContext(themeContext);
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(require('../images/user.png'));
 


// function where i  open the gallery
const pickImage = async () => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true
    });
    
    if (!result.cancelled) {
      const usuario = getGlobalData('usuario');
      
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
        .from('usuarios') 
        .update({ "url": imageUrl }) 
        .eq('UserName', usuario); 

        

      if (error) {
        throw error;
      } else {
        setImage({uri:imageUrl})
        Alert.alert("¡Imagen guardada!");
        
      }
    }
  } catch (error) {
    Alert.alert('Hubo un error al procesar la imagen.');
    console.error(error);
  }
};



  useEffect(() => {
   
    const fetchData = async () => {
      
      const usuario = getGlobalData('email');
      console.log(" lo que imprime es",usuario);
      const { data, error } = await supabase
        .from('usuarios') // Nombre de la tabla de usuarios
        .select('*')
        .eq('Email',usuario);
  
      if (error) {
        console.error('Error fetching user:', error.message);
      } else {
        // Verificar si hay datos y manejar los casos de múltiples filas o ninguna fila
        if (data && data.length > 0) {
          
          setUser(data[0]);
         const usuarioEncontrado = data[0];
         const urlEncontrado = usuarioEncontrado.url;
         console.log("el url que se encontro es=",urlEncontrado);

         setImage({ uri: urlEncontrado}); //  in this part  i get the url from the the image
      
         
        } else {
          console.log(data)
          console.error('No user data fousnd');
        }
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.contImage, width >= 800 ? styles.contImageGnde : styles.contImage]}>
        <StatusBar hidden={true} />
        {image && (<Image source={image} style={[styles.image, width >= 800 ? styles.imageGnde : styles.image]} />)}
        <TouchableOpacity style={styles.editimage} onPress={pickImage}>
        <MaterialCommunityIcons name="pencil-plus-outline" color={'#000000'} size={30} />
        </TouchableOpacity>
        
      </View>
      <View style={styles.column}>
        <View>
          <Text adjustsFontSizeToFit={true} numberOfLines={1} style={[styles.nameUser, width >= 800 ? styles.nameUserGnde : styles.nameUser, { color: theme.color }]}>
            @{user ? user.UserName : ''}
          </Text>
        </View>
        <View style={styles.row}>
          <View style={[styles.sect21, { backgroundColor: theme.bla }]}>
            <Text style={[styles.ContsText, { color: theme.color }]}>{t("gnd")}: {user ? user.Sexo : ''} </Text>
          </View>
          <View style={[styles.sect21, { backgroundColor: theme.bla }]}>
            <Text style={[styles.ContsText, { color: theme.color }]}>{t("tpy")}: {user ? user.Blood_Type : ''}</Text>
          </View>
        </View>
        <View style={[styles.sctgrande, { backgroundColor: theme.bla }]}>
          <Text adjustsFontSizeToFit={true} numberOfLines={2} style={[styles.ContsText, { color: theme.color }]}>
            {t("name")}: {user ? user.FirstName : ''} {user ? user.LastName : ''}
          </Text>
        </View>
        <View style={[styles.sctgrande, { backgroundColor: theme.bla }]}>
          <Text style={[styles.ContsText, { color: theme.color }]}>
            {t("cty")}: {user ? user.City : ''}
          </Text>
        </View>
        
      </View>
    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ceecff',
    alignItems: 'center',
    flexDirection: 'column',
    height: height * 1,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  contImage: {
    paddingTop: '23%',
    height: height * .45,
  },
  contImageGnde: {
    paddingTop: '23%',
    height: height * .40,
  },
  column: {
    alignItems: 'center',
    height: height * .60
  },
  image: {
    width: 199,
    height: 199,
    borderRadius: Math.round(height + width) / 2,
  },
  imageGnde: {
    width: width * .40,
    height: height * .30,
    borderRadius: 1000,
  },
  editimage: {
    alignSelf: 'flex-end',
  },
  row: {
    flexDirection: 'row',
  },
  sect21: {
    marginTop: '4.5%',
    backgroundColor: 'white',
    width: 'auto',
    minWidth: width * .3,
    minHeight: height * .06,
    height: 'auto',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '3%',
    alignItems: 'center',
  },
  sctgrande: {
    marginTop: '4.5%',
    backgroundColor: 'white',
    width: width * .66,
    height: height * .06,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameUser: {
    textAlign: 'center',
    paddingTop: '7%',
    fontFamily: 'Quicksand-Bold',
    fontSize: height * .05,
    color: '#FFFFFF',
  },
  nameUserGnde: {
    textAlign: 'center',
    paddingTop: '15%',
    fontFamily: 'Quicksand-Bold',
    fontSize: height * .05,
    color: '#FFFFFF',
  },
  ContsText: {
    textAlign: 'left',
    marginLeft: '2%',
    fontFamily: 'Quicksand-Bold',
    fontSize: height * .019,
  },
  logo: {
    width: 66,
    height: 58,
  }
});

export default Customer;
