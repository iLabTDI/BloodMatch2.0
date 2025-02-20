// import { useState, useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { Send } from "react-native-feather";
// import {useChatbot} from "@/hooks/useChatBot";

// const initialMessages = [
//   {
//     id: "1",
//     type: "bot",
//     text: "¡Hola! Soy el asistente de BloodMatch. ¿En qué puedo ayudarte hoy?",
//   },
// ];

// const ChatbotScreen = () => {
//   const { response, loading, error, sendMessage } = useChatbot();

//   const [messages, setMessages] = useState(initialMessages);
//   const [inputText, setInputText] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const scrollViewRef = useRef();

//   const handleSend = () => {
//     if (inputText.trim() === "") return;

//     // Agregar mensaje del usuario
//     const userMessage = {
//       id: String(messages.length + 1),
//       type: "user",
//       text: inputText.trim(),
//     }

//     setMessages((prev) => [...prev, userMessage]);
//     setInputText("");
//     setIsTyping(true);

//     // Simular respuesta del chatbot
//     setTimeout(() => {
//       const botMessage = {
//         id: String(messages.length + 2),
//         type: "bot",
//         text: "Gracias por tu mensaje. Estoy aquí para ayudarte con cualquier duda sobre donaciones de sangre.",
//       }
//       setMessages((prev) => [...prev, botMessage])
//       setIsTyping(false)
//     }, 2000)
//   }

//   useEffect(() => {
//     // Scroll al último mensaje
//     scrollViewRef.current?.scrollToEnd({ animated: true })
//   }, [messages]);

//   const renderMessage = (message) => (
//     <View
//       key={message.id}
//       className={`flex-row ${message.type === "user" ? "justify-end" : "justify-start"} mb-4`}
//     >
//       {message.type === "bot" && (
//         <Image source={require("../assets/logotipo.png")} className="w-8 h-8 rounded-full mr-2" />
//       )}
//       <View
//         className={`px-4 py-2 rounded-2xl max-w-[80%] ${message.type === "user" ? "bg-red-500" : "bg-gray-200"}`}
//       >
//         <Text className={message.type === "user" ? "text-white" : "text-gray-800"}>{message.text}</Text>
//       </View>
//       {message.type === "user" && (
//         <Image source={require("../images/logo.png")} className="w-8 h-8 rounded-full ml-2" />
//       )}
//     </View>
//   );

//   return (
//     <View className="flex-1 bg-white">
//       <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
//         <ScrollView ref={scrollViewRef} className="flex-1 p-4" contentContainerStyle={{ flexGrow: 1 }}>
//           {messages.map(renderMessage)}
//           {isTyping && (
//             <View className="flex-row items-center mb-4">
//               <Image source={require("../assets/logotipo.png")} className="w-8 h-8 rounded-full mr-2" />
//               <View className="bg-gray-200 p-3 rounded-2xl">
//                 {/* <RedLoader /> */}
//                 <Text>Cargando...</Text>
//               </View>
//             </View>
//           )}
//         </ScrollView>

//         <View className="border-t border-gray-200 p-4">
//           <View className="flex-row items-center">
//             <TextInput
//               className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2"
//               placeholder="Escribe tu mensaje..."
//               value={inputText}
//               onChangeText={setInputText}
//               multiline
//             />
//             <TouchableOpacity
//               onPress={handleSend}
//               className="bg-red-500 w-10 h-10 rounded-full items-center justify-center"
//             >
//               <Send stroke="white" width={20} height={20} />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </View>
//   );
// }

// export default ChatbotScreen;

import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Send } from "react-native-feather";
import { useChatbot } from "@/hooks/useChatBot";

const initialMessages = [
  {
    id: String(Date.now()), // ID único
    type: "bot",
    text: "¡Hola! Soy el asistente de BloodMatch. ¿En qué puedo ayudarte hoy?",
  },
];

const ChatbotScreen = () => {
  const { response, loading, error, sendMessage } = useChatbot();
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef();

  const handleSend = async () => {
    if (inputText.trim() === "") return;

    // Mensaje del usuario
    const userMessage = {
      id: String(Date.now()), // ID único
      type: "user",
      text: inputText.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Enviar mensaje al chatbot
    await sendMessage(inputText.trim());
    console.log("ReSPONSEEEEEEEEEEEEEEEE: ",response);

    // Agregar respuesta del chatbot cuando esté lista
    // setTimeout(() => {
      const botMessage = {
        id: String(Date.now()), // ID único
        type: "bot",
        text: response ? response : "Lo siento, no entendí tu mensaje.",
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    // }, 2000);
  };

  useEffect(() => {
    // Scroll al último mensaje
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
        <Text className={message.type === "user" ? "text-white" : "text-gray-800"}>{message.text}</Text>
      </View>
      {message.type === "user" && (
        <Image source={require("../images/logo.png")} className="w-8 h-8 rounded-full ml-2" />
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
                <Text>Cargando...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        <View className="border-t border-gray-200 p-4">
          <View className="flex-row items-center">
            <TextInput
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2"
              placeholder="Escribe tu mensaje..."
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity
              onPress={handleSend}
              className="bg-red-500 w-10 h-10 rounded-full items-center justify-center"
            >
              <Send stroke="white" width={20} height={20} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatbotScreen;
