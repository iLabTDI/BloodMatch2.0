//Tere
import React, {useContext, useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';
//import { Divider } from '@rneui/themed';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import { Directions, FlatList } from "react-native-gesture-handler";
import themeContext from "../helper/ThemeCon";
import { Searchbar } from 'react-native-paper';
import EllipsisText from "react-ellipsis-text";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;


const Messenger = ({ navigation }) => {

  const teme = useContext(themeContext)

  //Constante para json filtrado
  const [filterData, setfilterData] = useState([]);
  //Constante para json completo
  const [fullData, setfullData] = useState([]);
  //Constante para el texto del buscador 
  const [search, setsearch] = useState('');
  
  useEffect(() => {
    fetchPost();
    return () => {

    }
  }, [])
  //Obtener los mensajes de jsonplaceholder
  const fetchPost = () => {
    const apiURL = 'https://jsonplaceholder.typicode.com/posts'
    fetch(apiURL)
    .then((response) => response.json())
    .then((responseJson) => {
      setfilterData(responseJson);
      setfullData(responseJson);
    }).catch((error) => {
      console.error(error);
    })
  }
  //Constante para la imagen de los usuarios (provicional)
  const PlaceImage = require('../images/user.png'); //imagen perfil para ejemplo
  
  //Funcion para obtener el texto del buscador e ir cambiando el contenido del flatlist
  const searchFilter = (text) => {
    if(text) {
       const newData = fullData.filter((item) => {
          const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();  
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
    
        setfilterData(newData);
        setsearch(text);
    } else {
      setfilterData(fullData);
      setsearch(text);
    }
  }
  //Estructura del contenedor del item a mostrar
  const ItemView = ({item}) => {
    return (
      <TouchableOpacity style={styles.button} onPress={() => navigation.push('Chat')}>
        <View style={[styles.messagecontainer, {backgroundColor: teme.bla}]}>
            {/*Imagen del Contenedor para visualizar la imagen de perfil del contacto*/}
          <Image style={styles.messageimage} source={/*{uri: item.perfil}*/ require('../images/user.png')} ></Image>
          {/*sub contenedor 1 MessageConttext para organizar el texto*/}
          <View style = {styles.messageConttext}> 
          {/*nombre del usuario*/}
          <Text style={[styles.messageTitle, {color: teme.color}]}>{item.title}</Text>
          {/*Contenedor del texto del mensaje*/}
              <View styles = {styles.message}>
                {/*texto del mensaje*/}
                <Text style={[styles.messagetext, {color: teme.color}]} numberOfLines={1} ellipsizeMode="tail">{item.body} </Text>
              </View>
            {/*Contenedor para la hora del mensaje recibido*/}
              <View style= {styles.conttime}>
              {/*texto de la hora del mensaje recibido*/}
              <Text style={[styles.messagehour, {color: teme.color}]}>{'12:00 pm'}</Text>
              </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  //Linea para separar los items
  const ItemSeparatorView = () => {
    return (
      <View style={{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}}/>
    )
  }

    return (
      // Contenedor principal
        <View style={[styles.container, {backgroundColor: teme.background}]}>
          {/*Contenedor del Buscador de contactos o palabras*/}
          <Searchbar maxLength={250} inputStyle={styles.textBuscador} style={[styles.buscador, {backgroundColor: teme.bla}, {color: teme.color}]} placeholder="Buscar" value={search} onChangeText={(text) => searchFilter(text)}/>
          {/*Contenedor de la lista de mensajes */}
          <View style = {styles.lista}>
            {/*Flatlist se encarga de enlistar los mensajes  */}
            <FlatList
            //Importar datos 
              data={filterData}
              //Contenedor de cada mensaje 
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={ItemView}
              styles = {{flex: 1}}
            />
          </View>
          <StatusBar style="auto"/>
        </View>
      );
}
    
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ceecff',
      alignItems: 'center',
      justifyContent: 'center',
      height: height*1,
      width: width*1,
    },
    textBuscador: {
      fontSize: height*0.02,
      fontFamily: 'Quicksand-Regular',
    },

    lista:{
      paddingTop: '5%', 
      paddingBottom: '5%', 
      flex: 1,
      height: height*.8,
      width: width*1
    },    

    messagecontainer:{
      flexDirection: 'row',
      alignItems: 'center',
      padding: '1.5%',
      backgroundColor: '#FFF',
      borderRadius: 10,
      margin: '1.5%',
      minWidth: '75%', 
      borderColor: '#000',
      borderWidth: 1,
    },

    messageimage:{
      width: 50,
      height: 50,
      borderRadius: 25, 
      marginRight: 10,
    },
    messageConttext:{
      marginRight: 50,
    },
    messageTitle:{
      fontSize:height*.02,
      //fontWeight: 'bold',
      fontFamily: 'Quicksand-Bold',
    },

    messagetext:{
      fontFamily: 'Quicksand-Regular',
      fontSize: height*0.02,
    },

    buscador:{
      padding: 1,
      marginTop: height*.01,
      width: '75%',
    },
    message:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    conttime:{
      alignSelf: 'flex-end',
      marginRight: 5,

    },
    messagehour:{
      fontSize: height*.015,
      //textAlign: 'right',
    },

});

export default Messenger