import { Response } from "express"
import { CustomError } from "./CustomError";

//Manejador de errores de las respuestas HTTP(controlls)
export const handleHttp = (res: Response, error: unknown) => {
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

//Manejador de errores de BD(models)
export const throwModelError =(
    message: string,
    error: unknown, 
    code: string = "UNHANDLE_MODEL_ERROR", 
    statusCode:number = 500) =>{
    //variables para mensaje y details
    let fullMessage = message;
    let details = null;

    if(error && typeof error === "object" && "message" in error){
        fullMessage += `: ${(error as any).message}`;
        details = error;
    }

    throw new CustomError(fullMessage, code, statusCode, details);
};

