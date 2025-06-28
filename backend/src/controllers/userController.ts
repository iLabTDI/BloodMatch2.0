import {Request, Response} from "express";
import { handleHttp } from "../utils/error.handle";
import * as UserService from "../service/user"

//controller para registra un usuario
const postRegister = async (req: Request, res: Response) => {
        try{
                const newUser = await UserService.registerUser(req.body); //se implementa logica de service
                res.status(201).json({message: "Usuario registrado exitosamente", user: newUser});
        } catch (e: any) {
                handleHttp(res, e)
        }
}

//controller para hacer login
const postLogin = async (req: Request, res: Response) => {
        try{
                const User = await UserService.loginUser(req.body);
                res.status(201).json({message: "Login exitoso",user: User});
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

//controller para actualizar usuario
const updateUser = async ({params, body}: Request, res: Response) => {
        try{
                const {id} = params;
                const UpdateUser = await UserService.updateUser(id,body)
                res.status(201).json({message: "Actulizacion exitosa",user: UpdateUser});
        }catch (e) {
                handleHttp(res, e)
        }
}
//controller para eliminar un usuario
const deleUser = async ({params}:Request, res: Response) => {
        try{
                const {id} = params;
                const DeleteUser = await UserService.deleteUser(id)
                res.status(201).json({message: "Se elimino usuario",user: DeleteUser});
        } catch (e) {
                handleHttp(res, e)
        }
}
//exportamos las controller
export {getUser, updateUser, postRegister, postLogin,postlogout ,deleUser };