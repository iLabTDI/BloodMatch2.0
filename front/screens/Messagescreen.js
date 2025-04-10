import { useEffect, useState, useRef } from "react";
import {
  FlatList,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity
} from "react-native";
import { socket } from "../util/connectionChat";
import Messagecomponent from "./Messagecomponent";
import { getGlobalData } from "../backend/querys/inserts/New_email";
import Constants from "expo-constants";
import { useTranslation } from "react-i18next";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import ModalUserProfile from "@/components/ModalUserProfile";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import ModalReportUser from "../components/ModalReportUser"

export default function Messagescreen({ route }) {
  const [allChatMessages, setAllChatMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [currentChatMessage, setCurrentChatMessage] = useState("");
  const { currentGroupName, currentGroupID, userData } = route.params;
  const flatListRef = useRef(null);
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [modalUserProfileVisible, setModalUserProfileVisible] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [modalReportIsvisible, setModalReportIsvisible] = useState(false);


  useEffect(() => {
    const usuario = getGlobalData("email");
    setCurrentUser(usuario);

    socket.emit("findGroup", currentGroupID);
    socket.on("foundGroup", (allChats) => {
      setAllChatMessages(allChats);
      scrollToBottom();
    });

    return () => {
      socket.off("foundGroup");
    };
  }, [socket]);

  function handleAddNewMessage() {
    if (!currentChatMessage.trim()) return;

    const timeData = {
      hr: new Date().getHours().toString().padStart(2, "0"),
      mins: new Date().getMinutes().toString().padStart(2, "0"),
    };

    socket.emit("newChatMessage", {
      currentChatMesage: currentChatMessage,
      groupIdentifier: currentGroupID,
      currentUser,
      timeData,
    });

    setCurrentChatMessage("");
  }

  function scrollToBottom() {
    flatListRef.current?.scrollToEnd({ animated: true });
  }

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, marginTop: Constants.statusBarHeight }}
    >
      <View className="flex-row items-center bg-white px-4 py-3 border-b border-gray-300 shadow-md">
        <Pressable onPress={() => navigation.goBack()} className="mr-3">
          <FontAwesome5 name="arrow-left" size={24} color="black" />
        </Pressable>
        <TouchableOpacity className="flex flex-row items-center" onPress={() => setModalUserProfileVisible(!modalUserProfileVisible)}>
          <Image
            source={{ uri: userData.Url }}
            className="w-10 h-10 rounded-full mr-3"
          />
          <Text className="text-lg font-semibold">{userData.FirstName}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="absolute right-4"
          onPress={() => setShowOptionsMenu(!showOptionsMenu)}
        >
          <SimpleLineIcons name="options-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {showOptionsMenu && (
        <View className="self-end z-50 w-1/2 bg-white rounded-bl-2xl shadow-xl border border-gray-200">
          <TouchableOpacity 
            className="flex-row items-center px-4 py-3 hover:bg-gray-100 active:bg-gray-200 border-b border-gray-200 gap-2"
            onPress={() => {
              setModalUserProfileVisible(!modalUserProfileVisible);
              setShowOptionsMenu(false);
            }}
          >
            <FontAwesome5 name="user-circle" size={18} color="#374151" className="mr-2" />
            <Text className="text-gray-800 text-base">{t("view_profile")}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-row items-center px-4 py-3 hover:bg-gray-100 active:bg-gray-200 gap-2"
            onPress={() => {
              setModalReportIsvisible(true);
              setShowOptionsMenu(false);
            }}  
          >
            <FontAwesome5 name="exclamation-triangle" size={18} color="#DC2626" className="mr-2" />
            <Text className="text-red-600 text-base">{t("report_profile")}</Text>
          </TouchableOpacity>
        </View>
      )}

      {modalReportIsvisible &&(
        <ModalReportUser
          onClose={() => setModalReportIsvisible(false)}
          userToReport={userData}
        />
      )}

      <View className="flex-1 px-4">
        <FlatList
          ref={flatListRef}
          data={allChatMessages}
          renderItem={({ item }) => (
            <Messagecomponent item={item} currentUser={currentUser} />
          )}
          keyExtractor={(item) => item.id}
          onContentSizeChange={scrollToBottom}
          onLayout={scrollToBottom}
          showsVerticalScrollIndicator={false}
        />

        <View className="flex-row items-center p-2 bg-gray-100 border-t border-gray-400">
          <TextInput
            className="flex-1 bg-white rounded-xl px-4 py-2 text-lg max-h-24 overflow-scroll"
            value={currentChatMessage}
            onChangeText={setCurrentChatMessage}
            placeholder={t("type_your_message")}
            multiline
          />
          <Pressable
            onPress={handleAddNewMessage}
            className="ml-2 bg-red-500 p-2 rounded-full"
          >
            <FontAwesome5 name="arrow-alt-circle-right" size={24} color="white" />
          </Pressable>
        </View>
      </View>
      <ModalUserProfile
        isVisible={modalUserProfileVisible}
        onClose={() => setModalUserProfileVisible(false)}
        userData={{
          image: userData.Url,
          name: userData.FirstName,
          status: userData.Status,
          role: userData.Role, 
          city: userData.City,
          state: userData.State,
          blood_type: userData.Blood_Type,
          gender: userData.Gender
        }}
      />
    </KeyboardAvoidingView>
  );
}
