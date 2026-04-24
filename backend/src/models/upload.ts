import { BD } from "../config/supabase"
import { Upload } from "../interface/Upload/upload"
import { throwModelError } from "../utils/error.handle";

// insertar File
export const insertFile = async (img: Upload): Promise<Upload> => {
    const { data, error } = await BD
    .from("File")
    .insert([img])
    .select()
    .single();
    if (error){
        console.error("SUPABASE ERROR:", error);
        throwModelError("Error al insertar una imagen", error, "DB_INSERT_IMG_FAIL", 500);
    } 
    return data;
};

// Actualizar el File de usuarios
export const updateFile = async (id: string, userData: Partial<Upload>): Promise<Upload> => {
    const { data, error } = await BD
    .from('File')
    .update(userData)
    .eq('id', id)
    .select()
    .single();
    if (error) 
        throwModelError("Error al actualizar la imagen de usuario", error, "DB_UPDATE_USER_IMG_FAIL", 500);
    return data;
};

//Obtener File por ID
export const getFileById = async (id: string): Promise<Upload> => {
    const { data, error } = await BD
    .from('File')
    .select('*')
    .eq('id', id)
    .single();
    
    if (error) {
        throwModelError(
            "Error al obtener la imagen por ID", 
            error, 
            "DB_GET_FILE_BY_ID_FAIL", 
            500
        );
    }
    return data;
};

// Eliminar File de usuarios
export const deleteFile = async (id: string): Promise<void> => {
    const { error } = await BD
    .from('File')
    .delete()
    .eq('id', id);
    if (error) 
        throwModelError("Error al eliminar imagen de usuario", error, "DB_DELETE_USER_IMG_FAIL", 500);
    return;
};
