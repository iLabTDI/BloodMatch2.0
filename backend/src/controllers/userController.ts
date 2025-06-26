import {Request, Response} from "express";
import { handleHttp } from "../utils/error.handle";


//controller para registra un usuario
const postRegister = ({ body }:Request, res: Response) => {
        try{
                res.send(body);
        } catch (e) {
                handleHttp(res, e)
        }
}

//controller para hacer login
const postLogin = ({ body }:Request, res: Response) => {
        try{
                res.send(body);
        } catch (e) {
                handleHttp(res, e)
        }
}

//controller para cerrar sesion de usuario
const postlogout = ({ body }:Request, res: Response) => {
        try{
                res.send(body);
        } catch (e) {
                handleHttp(res, e)
        }
}

//controller para obtener un usuario
const getUser = ({ body }:Request, res: Response) => {
        try {
                res.send(body);
        } catch (e) {
        handleHttp(res, e)
        }
}
//controller para obtener un usuarios
const getUsers = ({ body }:Request, res: Response) => {
        try{
                res.send(body)
        } catch (e) {
                handleHttp(res, e)
        }
}
//controller para actualizar usuario
const updateUser = ({ body }:Request, res: Response) => {
        try{
                res.send(body)
        }catch (e) {
                handleHttp(res, e)
        }
}
//controller para eliminar un usuario
const deleUser = ({body}:Request, res: Response) => {
        try{
                res.send(body)
        } catch (e) {
                handleHttp(res, e)
        }
}
//exportamos las controller
export {getUser, getUsers, updateUser, postRegister, postLogin,postlogout ,deleUser };