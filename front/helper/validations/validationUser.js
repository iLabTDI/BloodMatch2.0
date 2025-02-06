
import {size} from "lodash";
import {verificateUser} from "../../lib/querys"

export function validateUser(user) {
    if (user === '') {
      //console.error('Campo vacío');
      alert("Su nombre no es valido , elige otro");
      return false;
    }
    //console.log("es valido")

    return true
  }
  