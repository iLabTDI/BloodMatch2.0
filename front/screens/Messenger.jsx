import React, { useContext, useEffect, useState, useCallback } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { Directions, FlatList } from "react-native-gesture-handler";
import themeContext from "../helper/ThemeCon";
import { Searchbar } from 'react-native-paper';
import { socket } from "../util/connectionChat";
import Chatcomponent from "./chatComponent";
import { getGlobalData } from "../backend/querys/inserts/New_email";
import { useFocusEffect } from '@react-navigation/native';
import { handleSubmit } from "@/lib/querys";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;


const Messenger = ({ navigation }) => {

  const teme = useContext(themeContext)
  const [filterData, setfilterData] = useState([]);
  const [search, setsearch] = useState('');
  const [allChatRooms, setAllChatRooms] = useState([]);


  const handleFindGroup = (id) => {
    console.log("el id es", id)

    socket.emit("encontrar", id);
  };

  const verification =  () => {

    try {
      const dates = getGlobalData("dates")
      socket.emit("getAllGroups");
      socket.on("groupList", (groups) => {
        console.log("los grupos son",groups)

       if(groups.length>0){

        let longitud = groups.length;
        console.log("id",dates.id_user)

        for (let i = 0; i < longitud; i++) {
          if ( dates.id_user=== groups[i].currentGroupName ||
            dates.id_user === groups[i].currentSecondGroup) {
            console.log(" ID =", groups[i].id);
            let id = groups[i].id;
            handleFindGroup(id);

          } else {
            console.log("El usuario no está en este grupo");
          }
        }
        }else{

         console.log("no hay grupos")
        }

      });

    } catch (e) {
      console.log("Error durante la verificación:", e);
    }
  };

  const filt = []
  useFocusEffect(
    useCallback(() => {
      socket.on("connect", () => {
        console.log("Socket connected successfully!");
    });

      verification();
      
      const foundGroup= (messages) => {
        setAllChatRooms(prevMessages => {
          const combinedMessages = [...prevMessages, ...messages];
          const uniqueMessages = [...new Map(combinedMessages.map(msg => [msg.id, msg])).values()];
          return uniqueMessages;
        });
      };
      socket.on("found", foundGroup  );
      return () => {
        socket.off("found", foundGroup );
        socket.off("groupList");
      };
       
      
    }, [])
  );

  useEffect(() => {
    if (allChatRooms.length > 0) {
      const result = filteredChatRooms();
      setfilterData(result);
    } else {
      console.log("No hay datos en allChatRooms todavía.");
    }
  }, [allChatRooms]);



  const dates = getGlobalData("dates")

  function filteredChatRooms() {
    const result = allChatRooms.map(group => {

      if (dates.id_user === group.currentGroupName) {
        filt.push({ id: group.id, currentSecondGroup: group.currentSecondGroup,currentIdSecondName:group.currentIdSecondName, messages: group.messages });

        return {
          id: group.id,
          currentSecondGroup: group.currentIdSecondName,
          messages: group.messages
        };
      }
      else {
        filt.push({ id: group.id, currentGroupName: group.currentGroupName,currentIdGroupName:group.currentIdGroupName});
        //console.log(filt)
        return {
          id: group.id,
          currentSecondGroup: group.currentIdGroupName,
          messages: group.messages
        };


      }

    }
    )

    return result


  }

  const searchFilter = (text) => {
    if (text) {
      const newData = filterData.filter((item) => {
        console.log("la nrw data es",filterData)
        const itemData = item.currentSecondGroup
          ? item.currentSecondGroup.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setfilterData(newData);
    } else {
      // Si no hay texto en el buscador, mostramos todas las salas
      setfilterData(filteredChatRooms);
    }
    setsearch(text);
  };

  return (
    // Contenedor principal
    <View style={[styles.container, { backgroundColor: teme.background }]}>
      {/*Contenedor del Buscador de contactos o palabras*/}
      <Searchbar maxLength={250} inputStyle={styles.textBuscador} style={[styles.buscador, { backgroundColor: teme.bla }, { color: teme.color }]} placeholder="Buscar" value={search} onChangeText={(text) => searchFilter(text)} />

      {/*Contenedor de la lista de mefnsajes */}
      <View style={styles.lista}>
        {/*Flatlist se encarga de enlistar los mensajes  */}
        <FlatList
          data={filterData}
          renderItem={({ item }) => <Chatcomponent item={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ceecff',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 1,
    width: width * 1,
  },
  textBuscador: {
    fontSize: height * 0.02,
    fontFamily: 'Quicksand-Regular',
  },

  lista: {
    paddingTop: '5%',
    paddingBottom: '5%',
    flex: 1,
    height: height * .8,
    width: width * 1
  },

  messagecontainer: {
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

  messageimage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  messageConttext: {
    marginRight: 50,
  },
  messageTitle: {
    fontSize: height * .02,
    //fontWeight: 'bold',
    fontFamily: 'Quicksand-Bold',
  },

  messagetext: {
    fontFamily: 'Quicksand-Regular',
    fontSize: height * 0.02,
  },

  buscador: {
    padding: 1,
    marginTop: height * .01,
    width: '75%',
  },
  message: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  conttime: {
    alignSelf: 'flex-end',
    marginRight: 5,

  },
  messagehour: {
    fontSize: height * .015,
    //textAlign: 'right',
  },

});

export default Messenger