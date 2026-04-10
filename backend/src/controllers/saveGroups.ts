//src/controllers/saveGroups.ts
import { Request, Response } from "express";
import { registerSaveGroup, removeGroup } from "../service/saveGroups";
import { handleHttp } from "../utils/error.handle";

export const createSaveGroup = async (req: Request, res:Response) => {
    try{
        const { currentGroupName, currentSecondGroup } = req.body;

        if(!currentGroupName || !currentSecondGroup){
            res.status(400).json({
                error: "currentGroupName y currentSecondGroup son requeridos"
            })
            return;
        }
        const groupData = await registerSaveGroup({
            currentGroupName,
            currentSecondGroup
        })
        res.status(201).json(groupData);
        return 

    }catch(e){
        handleHttp(res, e);
    }
}

export const deleteSaveGroup = async (req: Request, res:Response) => {
    try{
        const { id } = req.params;

        if (!id) {
            res.status(400).json({
                error: "ID requerido"
            });
            return;
        }

        const deleted = await removeGroup(id);

        res.status(200).json({
            message: "Grupo eliminado correctamente",
            data: deleted
        });

    }catch(e){
        handleHttp(res, e);
    }
}