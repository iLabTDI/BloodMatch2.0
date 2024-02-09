
// Creacion del dark mode por parte de JJ
import React from "react";
import { StyleSheet } from "react-native";

{/*POSIBLES COLORES PARA EL FONDO DE LA APLICACION
  #C1121F
  #890620
  #003049
  #415A77
  #598392
  #B3C5D7
  #735751
  #C09891
*/}

// estilos para el darkMode y para el lightMode
const darkMode = StyleSheet.create({
    light: {
      tema: 'light',
      color: "black",
      background: '#C09891',
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