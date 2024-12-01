import { size } from "lodash";
//parte hecha por LOLA y modificaciones parte de JJ
export function validateName(firstName){
    if (firstName=='') {
        console.error('Campo vacio');
        alert("Ingrese un nombre verdadero");
      }
 
      return (firstName)
}