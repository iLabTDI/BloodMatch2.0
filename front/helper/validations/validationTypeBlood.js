export function Bloodtype(type){
var blood = ['A+', 'A-', 'O+', 'O-', 'B+', 'B-', 'AB+', 'AB-']
    
    if(type==''){
        //console.error('campo vacio')
        alert("Slecciona un tipo de sandre valido")
        return null;
    }
    else if (!blood.includes(type)){
        //console.error('Ingrese un tipo de sangre valido')
        return null;
    }


    return (type)
}