import { User } from "../interface/user";
import * as UserModel from "../models/user";
import bcrypt from "bcryptjs"
import { CustomError } from "../utils/CustomError";

//Se encarga de registra User
export const registerUser = async (user: User) => {
    //validacion basica
    if (!user.Email) throw new CustomError("El correo es obligatorio", "USER_EMAIL_REQUIRED", 400);
    if (!user.Password) throw new CustomError("La contraseña es obligatoria", "USER_PASWORD_REQUIRED", 400);

    //validar que no exita el correo antes
    //const existing = await UserModel.getUserByEmail(user.Email);
    //if (existing)  throw new CustomError("El usuario ya existe", "USER_ALREADY_EXISTS", 409);

    //agregar validacion extra(zod)

    //hash de contraseña(bcrypt)
    const hashedPassword = await bcrypt.hash(user.Password, 10);
    const newUser: User = {
        ...user,
        Password: hashedPassword
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