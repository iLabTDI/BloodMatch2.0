import { User } from "../interface/user";
import * as UserModel from "../models/user";
import bcrypt from "bcryptjs"

//se encarga de Actualizar User
export const updateUser = async (id: string, userData: Partial<User>) => {
    //Si se actualiza la contraseña se hashea
    if(userData.Password){
        userData.Password = await bcrypt.hash(userData.Password, 10)
    }

    const result =await UserModel.updateUser(id, userData);
    return result;
}

//se encarga de delate user
export const deleteUser = async (id: string) => {
    const result = await UserModel.deleteUser(id);
    return result;
}

//se encarga de obtener user
export const getUser = async (id: string) => {
    const result = await UserModel.getUserById(id);
    return result;
}
