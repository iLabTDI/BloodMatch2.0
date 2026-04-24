import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { handleHttp } from "../utils/error.handle";
import { listReports,registerReport,removeReport } from "../service/reports";

export const createReport = async (req: Request, res: Response): Promise<void> => {
    try {
        const userPayload = req.user as JwtPayload;
        if(!req.user){
            res.status(401).json({
                message: "Usuario no autenticado"
            });
            return;
        }
        const reportData = await registerReport({...req.body, user: userPayload.email});
        res.status(201).json({
            message: "Reporte registrado exitosamente",
            data: reportData
        })
        return;
    }catch (e){
        handleHttp(res, "ERROR_CREATING_REPORT");
    }
}

export const getListReports = async (req: Request, res: Response): Promise<void> => {
    try {
        if(!req.user){
            res.status(401).json({
                message: "Usuario no autenticado"
            });
            return;
        }

        const reports = await listReports();
        res.status(200).json({
            message: "Lista de reportes obtenida exitosamente", 
            data: reports
        })
    }catch (e){
        handleHttp(res, "ERROR_GETTING_REPORTS");
    }
}

export const deleteReports = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if(!req.user){
            res.status(401).json({
                message: "Usuario no autenticado"
            });
            return;
        }
        const deleteReport = await removeReport(id);
        res.status(200).json({
            message: "Reporte eliminado exitosamente",
            data: deleteReport
        })
    }catch{
        handleHttp(res, "ERROR_DELETING_REPORT");
    }
}