import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useTranslation } from "react-i18next";
import { getGlobalData, getAllGlobalData } from "../backend/querys/inserts/New_email";
import { getProfileImage } from "../lib/querys";
import { Send } from "react-native-feather";
import { useChatbot } from "@/hooks/useChatBot";

const ChatbotScreen = () => {
  const { t } = useTranslation();

  const initialMessages = [
    {
      id: String(Date.now()), // ID unique
      type: "bot",
      text: t("initial_message"),
    },
  ];

  const { response, loading, error, sendMessage } = useChatbot();
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState(null);
  const scrollViewRef = useRef();

  const handleSend = async () => {
    if (inputText.trim() === "") return;

    // User message
    const userMessage = {
      id: String(Date.now()), 
      type: "user",
      text: inputText.trim(),
    };

    // Update messages before continuing
    setMessages((prev) => {
      const updatedMessages = [...prev, userMessage];
      return updatedMessages;
    });

    setInputText("");
    setIsTyping(true);

    // Send message to ChatBot 
    await sendMessage(inputText.trim());
  };

  // Load user profile image
  useEffect(() => {
    const fetchImage = async () => {
      const email = getGlobalData("email");
      const imageUrl = await getProfileImage(email);
      setUserProfileImage(imageUrl);
    };
    fetchImage();
  }, []); 

  // Detect changes in `response` and add bot message
  useEffect(() => {
    if (response) {
      const botMessage = {
        id: String(Date.now()), // ID unique
        type: "bot",
        text: response ? response : t("i_didnt_understand_your_message"),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }
  }, [response]);

  useEffect(() => {
    // Scroll to last message
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const renderMessage = (message) => (
    <View
      key={message.id}
      className={`flex-row ${message.type === "user" ? "justify-end" : "justify-start"} mb-4`}
    >
      {message.type === "bot" && (
        <Image source={require("../assets/logotipo.png")} className="w-8 h-8 rounded-full mr-2" />
      )}
      <View
        className={`px-4 py-2 rounded-2xl max-w-[80%] ${message.type === "user" ? "bg-red-500" : "bg-gray-200"}`}
      >
        <Text className={message.type === "user" ? "text-white text-base" : "text-gray-800 text-base"}>{message.text}</Text>
      </View>
      {message.type === "user" && (
        <Image source={{ uri: userProfileImage }} className="w-8 h-8 rounded-full ml-2" />
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <ScrollView ref={scrollViewRef} className="flex-1 p-4" contentContainerStyle={{ flexGrow: 1 }}>
          {messages.map(renderMessage)}
          {isTyping && (
            <View className="flex-row items-center mb-4">
              <Image source={require("../assets/logotipo.png")} className="w-8 h-8 rounded-full mr-2" />
              <View className="bg-gray-200 p-3 rounded-2xl">
                <Text className="text-base">{t("loading")}</Text>
              </View>
            </View>
          )}
        </ScrollView>

        <View className="border-t border-gray-200 p-3">
          <View className="flex-row items-center">
            <TextInput
              className="flex-1 bg-gray-100 rounded-full px-4 py-4 mr-2 text-base"
              placeholder={t("type_your_message")}
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity
              onPress={handleSend}
              className="bg-red-500 w-10 h-10 rounded-full items-center justify-center"
            >
              <Send stroke="white" width={24} height={24} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

// function ChatbotScreen(){
//   return (
//     <View className="flex-1 bg-blue-600">
//       <Text>ChatbotScreen Screen</Text>
//     </View>
//   );
// }

export default ChatbotScreen;
