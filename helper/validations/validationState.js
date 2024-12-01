export function StateVal(state){
var MexicoState = [ 
    'aguascalientes',
    "baja California",
    "baja California Sur",
    "campeche",
    "chiapas",
    "chihuahua",
    "coahuila",
    "colima",
    "durango",
    "guanajuato",
    "guerrero",
    "hidalgo",
    "jalisco",
    "cdmx",
    "michoacán",
    "morelos",
    "nayarit",
    "nuevo León",
    "oaxaca",
    "puebla",
    "querétaro",
    "quintana Roo",
    "san Luis Potosí",
    "sinaloa",
    "sonora",
    "tabasco",
    "tamaulipas",
    "tlaxcala",
    "veracruz",
    "yucatán",
    "zacatecas"
    ]
    state = state.toLowerCase();

    if(state==''){
        
        alert("Campo vacio")
        return null;
    }
    else if (!MexicoState.includes(state)){
        console.error('Ingresar un estado valido')
        alert("Ingresar un estado valido de la republica mexicana")
        return null;
    }
    return (state)
}
