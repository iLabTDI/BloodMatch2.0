//src/controllers/matches.ts
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { handleHttp } from "../utils/error.handle";
import { registerMatch, getUserMatches, removeMatche } from "../service/matches";

export const createMatch = async (req: Request, res:Response) => {
    try{
        const userPayload = req.user as JwtPayload;
        if(!req.user){
            res.status(401).json({
                message: "Usuario no autenticado"
            });
            return;
        }
        const matcheData = await registerMatch({...req.body, user1_id: userPayload.id})
        res.status(201).json({
            message: "Matche hecho exitosamente",
            data: matcheData
        });
        return;
    }catch(e){
        handleHttp(res, e)
        return;
    }
}

export const deleteMatche = async (req: Request, res: Response) =>{
    try{
        const { id } = req.params;
        if(!req.user){
            res.status(401).json({
                message: "Usuario no autenticado"
            });
            return;
        }
        const deletedMatche = await removeMatche(id);
        res.status(200).json({
            message: "Matche eliminado exitosamente",
            data: deletedMatche
        });
        return;
    }catch(e){
        handleHttp(res, e);
        return;
    }
}

export const getMatches = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const matches = await getUserMatches(id);
        res.status(201).json({
            message: "Matches del usuario",
            data: matches
        });
        return;
    }catch(e){
        handleHttp(res, e);
        return;
    }
}