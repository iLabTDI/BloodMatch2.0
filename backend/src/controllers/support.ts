import { Request, Response } from "express";
import { registerSupportTicket, modifySupportTicket, removeSupportTicket } from "../service/support";
import { JwtPayload } from "jsonwebtoken";
import { handleHttp } from "../utils/error.handle";

export const createSupport = async (req: Request, res: Response): Promise<void> => {
    try {
        const userPayload = req.user as JwtPayload;
        if(!req.user){
            res.status(401).json({
                message: "Usuario no autenticado"
            });
            return;
        }
        const supportData = await registerSupportTicket({...req.body, user: userPayload.email});
        res.status(201).json({
            message: "Ticket de soporte registrado exitosamente",
            data: supportData
        })
        return;
    }catch (e) {
        handleHttp(res, "ERROR_CREATING_SUPPORT_TICKET");
    }
}

export const updateSupport = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if(!req.user){
            res.status(401).json({
                message: "Usuario no autenticado"
            });
            return;
        }
        const updateData = await modifySupportTicket(id, req.body);
        res.status(200).json({
            message: "Ticket de soporte actualizado exitosamente",
            data: updateData
        })
        return;
    }catch (e) {
        handleHttp(res, "ERROR_UPDATING_SUPPORT_TICKET");
    }
}

export const deleteSupport = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if(!req.user){
            res.status(401).json({
                message: "Usuario no autenticado"
            });
            return;
        }
        const deleteSupport = await removeSupportTicket(id);
        res.status(200).json({
            message: "Ticket de soporte eliminado exitosamente",
            data: deleteSupport
        })
        return;
    }catch (e) {
        handleHttp(res, "ERROR_DELETING_SUPPORT_TICKET");
    }
}