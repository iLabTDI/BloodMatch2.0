//Se encarga de registra User
import { User } from "../interface/user";
import * as UserModel from "../models/user";
import { CustomError } from "../utils/CustomError";
import { encrypt, verified } from "../utils/crypt.handle";

export const registerUser = async (user: User) => {
    
    if (!user.Email) throw new CustomError("El correo es obligatorio", "USER_EMAIL_REQUIRED", 400);
    if (!user.Password) throw new CustomError("La contraseña es obligatoria", "USER_PASWORD_REQUIRED", 400);

    //agregar validacion extra(zod) o express validetor

    const passhash = await encrypt(user.Password)
    const newUser: User = {
        ...user,
        Password: passhash
    };

    //se agrega usuario a models(BD)
    const result = await UserModel.createUser(newUser);
    return result;
};

//se encarga de hacer login
export const loginUser = async (email: string, password: string) => {
    //Obtenemos el usuario por medio del email
    const user = await UserModel.getUserByEmail(email);
    //valibasicadacion 
    if(!user) throw new CustomError("Usuario no encontrado","USER_NOT_FOUND",404);
    if(!email) throw new CustomError("El correo es obligatorio","USER_EMAIL_REQUIRED",404);
    if(!password) throw new CustomError("La contraseña es obligatoria","USER_PASSWORD_REQUIRED",404);

    //Validamos la contraseña
    const isPasswordValid = await verified(password, user.Password);
    if(!isPasswordValid) throw new CustomError("Contraseña incorrecta", "INVALID_PASSWORD", 403)

    //hacer mas robusta la validacion de usuario
    return user;
}