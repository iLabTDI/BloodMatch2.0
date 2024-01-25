import { size } from "lodash";
//parte hecha por LOLA y modificaciones parte de JJ
export function validateName(firstName){
    if (firstName=='') {
        console.error('Campo vacio');
      }
    else if (size(firstName)<7) {
        console.error('Debee ingresar un nombre mayor a 8 caracteres')
      }
      return (firstName)
}