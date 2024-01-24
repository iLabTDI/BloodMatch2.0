import { size } from "lodash";
//parte hecha por LOLA y modificaciones parte de JJ
export function validatePhone(phone){
    if (phone=='') {
        console.error('Campo vacio');
      }
    else if (size(phone)<10) {
        console.error('Debe ingresar su numero de telefono mayor a 10 caracteres')
      }
      return (phone)
}