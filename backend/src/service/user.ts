import { User } from "../interface/user";
import * as UserModel from "../models/user";
import bcrypt from "bcryptjs"
import { CustomError } from "../utils/CustomError";

//Se encarga de registra User
export const registerUser = async (user: User) => {
    //validacion basica
    if (!user.email) throw new CustomError("El correo es obligatorio", "USER_EMAIL_REQUIRED", 400);
    if (!user.password) throw new CustomError("La contraseña es obligatoria", "USER_PASWORD_REQUIRED", 400);

    //validar que no exita el correo antes
    const existing = await UserModel.getUserByEmail(user.email);
    if (existing)  throw new CustomError("El usuario ya existe", "USER_ALREADY_EXISTS", 409);

    //agregar validacion extra(zod)

    //hash de contraseña(bcrypt)
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser: User = {
        ...user,
        password: hashedPassword
    };

    //se agrega usuario a models(BD)
    const result = await UserModel.createUser(newUser);
    return result;
};

//se encarga de hacer login
export const loginUser = async (id: string) => {
    const user = await UserModel.getUserById(id);
    //validacion basica
    if(!user) throw new CustomError("Usuario no encontrado","USER_NOT_FOUND",404);

    //hacer mas robusta la validacion de usuario
    return user;
}

//se encarga de Actualizar User
export const updateUser = async (id: string, userData: Partial<User>) => {
    //Si se actualiza la contraseña se hashea
    if(userData.password){
        userData.password = await bcrypt.hash(userData.password, 10)
    }

    const result =await UserModel.updateUser(id, userData);
    return result;
}

//se encarga de delate user
export const deleteUser = async (id: string) => {
    const result = await UserModel.deleteUser(id);
    return result;
}