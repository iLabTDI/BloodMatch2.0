//parte hecha por LOLA y modificaciones parte de JJs
import {size} from "lodash";
export function validateUser(user){
    if(user==''){
        console.error('campo vacio')
        return null;
    }
    else if (size(user)<8) {
        console.error('Debee ingresar un nombre de usuario valido')
        return null;
      }
    return (user);
}