//src/models/support.ts
import { BD } from "../config/supabase"
import { Support } from "../interface/support"
import { throwModelError } from "../utils/error.handle"

const TABLE_SUPPORT = "support"

export const createSupportTicket = async (ticket: Support) => {
    const { data, error } = await BD
    .from(TABLE_SUPPORT)
    .insert([ticket])
    .select("id, type, subject, message, user")
    .maybeSingle();

    if (error) throwModelError("Error al crear el ticket de soporte", error, "DB_CREATE_SUPPORT_FAIL");
    return data;
}

export const getSupportTickets = async () => {
    const { data, error } = await BD
    .from(TABLE_SUPPORT)
    .select("id, type, subject, message, user");

    if (error) throwModelError("Error al obtener los tickets de soporte", error, "DB_GET_SUPPORT_FAIL");
    return data;
}

export const getSupportTicketsById = async (id: string) => {
    const { data, error } = await BD
    .from(TABLE_SUPPORT)
    .select("id, type, subject, message, user")
    .eq("id", id)
    .maybeSingle();

    if (error) throwModelError("Error al obtener los tickets de soporte por Id", error, "DB_GET_SUPPORT_ID_FAIL");
    return data;
}

export const updateSupportTicket = async (id: string, supportData: Partial<Support>) => {
    const { data, error } = await BD
    .from(TABLE_SUPPORT)
    .update(supportData)
    .eq("id", id)
    .select("type, subject, message")

    if (error) throwModelError("Error al actualizar el ticket de soporte", error, "DB_UPDATE_SUPPORT_FAIL");
    return data;
}

export const deleteSupportTicket = async (id: string) => {
    const { data, error } = await BD
    .from(TABLE_SUPPORT)
    .delete()
    .eq("id", id)
    .select("id, type, subject, message, user")

    if (error) throwModelError("Error al eliminar el ticket de soporte", error, "DB_DELETE_SUPPORT_FAIL");
    return data;
}