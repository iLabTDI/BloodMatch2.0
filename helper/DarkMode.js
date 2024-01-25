
// Creacion del dark mode por parte de JJ
import React from "react";
import { StyleSheet } from "react-native";

// estilos para el darkMode y para el lightMode
const darkMode = StyleSheet.create({
    light: {
      tema: 'light',
      color: "black",
      background: '#ceecff',
      bla: 'white',
    },
    dark: {
      tema: 'dark',
      color: "white",
      background: "#0a5cb8",
      bla: '#5e5e5e',
    },
});
export default darkMode;