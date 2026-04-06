//src/service/matches.ts
import { createMatch, deleteMatche, getMatchesByUser } from "../models/matches";
import { getUserById } from "../models/user";
import { Matches } from "../interface/matches";
import { throwModelError } from "../utils/error.handle";

export const registerMatch = async (match:Matches): Promise<Matches | null> => {
    //Validar existencias de usuario
    const User1 = await getUserById(match.user1_id);
    const User2 = await getUserById(match.user2_id);

    if (!User1) {
        throwModelError("Usuario no existe", null, "USER_NOT_FOUND", 404);
    }

    if (!User2) {
        throwModelError("Usuario no existe", null, "USER_NOT_FOUND", 404);
    }
    //validar que un usuario no pueda hacer match consigo mismo
    if(match.user1_id === match.user2_id){
        throw new Error("Un usuario no puede hacer match consigo mismo");
    }
    const createdMatch = await createMatch(match)

    if(!createdMatch){
        throwModelError("Error al crear el match", null, "CREATE_FAILED", 500)
    }
    return createdMatch;
}

export const getUserMatches = async(id:string) => {
    if(!id){
        throw new Error("UserId requerido");
    }

    const getUserMatches = await getMatchesByUser(id);
    if(!getUserMatches){
        throwModelError("Error al obtener los matches de usuario", null, "CREATE_FAILED", 500)
    }
    return getUserMatches;
}

export const removeMatche = async(id:string) => {
    if(!id){
        throw new Error("UserId requerido");
    }

    const deletedMatche = await deleteMatche(id);
    if(!deletedMatche){
        throwModelError("Error al eliminar el matche del usuario", null, "CREATE_FAILED", 500)
    }
    return deletedMatche;
}