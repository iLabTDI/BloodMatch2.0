import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ChevronRight } from "react-native-feather"
import { getUser } from "../lib/querys";

export default function Chatcomponent({ item }) {
  const navigation = useNavigation();
  const [user, setUser] = useState({});

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
    });
  }

  return (
    <Pressable className="flex-row items-center p-4 border-b border-gray-200" onPress={handleNavigateToMessageScreen}>
      <Image source={{ uri: user?.Url }} className="w-12 h-12 rounded-full mr-4" />
      <View className="flex-1">
        <View className="flex-row justify-between items-center">
          <Text numberOfLines={1} className="font-bold text-lg text-gray-800 w-4/5 truncate">{user?.FirstName} {user?.LastName}</Text>
          <Text className="text-sm text-gray-500">{item.timestamp}</Text>
        </View>
        <Text numberOfLines={1} className="text-gray-600 mt-1">
          {item && item.messages && item.messages.length > 0 
              ? item.messages[item.messages.length - 1].text 
              : "Tap to start messaging"}
        </Text>
      </View>
      <View className="flex-row items-center">
        <Text className="text-sm text-gray-500 mr-1">
          {item && item.messages && item.messages.length > 0 
            ? item.messages[item.messages.length - 1].time 
            : "Now"}
        </Text>
        <ChevronRight stroke="red" width={20} height={20} />
      </View>
    </Pressable>
  );
}
