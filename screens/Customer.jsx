import React, { useState, useContext, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Dimensions, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import * as ImagePicker from 'expo-image-picker';
import themeContext from "../helper/ThemeCon";
import { useTranslation } from "react-i18next";
import {supabase,uploadFile }from '../lib/supabase'
import { getGlobalData } from '../backend/querys/inserts/New_email';
import { getGlobalImage } from "../backend/querys/inserts/New_Image";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Customer = ({ elpepe }) => {
  const theme = useContext(themeContext);
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  //const [image, setImage] = useState("file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fsupabook-803f5a86-40b1-4f19-a6ce-bc3c3cc757f7/ImagePicker/2dbcce43-f4ba-4a48-8391-4e0144b49d13.jpeg");
  const [image, setImage] = useState(require('../images/user.png'));
  const [imageUri, setImageUri] = useState("file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fsupabook-803f5a86-40b1-4f19-a6ce-bc3c3cc757f7/ImagePicker/2dbcce43-f4ba-4a48-8391-4e0144b49d13.jpeg");
  const [email,setemail] = useState("")
  const imageExtern=getGlobalImage("url");

  console.log("image tiene",image)


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true
    });
    const usuario = getGlobalData('usuario');
      console.log(" lo que imprime es",usuario);

    console.log(" lo que imprime es",result.uri);
    const { data, error } = await supabase
        .from('usuarios') 
        .update({ "url": result.uri }) 
        .eq('UserName',usuario); 
     
       
      
        setImage({ uri: result.uri});
         
    
    if (error) {
        Alert.alert('Hubo un error al actualizar la imagen del perfil.');
        console.error(error);
    } else {
        // Actualizar el estado local con la nueva URL para reflejar el cambio en la UI
        //setImage({ uri: newImageUrl });
        Alert.alert("imagen guardada");
    }

    if (!result.cancelled) {
      console.log("lo que se va a enviar es=",result.uri);
      Alert.alert("imagen guardada");
    
  }

  
}
  async function getImage() {
    try {
      // Realizar una consulta para obtener la imagen específica por su nombre de archivo
      const { data, error } = await supabase.storage.from('prueba').getPublicUrl("cr7.jpg");
  
      if (error) {
        throw error;
      }
      
      // data contendrá la URL de la imagen
      const imageUrl = data.publicUrl;
      
      const test = "https://fvrbxlqmqpxrjrsqtlnw.supabase.co/storage/v1/object/public/prueba/cr7.jpg";
  
      console.log('Imagen url:', imageUrl);

      
  
      // Actualizar el estado de la imagen con la URL obtenida
 
      setImage( {uri:imageUrl});
      
         
  
    } catch (error) {
      console.error('Error al obtener la imagen:', error);
      return null;
    }
  }
  const getImage2 = (imageUrl) => {
    // Aquí puedes realizar cualquier operación que desees con la URL recibida
    console.log('URL de la imagen:', imageUrl);
    // Por ejemplo, podrías devolver la URL directamente
    return imageUrl;
  };
  
  

  useEffect(() => {
   
    const fetchData = async () => {
      /*const newEmail = "raufalfonso@gmail.com";
      
      console.log("el valor que se le esta enviando es",elpepe);*/
      const usuario = getGlobalData('usuario');
      console.log(" lo que imprime es",usuario);
      const { data, error } = await supabase
        .from('usuarios') // Nombre de la tabla de usuarios
        .select('*')
        .eq('UserName',usuario);
  
      if (error) {
        console.error('Error fetching user:', error.message);
      } else {
        // Verificar si hay datos y manejar los casos de múltiples filas o ninguna fila
        if (data && data.length > 0) {
          
          setUser(data[0]);
          // Asignar el primer usuario si hay datos
         //console.log(email)
         const usuarioEncontrado = data[0];
         const urlEncontrado = usuarioEncontrado.url;
         console.log("el url que se encontro es=",urlEncontrado);
         //setGlobalImage("images",urlEncontrado)
         //setImage({ uri: urlEncontrado}); //  in this part  i get the url from the the image
         getImage();
         
         //setGlobalImage("url",urlEncontrado);
         //console.log(imageExtern)
       
         
        //setImage({ uri: urlEncontrado.uri });
         
        } else {
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
