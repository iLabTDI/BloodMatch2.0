import { size } from "lodash";
import { Alert } from "react-native";


//parte hecha por LOLA y modificaciones parte de JJ
export function ConfirmPass(passcon,mainPassword){
    if (passcon=='') {
        console.error('Campo vacio');
        alert("ingresa algo valido ")
      }
    else if (passcon==mainPassword) {
        
        
        return true
    }else{
        Alert.alert("contrasenas no iguales")

    }
  
}