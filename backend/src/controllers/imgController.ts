import {Request, Response} from "express";
import { handleHttp } from "../utils/error.handle";

//controller para obtener una imagen
const getImg = ({ body }:Request, res: Response) => {
        try {
                res.send(body);
        } catch (e) {
        handleHttp(res, e)
        }
}

//controller para editar una imagen
const updateImg = ({ body }:Request, res: Response) => {
        try{
                res.send(body)
        }catch (e) {
                handleHttp(res, e)
        }
}

//controller para inserta un imagen
const postImg = ({ body }:Request, res: Response) => {
        try{
                res.send(body);
        } catch (e) {
                handleHttp(res, e)
        }
}

//controller para eliminar una imagen
const deleImg = ({body}:Request, res: Response) => {
        try{
                res.send(body)
        } catch (e) {
                handleHttp(res, e)
        }
}

//exportamos las controller
export {getImg, updateImg, postImg, deleImg };