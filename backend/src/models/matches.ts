//src/models/matches.ts
import { BD } from "../config/supabase"
import { Matches } from "../interface/matches"
import { throwModelError } from "../utils/error.handle";

export const createMatch = async (Match: Matches) => {
    const { data, error } = await BD
    .from("matches")
    .insert([Match])
    .select("id_matches, user1_id, user2_id, messages, user1_name, user2_name")
    .maybeSingle();

    if (error) throwModelError("Error al crear Macth", error, "DB_CREATE_MATCH_FAIL");
    return data;
}

export const deleteMatche = async (id: string) => {
    const { data, error } = await BD
    .from("matches")
    .delete()
    .eq("id_matches", id)
    .select("user1_id, user2_id, messages, user1_name, user2_name")
    .maybeSingle();

    if (error) throwModelError("Error al elimininar el Match", error, "DB_DELETE_MATCHE_FAIL");
    return data;
}

export const getMatchesByUser = async (id: string) => {
    const { data, error } = await BD
    .from("matches")
    .select("*")
    .or(`user1_id.eq.${id},user2_id.eq.${id}`)

    if (error) throwModelError("Error al Obtener los Matches del usuario", error, "DB_GET_MATCH_USER_FAIL");
    return data;
}

export const findMatchById = async (id: string) => {
    const { data, error } = await BD
        .from("matches")
        .select("*")
        .eq("id_matches", id)
        .maybeSingle();

        if (error) {
            console.log("Error buscando match:", error);
        return null; // 🔥 CLAVE
    }

    return data;
}