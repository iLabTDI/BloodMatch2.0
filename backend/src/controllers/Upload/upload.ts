// src/controllers/upload.ts
import { Request, Response } from "express";
import * as UploadService from "../../service/Upload/upload";
import { JwtPayload } from "jsonwebtoken";
import { handleHttp } from "../../utils/error.handle";

export const postFile = async (req:Request, res: Response): Promise<void> => {
        try {
                if(!req.file){
                        res.status(400).json({
                                message: "Archivo no proporcionado"
                        });
                        return;
                }
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
                const image = await UploadService.uploadFile(req.file, userPayload.id);
                res.status(200).json({
                        message: "Archivo subido correctamente",
                        data: image
                });
                return;
        } catch (e) {
                handleHttp(res, e)
                return;
        }
}
export const deleteFile = async (req:Request, res: Response): Promise<void> => {
        try {
                const { id } = req.params;
                if(!req.user){
                        res.status(401).json({
                                message: "Usuario no autenticado"
                        });
                        return;
                }
                const DeleteFile = await UploadService.deleteFile(id);
                res.status(201).json({
                        message: "Se elimino archivo",
                        file: DeleteFile,
                        data: DeleteFile
                });
                return;
        }catch (e){
                handleHttp(res, e)
                return;
        }
}
export const putFile = async ( req:Request, res: Response): Promise<void> => {
        try {
                const { id } = req.params;

                if(!req.file){
                        res.status(400).json({
                                message: "Archivo no proporcionado"
                        });
                        return;
                }
                if(!req.user){
                        res.status(401).json({
                                message: "Usuario no autenticado"
                        });
                        return;
                }
                const updatedFile = await UploadService.updateFile(id, req.file);
                res.status(200).json({
                        message: "Archivo actualizado correctamente",
                        data: updatedFile
                });
                return;
        }catch (e){
                handleHttp(res, e);
                return;
        }
}