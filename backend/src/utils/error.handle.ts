import { Response } from "express"

//Manejador de errores de las respuestas HTTP
const handleHttp = (res: Response, error: string) => {
    res.status(500)
    res.send({error})
};

export {handleHttp};