//service/upload.ts
import { BD } from "../../config/supabase";
import * as UploadModel from "../../models/upload";
import { Upload } from "../../interface/Upload/upload";
import { throwModelError } from "../../utils/error.handle";
import { v4 as uuidv4 } from "uuid";
import path from "path";

// Servicio para subir un archivo
export const uploadFile = async (file: Express.Multer.File, IdUser: string): Promise<Upload> =>{
    if(!file){
        throwModelError("No se proporcionó ningún archivo", null, "FILE_REQUIRED", 400);
    }
    const fileExtension = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExtension}`;
    const filePath = `img/${fileName}`;
    
    const{ error: uploadError} = await BD
        .storage
        .from("user")
        .upload(filePath, file.buffer, {
            contentType: file.mimetype,
            upsert: false
        });
    if(uploadError){
        throwModelError("Error al subir imagen al storage",uploadError,"STORAGE_UPLOAD_FAIL",500);
    }
    const {data} = BD
        .storage
        .from("user")
        .getPublicUrl(filePath)
    if(!data?.publicUrl){
        throwModelError("No se pudo obtener la URL publica de la imagen", null, "STORAGE_PUBLIC_URL_FAIL", 500);
    }
    const imageData: Upload = {
        fileName,
        Url: data.publicUrl,
        IdUser,
        path: filePath
    };
    if(!imageData){
        throwModelError("Error al insertar datos de la imagen", null, "DB_INSERT_FILE_FAIL", 500);
    }
    return await UploadModel.insertFile(imageData)
}

export const updateFile = async (id: string, file: Express.Multer.File): Promise<Upload> => {
    if(!file){
        throwModelError("No se proporcionó ningún archivo", null, "FILE_REQUIRED", 400);
    }
    // Obtener el archivo actual
    const currentFile = await UploadModel.getFileById(id);
    if(!currentFile){
        throwModelError("No se encontró el archivo actual", null, "FILE_NOT_FOUND", 404);
    }
    // Eliminar el archivo antiguo del storage
    const oldPath = `img/${currentFile?.fileName}`;
    const bucket = "user";
    const { error: removeError } = await BD
        .storage
        .from(bucket)
        .remove([oldPath]);

        if(removeError){
            throwModelError("Error al eliminar la imagen antigua del storage", 
                removeError, 
                "STORAGE_REMOVE_FAIL", 
                500
            );
        }
    console.log("Old file removed:", oldPath);
    // Subir el nuevo archivo
    const fileExtension = path.extname(file.originalname);
    const newFileName = `${uuidv4()}${fileExtension}`;
    const newPath = `img/${newFileName}`;

    const { error: uploadError } = await BD
        .storage
        .from(bucket)
        .upload(newPath, file.buffer, {
            contentType: file.mimetype,
            upsert: false
        });

    if(uploadError){
        throwModelError("Error al subir la nueva imagen al storage", 
            uploadError, 
            "STORAGE_UPLOAD_FAIL", 
            500
        );
    }
    // Obtner la URL pública del new archivo
    const { data } = BD
        .storage
        .from(bucket)
        .getPublicUrl(newPath);
        
    if(!data?.publicUrl){
        throwModelError("No se pudo obtener la URL publica de la nueva imagen", 
            null, 
            "STORAGE_PUBLIC_URL_FAIL", 
            500
        );
    };
    // Actualizar la tabla de file con la nueva información
    const updatedFile = await UploadModel.updateFile(id, {
        fileName: newFileName,
        Url: data.publicUrl
    });
    
    if(!updatedFile){
        throwModelError("Error al actualizar los datos de la imagen", 
            null, 
            "DB_UPDATE_FILE_FAIL", 
            500
        );
    }
    return updatedFile as Upload;
}

export const deleteFile = async (id: string): Promise<void> => {
    const file = await UploadModel.getFileById(id);
    if(!file){
        throwModelError("Archivo no encontrado", null, "FILE_NOT_FOUND", 404);
        return;
    }

    const bucket = "user";
    const filePath = file.Url.split(`/${bucket}/`)[1];
    // Elimina el archivo del storage
    const { error: removeError } = await BD
        .storage
        .from(bucket)
        .remove([filePath])
    console.log("FILE PATH:", filePath);
    if(removeError){
        throwModelError("Error al eliminar el archivo del storage", removeError, "STORAGE_REMOVE_FAIL", 500);
    }

    const Result = await UploadModel.deleteFile(id);
    return Result;
};