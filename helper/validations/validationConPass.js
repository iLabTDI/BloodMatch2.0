import { size } from "lodash";
//parte hecha por LOLA y modificaciones parte de JJ
export function ConfirmPass(passcon,mainPassword){
    if (passcon=='') {
        console.error('Campo vacio');
        alert("ingresa algo valido ")
      }
    else if (passcon==mainPassword) {
        console.error('constrasenas iguales')
        
        return true
    }else{
        console.error('constraseas no iguales ')

    }
  
}