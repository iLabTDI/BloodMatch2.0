import { size } from "lodash";
//parte hecha por LOLA y modificaciones parte de JJ
export function validatePassword(password){
    if (password=='') {
        console.error('Campo vacio');
        alert("Ingresar una contraseña valida")
      }
    else if (size(password)<8) {
        console.error('Debes ingresar un contraseña mayor a 8 caracteres')
        alert("Ingresar una contraseña valida")
      }
      return (password)
}