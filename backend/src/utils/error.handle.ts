import { Response } from "express"
import { CustomError } from "./CustomError";
//Manejador de errores de las respuestas HTTP(controlls)
const handleHttp = (res: Response, error: unknown) => {
    if(error instanceof CustomError){
        console.error(`⚠️ [${error.code}]`, error.message);
        res.status(error.statusCode).json({
            error: {
                message: error.message,
                code: error.code,
                details: error.details || null,
            },
        });
    } else if (error instanceof Error){
        console.error("❌ Error desconocido:", error.message);
        res.status(500).json({error: {message: error.message, code: "UNHANDLED_ERROR"}});
    }else{
        console.error("❌ Error inesperado:", error);
        res.status(500).json({error: {message: "Error desconocido", code: "UNKNOWN"}});
    }
};

export {handleHttp};