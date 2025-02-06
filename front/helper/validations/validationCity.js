import { StateVal } from "./validationState"
//validacion hecha de la ciudad, se trabajo para conectarlo a futuro con la de estados parte de JJ, base ya hecha por LOLA
export function ValidateJalisco(city){
    var Jal = [
        'zapopan',
        'guadalajara',
        'tlaquepaque',
        'tlajomulco',
        'tonala',
    ]
    
    city = city.toLowerCase()

    if(city==''){
      //console.error('campo vacio')
      alert("Ingresar una ciudad valida")
      return null
    }
    else if (!Jal.includes(city)){
        //console.error('Ingresar una ciudad dentro del rango')
        alert("Ingresar una ciudad valida")
        return null
    }
    return (city)
}

if (StateVal=="Jalisco"){
    // Ejecutar la validación específica para Jalisco
    const validatedCity = ValidateJalisco(city); 
    if (validatedCity !== null) {
      //console.log({validatedCity});
    } else {
      //console.error('La ciudad no es válida');
    }
  }