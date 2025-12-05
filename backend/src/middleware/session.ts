//middleware/session.ts
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.handle";
import { JwtPayload } from "jsonwebtoken";

interface RequestExt extends Request{
    user?: string | JwtPayload;
}

export const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
    try{
        const jwtByUser = req.headers.authorization || '';
        const jwt = jwtByUser.split(' ').pop();
        const isUser = verifyToken(`${jwt}`)
        if(!isUser){
            res.status(401).send("NOT_HAVE_JWT_VALID");
        }else{
            req.user = isUser;
            console.log({jwtByUser})//muestra el token de user
            next();
        }
    }catch(e){
        res.status(400).send("SESSION_NOT_VALIDA");
    }
}