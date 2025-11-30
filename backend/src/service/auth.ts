//Service/auth
import { registerValidat } from "../validator/register";
import * as UserModel from "../models/user";
import { CustomError } from "../utils/CustomError";
import { encrypt, verified } from "../utils/crypt.handle";
import { generateToken } from "../utils/jwt.handle";

export const registerUser = async (userData: unknown) => {
    const parsed = registerValidat.safeParse(userData);
    if(!parsed.success){
        const errorList = parsed.error.issues.map(
            (e) => `${e.path.join(".")}: ${e.message}`
        );
        throw new CustomError(errorList.join(", "), "VALIDATION_ERROR", 400);
    }
    const user = parsed.data;

    const passhash = await encrypt(user.Password)
    const newUser = {
        ...user,
        Password: passhash
    };
    //se agrega usuario a models(BD)
    const result = await UserModel.createUser(newUser);
    return result;
};

export const loginUser = async (email: string, password: string) => {
    const checkIs = await UserModel.getUserByEmail(email);
    //validacion de Email y contraseña
    if(!checkIs) throw new CustomError("Usuario no encontrado","USER_NOT_FOUND",404);
    if(!email) throw new CustomError("El correo es obligatorio","USER_EMAIL_REQUIRED",404);
    if(!password) throw new CustomError("La contraseña es obligatoria","USER_PASSWORD_REQUIRED",404);

    const passwordHash = checkIs.Password;
    const isPasswordValid = await verified(password, passwordHash);
    if(!isPasswordValid) throw new CustomError("Contraseña incorrecta", "INVALID_PASSWORD", 403);

    const token = generateToken(checkIs.Email);//Generar token JWT
    const data ={
        token,
        user:checkIs
    };
    return data;
}