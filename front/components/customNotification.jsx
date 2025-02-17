// import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
// import React from "react";
// import Toast from "react-native-toast-message";

// const CustomNotification = () => {
//   const customToastConfig = {
//     my_custom_toast: ({ text1, text2, props }) => (
//       <View
//         style={{
//           width: 300,
//           padding: 15,
//           backgroundColor: "#22c55e",
//           borderRadius: 10,
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <View style={{ flex: 1 }}>
//           <View
//             style={{
//               flex: 1,
//               flexDirection: "row",
//               justifyContent: "space-between",
//             }}
//           >
//             <View style={{ flex: 1, flexDirection: "row", gap: 10 }}>
//               <Text style={{ color: "white", fontSize: 18, fontWeight: "900" }}>
//                 {text1}
//               </Text>
//               {props.iconHeart && props.iconHeart}
//             </View>
//             <TouchableOpacity onPress={() => Toast.hide()}>
//               <View
//                 style={{
//                   marginLeft: 10,
//                   marginBottom: 10,
//                 }}
//               >
//                 {props.iconClose && props.iconClose}
//               </View>
//             </TouchableOpacity>
//           </View>
//           <Text style={{ color: "#393939", fontSize: 12, fontWeight: 600 }}>
//             {text2}
//           </Text>
//         </View>
//       </View>
//     ),
//   };

//   return <Toast config={customToastConfig} />;
// };

// export default CustomNotification;

// const styles = StyleSheet.create({});



import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Toast from "react-native-toast-message";

const CustomNotification = () => {
  const customToastConfig = {
    my_custom_toast: ({ text1, text2, props }) => (
      <View className="w-[300px] p-4 bg-green-500 rounded-lg flex-row items-center justify-between">
        <View className="flex-1">
          <View className="flex-row justify-between">
            <View className="flex-1 flex-row gap-2">
              <Text className="text-white text-lg font-black">{text1}</Text>
              {props.iconHeart && props.iconHeart}
            </View>
            <TouchableOpacity onPress={() => Toast.hide()}>
              <View className="ml-2 mb-2">
                {props.iconClose && props.iconClose}
              </View>
            </TouchableOpacity>
          </View>
          <Text className="text-gray-700 text-xs font-semibold">{text2}</Text>
        </View>
      </View>
    ),
  };

  return <Toast config={customToastConfig} />;
};

export default CustomNotification;
