//Tere
import React, {useContext} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Dimensions, TextInput } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import {mapStyle} from '../assets/API/mapStyle';


import { ButtonGeneric } from '../components/Buttons';
import themeContext from "../helper/ThemeCon";

//constantes para obtener las dimenciones de la pantalla
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Locate = ({ navigation }) => {
  const teme = useContext(themeContext) 
  return (
    //Cambios Alex Robles
        //contenedor principal
        <View style={[styles.container, {backgroundColor: teme.background}]}>
            {/*Componente de para el mapa*/}
            <MapView
              customMapStyle={mapStyle}
              provider={PROVIDER_GOOGLE}
              style={styles.container}
              initialRegion={{
                latitude: 20.6596988,
                longitude: -103.3496092,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03,
              }}
              mapType="standard"
            > 
            </MapView>
            <View style={styles.input}>
              <TextInput
              placeholder="Municipio"
              placeholderTextColor='#000'
              autoCapitalize="none"
              style={{flex:1,padding:0}}
              />
            </View> 
        </View>
      );
}
    
const styles = StyleSheet.create({
    container: {
      flex:1,
    },
    //Tamaño del mapa
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    //Buscador
    input: {
      backgroundColor: '#fff',
      position: 'absolute',
      marginTop: height*0.03,
      flexDirection: 'row',
      width: '90%',
      alignSelf: 'center',
      borderRadius: 5,
      padding: 10,
      shadowColor: '#ccc',
      shadowOffset: {width: 0, height:3},
      shadowOpacity: 0.5, 
      shadowRadius: 5,
      elevation: 10,

    },
});

export default Locate