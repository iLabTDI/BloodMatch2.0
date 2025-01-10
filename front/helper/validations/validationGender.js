//parte hecha por LOLA y modificaciones parte de JJ
export function validateGender(gen){
    
    gen = gen.toLowerCase();

    var genero = ['masculino', 'femenino']
    if(gen==''){
        console.error('campo vacio')
        alert("Ingresar un genero valido")
        return null
    }
    else if (!genero.includes(gen)){
        console.error('Genero no valido, ingresar masculino o femenino')
        alert("Ingresar un genero valido")
        return null
    } 

    return (gen)
}