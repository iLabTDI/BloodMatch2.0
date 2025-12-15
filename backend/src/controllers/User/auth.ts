import {Request, Response} from "express";
import { handleHttp } from "../../utils/error.handle";
import * as UserService from "../../service/User/auth"

//controller para registra un usuario
export const registerUser = async (req: Request, res: Response) => {
        try{
                console.log("req.body:", req.body); // 🔍 Verifica aquí
                const newUser = await UserService.registerUser(req.body); //se implementa logica de service
                res.status(201).json({message: "Usuario registrado exitosamente", user: newUser});
        } catch (e: any) {
                handleHttp(res, e)
        }
}

//controller para hacer login
export const loginUser = async (req: Request, res: Response) => {
        try{
                const {Email, Password} = req.body;
                const User = await UserService.loginUser(Email, Password);
                res.status(201).json({message: "Login exitoso",user: User});
        } catch (e) {
                handleHttp(res, e)
        }
}