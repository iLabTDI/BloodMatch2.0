import React, { useContext, useEffect, useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TextInput,
    SafeAreaView,
    FlatList
} from "react-native";
import { Search, ChevronRight } from "react-native-feather"
// import { Directions, FlatList } from "react-native-gesture-handler";
import themeContext from "../helper/ThemeCon";
import { socket } from "../util/connectionChat";
import Chatcomponent from "./chatComponent";
import { getGlobalData } from "../backend/querys/inserts/New_email";
import { useFocusEffect } from "@react-navigation/native";
import Constants from 'expo-constants';
import { useTranslation } from "react-i18next";

import RedLoader from "@/components/RedLoader";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Messenger = ({ navigation }) => {
    const { t } = useTranslation();
    const teme = useContext(themeContext);
    const [filterData, setfilterData] = useState([]);
    const [search, setsearch] = useState("");
    const [allChatRooms, setAllChatRooms] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const handleFindGroup = (id) => {
        socket.emit("encontrar", id);
    };

    const verification = async () => {
        try {
            const usuario = getGlobalData("email");

            socket.emit("getAllGroups");
            socket.on("groupList", (groups) => {
                console.log("los grupos son", groups);
                console.log("el usuario es", usuario);
                if (groups.length > 0) {
                    console.log("Grupos recibidos:", groups);
                    let longitud = groups.length;
                    for (let i = 0; i < longitud; i++) {
                        if (
                            usuario === groups[i].currentGroupName ||
                            usuario === groups[i].currentSecondGroup
                        ) {
                            console.log(" ID =", groups[i].id);
                            let id = groups[i].id;
                            handleFindGroup(id);
                        } else {
                            console.log("El usuario no está en este grupo");
                        }
                    }
                } else {
                    console.log("no hay grupos");
                }
            });
        } catch (e) {
            console.log("Error durante la verificación:", e);
        }
    };

    const filt = [];
    useFocusEffect(
        useCallback(() => {
            verification();

            const handleFound = (messages) => {
                setAllChatRooms((prevMessages) => {
                    const combinedMessages = [...prevMessages, ...messages];
                    const uniqueMessages = [
                        ...new Map(
                            combinedMessages.map((msg) => [msg.id, msg])
                        ).values(),
                    ];
                    return uniqueMessages;
                });
            };

            socket.on("found", handleFound);

            return () => {
                socket.off("found", handleFound);
                socket.off("groupList");
            };
        }, [])
    );

    useEffect(() => {
        if (allChatRooms.length > 0) {
            const result = filteredChatRooms();
            console.log("El resultado es:", result);
            setfilterData(result);
        } else {
            console.log("No hay datos en allChatRooms todavía.");
        }
    }, [allChatRooms]);

    const user = getGlobalData("email");

    function filteredChatRooms() {
        const result = allChatRooms.map((group) => {
            if (user === group.currentGroupName) {
                filt.push({
                    id: group.id,
                    currentSecondGroup: group.currentSecondGroup,
                    messages: group.messages,
                });
                console.log("lo que tiene flit", filt);

                return {
                    id: group.id,
                    currentSecondGroup: group.currentSecondGroup,
                    messages: group.messages,
                };
            } else {
                filt.push({
                    id: group.id,
                    currentGroupName: group.currentGroupName,
                });
                console.log(filt);
                return {
                    id: group.id,
                    currentSecondGroup: group.currentGroupName,
                    messages: group.messages,
                };
            }
        });

        return result;
    }

    //Funcion para obtener el texto del buscador e ir cambiando el contenido del flatlist
    // const searchFilter3 = (text) => {
    //     if (text) {
    //         const newData = filterData.filter((item) => {
    //             const itemData = item.currentSecondGroup
    //                 ? item.setCurrentGroupName.toUpperCase()
    //                 : "".toUpperCase();
    //             const textData = text.toUpperCase();
    //             return itemData.indexOf(textData) > -1;
    //         });

    //         setfilterData(newData);
    //         // setsearch(text);
    //     } else {
    //         //setfilterData(fullData);
    //         setfilterData(filteredChatRooms);
    //     }
    //     setsearch(text); // Actualiza el texto ingresado
    // };

    const searchFilter = (text) => {
        setIsLoading(true);
        if (text) {
            const newData = filterData.filter((item) => {
                const itemData = item.currentSecondGroup
                    ? item.currentSecondGroup.toUpperCase()
                    : "".toUpperCase();
                const textData = text.toUpperCase();
                setIsLoading(false);
                return itemData.indexOf(textData) > -1;
            });

            setfilterData(newData);
        } else {
            // Si no hay texto en el buscador, mostramos todas las salas
            setfilterData(filteredChatRooms);
        }
        setIsLoading(false);
        setsearch(text);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
          <StatusBar backgroundColor={"#fff"} style="dark"/>
          <View className="p-4 border-b border-gray-200">
            <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2">
              <Search stroke="#9CA3AF" width={20} height={20} />
              <TextInput
                className="flex-1 ml-2 text-base text-gray-700"
                placeholder={t("search_chat")}
                placeholderTextColor="#9CA3AF"
                value={search}
                onChangeText={(text) => searchFilter(text)}
              />
            </View>
          </View>
          {isLoading 
          ? (
            <View className="mt-10">
                <RedLoader/>
            </View>
            )
          : (
            <FlatList
                data={filterData}
                renderItem={({ item }) => <Chatcomponent item={item} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ flexGrow: 1 }}
                ListEmptyComponent={
                  <View className="flex-1 items-center justify-center">
                    <Text className="text-gray-500 text-lg">{t("no_chats")}</Text>
                  </View>
                }
            />
            )
          }
        </SafeAreaView>
    );
};

// const styles = StyleSheet.create({
//   container: {
//     marginTop: Constants.statusBarHeight
//   }
// });

export default Messenger;
