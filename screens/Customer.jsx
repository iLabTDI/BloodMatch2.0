//Tere
import React, {useState, useContext, useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Dimensions, View, Text, Image, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

import * as ImagePicker from 'expo-image-picker';
import themeContext from "../helper/ThemeCon";
import { useTranslation } from "react-i18next";
{/** Creado por lola
export function ImagePick() {
  const [selectedImage, setSelectedImage] = useState('');
  const pickImage = () => {
    ImagePicker.showImagePicker(
      {
        title: 'Select Image',
        maxWidth: 800,
        maxHeight: 600,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image selection');
        } else if (response.error) {
          console.log('Error selecting image:', response.error);
        } else {
          setSelectedImage({ uri: response.uri });
        }
      }
    );
  };

  return (
    <View>
      {selectedImage && (
        <Image source={selectedImage} style={{ width: 200, height: 200, borderRadius: 10}} />
      )}
      <TouchableOpacity onPress={pickImage}>
        <MaterialCommunityIcons name="pencil-plus-outline" color={'#000000'} size={30} />
      </TouchableOpacity>
    </View>
  ); 
}
*/}

//Implementacion de modificacion de idiomas JJ
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Customers = ({ navigation }) => {

    const teme = useContext(themeContext);
    const {t} = useTranslation();
    {/*obtener informacion del usuario */}
    const nombre = 'Ximena Diaz Vargas ';
    const municipio = 'Tlaquepaque';
    {/*Guarda la info de la imagen de perfil */}
    const [image,setImage] = useState(require('../images/user.png'));
    {/*Funcion para editar la imagen*/}
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing:true
      });
      if (result.didCancel) {
        console.log('User cancelled image selection');
      } else if (result.error) {
        console.log('Error selecting image:', result.error);
      } else {
        setImage({ uri: (result.assets[0].uri) });
      }
    };

    return (
        <View style={[styles.container, {backgroundColor: teme.background}]}>
          {/*Imagen de perfil */}
            <View style={[styles.contImage , width >= 800 ? styles.contImageGnde : styles.contImage ]}>
            <StatusBar hidden={true} />
              {image && (<Image source={image} style={[styles.image, width >= 800 ? styles.imageGnde : styles.image]} />)}
              <StatusBar style="auto" />
              {/*<ImagePick/>*/} 
              <View style={styles.editimage} > 
                <TouchableOpacity onPress={pickImage} >
                    <MaterialCommunityIcons name="pencil-plus-outline" color={'#000000'} size={30} />
                </TouchableOpacity> 
              </View>
            </View>
           
             
            
            {/*Sector 1  */}
            <View style= {styles.column}>
              {/*Texto para visualizar username */} 
              <View >
                <Text adjustsFontSizeToFit={true}
                      numberOfLines={1}
                      style={[styles.nameUser, width >= 800 ? styles.nameUserGnde : styles.nameUser, {color: teme.color}]}>@Marcianito85</Text>
              </View>
              {/*Sector 2 cajitas donde se encontrara la informacion del usuario*/}
              <View style = {styles.row} >
                {/*sector 2.1 contenedor del tipo de s3xo*/}
                <View style = {[styles.sect21, {backgroundColor: teme.bla}]}>
                          <Text style={[styles.ContsText, {color: teme.color}]}> {t("gnd")}: F </Text>
                </View>
                {/*sector 2.2 contenedor del tipo de sangre*/}
                <View style = {[styles.sect21, {backgroundColor: teme.bla}]}>
                          <Text style={[styles.ContsText, {color: teme.color}]}>{t("tpy")}: O-</Text>
                </View>
              </View>
              {/*sector grandre contenedor del nombre*/}
              <View style={[styles.sctgrande, {backgroundColor: teme.bla}]}>

                  <Text  adjustsFontSizeToFit={true}
                    numberOfLines={2} style={[styles.ContsText, {color: teme.color}]}>{t("name")}: {nombre}</Text> 
              </View>
              {/*sector grandre contenedor del municipio*/}
              <View style={[styles.sctgrande, {backgroundColor: teme.bla}]}>
                <Text style={[styles.ContsText, {color: teme.color}]}>{t("cty")}: {municipio}</Text>
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
  height: height*1,
},

contImage:{
  paddingTop: '23%',
  height: height*.45,
},

contImageGnde:{
  paddingTop: '23%',
  height: height*.40,
},

column:{
  //flexDirection: 'row',
  //flexWrap: 'wrap',
  //padding: '10%',
  alignItems: 'center',
  //margin: '10%',
  //justifyContent: 'space-between',
  height: height*.60
},
image:{
  width: 199, 
  height: 199,
  borderRadius: Math.round(height+width)/2,
  //paddingTop: '15%',
  //top: '10%',
  /*left: 77, 
  top: 104, 
  position: 'absolute',*/
  //alignSelf: 'center'
},

imageGnde:{
  width: width*.40, 
  height: height*.30,
  borderRadius: 1000,
},

editimage:{
  alignSelf:'flex-end',
},

row:{
  flexDirection: 'row',
},

sect21:{
  marginTop: '4.5%',
  backgroundColor: 'white',
  width: 'auto',
  minWidth: width*.3,
  minHeight: height*.06,
  height: 'auto',
  borderRadius: 10,
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginHorizontal: '3%',
  alignItems: 'center',
  
},

sctgrande:{
  marginTop: '4.5%',
  backgroundColor: 'white',
  width: width*.66,
  height: height*.06,
  borderRadius: 10,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  
},

nameUser:{
  textAlign: 'center',
  paddingTop: '7%',
  fontFamily: 'Quicksand-Bold',
  fontSize: height*.05,
  color: '#FFFFFF',
},
nameUserGnde:{
  textAlign: 'center',
  paddingTop: '15%',
  fontFamily: 'Quicksand-Bold',
  fontSize: height*.05,
  color: '#FFFFFF',
},
/*sctgrande:{
  marginTop: '7%',
  backgroundColor: 'white',
  width: 270,
  height: 52,
  borderRadius: 10,
  justifyContent: 'space-between',
  flexWrap: 'wrap',
},
buttonAdd:{
    flexDirection: 'row'
},
*/
ContsText:{
  textAlign: 'left',
  marginLeft: '2%',
  fontFamily: 'Quicksand-Bold',
  fontSize: height*.019,
} ,

/* 
button: {
  alignItems: 'center',
  backgroundColor: '#DDDDDD',
  padding: 10,
},
image:{
  top: '5%',
  width: '53.2%',
  height: '26%'
},
  //marginTop: '3%',
         <TouchableOpacity onPress={() => navigation.push('Home')}>
            <Text style={styles.text}>Editar</Text>
          </TouchableOpacity>
          <Image source={PlaceImage} style={styles.image}/>
        </View>
      );
}
    
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ceecff',
      alignItems: 'center',
    },
   
    text: {
      marginTop:'12%',
      left: '36%',
      color:'#28398d', 
      fontWeight: 'bold', 
      
      fontSize: 20,
    }*/
});

export default Customers
