import { saveGroup,deleteGroup  } from "../models/saveGroups";
import { getUserByEmail } from "../models/user";
import { SaveGroup } from "../interface/savegroups";
import { throwModelError } from "../utils/error.handle";

export const registerSaveGroup = async (group: SaveGroup): Promise<SaveGroup | null> => {
    //Validar existencias de usuario
    const User1 = await getUserByEmail(group.currentGroupName);
    const User2 = await getUserByEmail(group.currentSecondGroup);

    if (!User1) {
        throwModelError("Usuario no existe", null, "USER_NOT_FOUND", 404);
    }

    if (!User2) {
        throwModelError("Usuario no existe", null, "USER_NOT_FOUND", 404);
    }

    const createdGroup = await saveGroup(group)

    if(!createdGroup) {
        throwModelError("Error al crear el grupo", null, "CREATE_FAILED", 500)
    }
    return createdGroup;
}

export const removeGroup = async(id:string) => {
    if(!id){
        throw new Error("UserId requerido");
    }

    const deletedGroup = await deleteGroup(id);
    if(!deletedGroup){
        throwModelError("Error al eliminar el grupo del usuario", null, "CREATE_FAILED", 500)
    }
    return deletedGroup;
}