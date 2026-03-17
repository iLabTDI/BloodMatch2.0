//src/controllers/donations.ts
import { Request, Response } from "express";
import { registerDonation, editDonation, removeDonation } from "../service/donations";
import { JwtPayload } from "jsonwebtoken";
import { handleHttp } from "../utils/error.handle";

export const createDonation = async (req: Request, res: Response): Promise<void>=> {
    try{
        if(!req.user){
            res.status(401).json({
                message: "Usuario no autenticado"
            });
            return;
        }
        const userPayload = req.user as JwtPayload;
        if(!userPayload.id){
            res.status(400).json({
                message: "ID de usuario no encontrado en el token"
            });
            return;
        }
        const donationData = await registerDonation({...req.body, byUser: userPayload.id});
        res.status(201).json({
            message: "Donación registrada exitosamente",
            data: donationData
        });
        return;
    }catch(e){
        handleHttp(res, e)
        return;
    }
}

export const updateDonation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if(!req.user){
            res.status(401).json({
                message: "Usuario no autenticado"
            });
            return;
        }
        const updateData = await editDonation(id, req.body);
        res.status(200).json({
            message: "Donación Actualizada exitosamente",
            date: updateData
        });
        return;
    } catch (e) {
        handleHttp(res, e);
    }
}

export const deleteDonation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if(!req.user){
            res.status(401).json({
                message: "Usuario no autenticado"
            });
            return;
        }
        const deletedDonation = await removeDonation(id);
        res.status(200).json({
            message: "Donación eliminada exitosamente",
            data: deletedDonation
        });
        return;
    } catch (e) {
        handleHttp(res, e);
        return;
    }
}