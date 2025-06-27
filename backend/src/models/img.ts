import { BD } from "../config/supabase"
import { Image } from "../interface/img"
import { throwModelError } from "../utils/error.handle";

// insertar imagen
export const insertImg= async (img: Image) => {
    const { data, error } = await BD.from("images").insert([img]);
    if (error) throwModelError("Error al insertar una imagen", error, "DB_INSERT_IMG_FAIL");
    return data;
};

// Obtener la imagen de usuario ID
export const getImgByUserId = async (userId: string) => {
    const { data, error } = await BD.from('images').select('*').eq('userId', userId).maybeSingle();
    if (error) throwModelError("Error al obtener la imagen por userId", error, "DB_GET_IMG_BY_USER_FAIL");
    return data;
};


// Actualizar la imagen de usuario 
export const updateUserImg = async (id: string, userData: Partial<Image>) => {
    const { data, error } = await BD.from('images').update(userData).eq('id', id);
    if (error) throwModelError("Error al actualizar la imagen de usuario", error, "DB_UPDATE_USER_IMG_FAIL");
    return data;
};

// Eliminar imagen de usuarios
export const deleteUserImg = async (id: string) => {
    const { data, error } = await BD.from('images').delete().eq('id', id);
    if (error) throwModelError("Error al eliminar imagen de usuario", error, "DB_DELETE_USER_IMG_FAIL");
    return data;
};
