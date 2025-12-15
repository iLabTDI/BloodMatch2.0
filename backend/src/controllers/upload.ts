import {Request, Response} from "express";
import { handleHttp } from "../utils/error.handle";

//controller para obtener una imagen
export const getFile = ({ body }:Request, res: Response) => {
        try {
                res.send(body);
        } catch (e) {
        handleHttp(res, e)
        }
}