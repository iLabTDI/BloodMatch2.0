import { size } from "lodash";
export function validatePhone(phone){
    if (phone=='') {
        //console.error('Campo vacio');
        alert("Ingresar un numero de telefono valido")
        return false;
      }
    else if (size(phone)<10) {
        //console.error('Debe ingresar su numero de telefono mayor a 10 caracteres')
        alert("Ingresar un numero de telefono valido")
        return false;
      }
      return (phone)
}