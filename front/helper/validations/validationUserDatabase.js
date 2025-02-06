import {size} from "lodash";
import {verificateUser} from "../../lib/querys"

export async function validateUserDatabase(user) {
    if (user === '') {
      //console.error('Campo vacío');
      alert("Su nombre no es valido , elige otro");
      return false;
    }
    var a =await verificateUser(user)
    if(a){
      alert("elige otro");
      return false;
    }
    //console.log("es valido")

    return true
  }
  