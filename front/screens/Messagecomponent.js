// import { StyleSheet, Text, View } from "react-native";

// export default function Messagecomponent({ currentUser, item }) {
//   const currentUserStatus = item.currentUser !== currentUser;

//   console.log(currentUserStatus , item);

//   return (
//     <View style={currentUserStatus ? {} : { alignItems: "flex-end" }}>
//       <View style={styles.messageItemWrapper}>
//         <View style={styles.messageItemInnerWrapper}>
//           <View
//             style={
//               currentUserStatus
//                 ? styles.messageItem
//                 : [styles.messageItem, { backgroundColor: "#703efe" }]
//             }
//           >
//             <Text
//               style={
//                 currentUserStatus ? { color: "#000" } : { color: "#e5c1fe" }
//               }
//             >
//               {item.text}
//             </Text>
//           </View>
//         </View>
//         <Text style={styles.messageTime}>{item.time}</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   messageItemWrapper: {
//     maxWidth: "50%",
//     marginBottom: 15,
//   },
//   messageItemInnerWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   messageItem: {
//     width: "100%",
//     backgroundColor: "#ffffff",
//     padding: 20,
//     borderRadius: 20,
//     marginBottom: 2,
//   },
//   messageTime : {
//     marginLeft : 10
//   }
// });


import { Text, View } from "react-native";

export default function Messagecomponent({ currentUser, item }) {
  const isCurrentUser = item.currentUser === currentUser;

  return (
    <View className={`flex ${isCurrentUser ? "items-end" : "items-start"} mb-3`}>
      <View className="max-w-[50%]">
        <View className="flex-row items-center">
          <View
            className={`p-3 rounded-xl ${
              isCurrentUser ? "bg-red-500" : "bg-white"
            }`}
          >
            <Text className={`${isCurrentUser ? "text-white" : "text-black"}`}>
              {item.text}
            </Text>
          </View>
        </View>
        <Text className={`text-gray-500 text-xs mt-1 ${isCurrentUser && "self-end"}`}>{item.time}</Text>
      </View>
    </View>
  );
}
