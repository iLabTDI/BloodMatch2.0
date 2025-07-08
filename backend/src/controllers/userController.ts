import {Request, Response} from "express";
import { handleHttp } from "../utils/error.handle";
import * as UserService from "../service/user"



//controller para cerrar sesion de usuario (a futuro implementar token, cookies, etc.)
export const logoutUser = ({ body }:Request, res: Response) => {
        try{
                res.send(body);
        } catch (e) {
                handleHttp(res, e)
        }
}

//controller para obtener un usuario
export const getUser = ({ params }:Request, res: Response) => {
        try {
                
        } catch (e) {
        handleHttp(res, e)
        }
}

//controller para actualizar usuario
export const updateUser = async ({params, body}: Request, res: Response) => {
        try{
                const {id} = params;
                const UpdateUser = await UserService.updateUser(id,body)
                res.status(201).json({message: "Actulizacion exitosa",user: UpdateUser});
        }catch (e) {
                handleHttp(res, e)
        }
}
//controller para eliminar un usuario
export const deleUser = async ({params}:Request, res: Response) => {
        try{
                const {id} = params;
                const DeleteUser = await UserService.deleteUser(id)
                res.status(201).json({message: "Se elimino usuario",user: DeleteUser});
        } catch (e) {
                handleHttp(res, e)
        }
}
