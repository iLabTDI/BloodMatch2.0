import { size } from "lodash";
//parte hecha por LOLA y modificaciones parte de JJ
export function ConfirmPass(passcon){
    if (passcon=='') {
        console.error('Campo vacio');
      }
    else if (size(passcon)<8) {
        console.error('Debes ingresar un contraseña mayor a 8 caracteres')
    }
    return (passcon)
}