import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export const hp = (percentage) => {
  return (percentage * deviceHeight) / 100;
};
export const wp = (percentage) => {
  return (percentage * deviceWidth) / 100;
};

//Este archivo es para importar hp y wp que miden el ancho(wp) y la altura(hp) de la pantalla del dispostivo.
//Ejemplo de uso: width: wp(50), aqui estas dando el 50% de ancho de la pantalla del dispositivo.
//Mismo caso con hp.
