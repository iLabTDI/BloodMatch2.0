import { Pressable, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ChevronRight } from "react-native-feather"
import { getUser } from "../lib/querys";
import { useTranslation } from "react-i18next";
import { getGlobalData } from "@/backend/querys/inserts/New_email";
import ModalDeleteChat from "../components/ModalDeleteChat"
import { deleteChatGroup } from "../lib/querys";
import { socket } from "@/util/connectionChat";

export default function Chatcomponent({ item, onDelete }) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const [isModalvisible, setIsModalVisible] = useState(false);

  const currentUser = getGlobalData("email");

  useEffect(() => {
    console.log("el titeem es=",item)
    if (item && item.messages) {
      console.log(" los items son=", item.messages[item.messages.length - 1]);
    }

    async function getUserData(email){
      let res = await getUser(email);
      setUser(res[0]);
    }
    getUserData(item.currentSecondGroup);
  }, [item]);

  function handleNavigateToMessageScreen() {
    navigation.navigate("Messagescreen", {
      currentSecondGroup: item.currentSecondGroup,
      currentGroupID: item.id,
      userData: user
    });
  }

  async function deleteChat(){
    // alert(`${item.currentSecondGroup} - ${currentUser}`);
    socket.emit("deleteGroup", {
      currentUser: currentUser,
      secondUser: item.currentSecondGroup
    });    

    setIsModalVisible(false); // Oculta el modal
    onDelete && onDelete();   // Notifica al padre para que lo quite de la lista
  }

  return (
    <>
      <TouchableOpacity 
        className="flex-row items-center p-4 border-b border-gray-200 active:bg-gray-500" 
        onPress={handleNavigateToMessageScreen}
        onLongPress={() => setIsModalVisible(true)}
      >
        <Image source={{ uri: user?.Url }} className="w-12 h-12 rounded-full mr-4" />
        <View className="flex-1">
          <View className="flex-row justify-between items-center">
            <Text numberOfLines={1} className="font-bold text-lg text-gray-800 w-4/5 truncate">{user?.FirstName} {user?.LastName}</Text>
            <Text className="text-sm text-gray-500">{item.timestamp}</Text>
          </View>
          <Text numberOfLines={1} className="text-gray-600 mt-1">
            {item && item.messages && item.messages.length > 0 
                ? item.messages[item.messages.length - 1].text 
                : t("start_messaging")}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-sm text-gray-500 mr-1">
            {item && item.messages && item.messages.length > 0 
              ? item.messages[item.messages.length - 1].time 
              : t("now")}
          </Text>
          <ChevronRight stroke="red" width={20} height={20} />
        </View>
      </TouchableOpacity>
      <ModalDeleteChat
        isVisible = {isModalvisible}
        onClose = {() => setIsModalVisible(false)}
        secondUser={user?.FirstName}
        onAccept={deleteChat}
      />
    </>
    
  );
}
