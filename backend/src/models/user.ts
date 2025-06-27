import { BD } from "../config/supabase"
import { User } from "../interface/user"
import { throwModelError } from "../utils/error.handle";


// Crear usuario
export const createUser = async (user: User) => {
    const { data, error } = await BD.from("users").insert([user]);
    if (error) throwModelError("Error al crear usuario", error, "DB_CREATE_USER_FAIL");
    return data;
};

// Obtener usuario por ID
export const getUserById = async (id: string) => {
    const { data, error } = await BD.from('users').select('*').eq('id', id).maybeSingle();
    if (error) throwModelError("Error al obtener usuario por ID", error, "DB_GET_USER_FAIL");
    return data;
};

// Obtener todos los usuarios
export const getUsers = async () => {
    const { data, error } = await BD.from("users").select('*');
    if (error) throwModelError("Error al obtener lista de usuarios", error, "DB_GET_USERS_FAIL");
    return data;
};

// Actualizar usuario por ID
export const updateUser = async (id: string, userData: Partial<User>) => {
    const { data, error } = await BD.from('users').update(userData).eq('id', id);
    if (error) throwModelError("Error al actualizar usuario", error, "DB_UPDATE_USER_FAIL");
    return data;
};

// Eliminar usuario por ID
export const deleteUser = async (id: string) => {
    const { data, error } = await BD.from('users').delete().eq('id', id);
    if (error) throwModelError("Error al eliminar usuario", error, "DB_DELETE_USER_FAIL");
    return data;
};

// Obtener usuario por email
export const getUserByEmail = async (email: string) => {
    const { data, error } = await BD.from('users').select('*').eq('email', email).maybeSingle();
    if (error) throwModelError("Error al obtener usuario por email", error, "DB_GET_USER_EMAIL_FAIL");
    return data;
};
