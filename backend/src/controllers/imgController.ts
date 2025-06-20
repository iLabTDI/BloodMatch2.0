import {Request, Response} from "express";
import { handleHttp } from "../utils/error.handle";

//controller para obtener una imagen
const getImg = ({ body }:Request, res: Response) => {
        try {
                res.send(body);
        } catch (e) {
        handleHttp(res, 'ERROR_GET_USER')
        }
}
//controller para obtener imagenes
const getImgs = ({ body }:Request, res: Response) => {
        try{
                res.send(body)
        } catch (e) {
                handleHttp(res, 'ERROR_GET_USERS')
        }
}

//controller para editar una imagen
const updateImg = ({ body }:Request, res: Response) => {
        try{
                res.send(body)
        }catch (e) {
                handleHttp(res, 'ERROR_UPDATE_USER')
        }
}

//controller para inserta un imagen
const postImg = ({ body }:Request, res: Response) => {
        try{
                res.send(body);
        } catch (e) {
                handleHttp(res, 'ERROR_INSERT_USER')
        }
}

//controller para eliminar una imagen
const deleImg = ({body}:Request, res: Response) => {
        try{
                res.send(body)
        } catch (e) {
                handleHttp(res, 'ERROR_DELET_USER')
        }
}

//exportamos las controller
export {getImg, getImgs, updateImg, postImg, deleImg };