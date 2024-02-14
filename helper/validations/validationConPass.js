import { size } from "lodash";
//parte hecha por LOLA y modificaciones parte de JJ
export function ConfirmPass(passcon){
    if (passcon=='') {
        console.error('Campo vacio');
        alert("Ingresar la misma contraseña que antes")
      }
    else if (size(passcon)<8) {
        console.error('Debes ingresar un contraseña mayor a 8 caracteres')
        alert("Ingresar la misma contraseña que antes")
    }
    return (passcon)
}