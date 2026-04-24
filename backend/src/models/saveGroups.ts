//src/models/savegroups.ts
import { BD } from "../config/supabase"
import { SaveGroup } from "../interface/savegroups"
import { throwModelError } from "../utils/error.handle"


export const saveGroup = async (group: SaveGroup) => {
    const { data, error } = await BD
    .from("savegroups2")
    .insert([group])
    .select("id, currentGroupName, currentSecondGroup")
    .maybeSingle();

    if (error) throwModelError("Error al guardar el grupo", error, "DB_SAVE_GROUP_FAIL");
    return data;
}

export const deleteGroup = async (id: string) => {
    const { data, error } = await BD
    .from("savegroups2")
    .delete()
    .eq("id", id)
    .select("*")
    .maybeSingle();

    if (error) throwModelError("Error al eliminar el grupo", error, "DB_DELETE_GROUP_FAIL");
    return data;
}