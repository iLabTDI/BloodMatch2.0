
// Creacion del dark mode por parte de JJ
import React from "react";
import { StyleSheet } from "react-native";

{/*POSIBLES COLORES PARA EL FONDO DE LA APLICACION
  #C1121F rojo cereza
  #890620 rojo sangre
  #003049 azul profundo
  #415A77 azul oceano
  #598392 azul grisaseo
  #B3C5D7 azul bajito
  #735751 cafe obscuro 
  #C09891 cafe claro
*/}

// estilos para el darkMode y para el lightMode
const darkMode = StyleSheet.create({
    light: {
      tema: 'light',
      color: "black",
      background: '#DBBAB5',
      bla: 'white',
    },
    dark: {
      tema: 'dark',
      color: "white",
      background: "#161616",
      bla: '#5e5e5e',
    },
});
export default darkMode;