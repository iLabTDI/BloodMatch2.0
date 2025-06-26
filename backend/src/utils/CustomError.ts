//se encarga de crear los mensajes customs de errores
export class CustomError extends Error{
    code: string;
    statusCode: number;
    details?: any;

    constructor(message: string, code: string, statusCode: number = 500, details?: any){
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.details = details;
    }
}