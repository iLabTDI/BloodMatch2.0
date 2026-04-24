import { createSupportTicket,deleteSupportTicket,updateSupportTicket } from "../models/support";
import { getUserByEmail } from "../models/user";
import { Support } from "../interface/support";
import { throwModelError } from "../utils/error.handle";

export const registerSupportTicket = async (ticket: Support) => {
    //Validar existencia de usuario
    const User = await getUserByEmail(ticket.user);

    if (!User) {
        throwModelError("Usuario no existe", null, "USER_NOT_FOUND", 404);
    }

    if (!ticket.type || !ticket.subject || !ticket.message) {
        throwModelError("Todos los campos son requeridos", null, "VALIDATION_ERROR", 400);
    }

    const createdTicket = await createSupportTicket(ticket)
    
    if (!createdTicket){
        throwModelError("Error al crear el ticket de soporte", null, "CREATE_FAILED", 500);
    }
    return createdTicket;
}

export const modifySupportTicket = async (id: string, supportData: Partial<Support>) => {
    if (!id) {
        throw new Error("Id del ticket requerido");
    }

    const updatedTicket = await updateSupportTicket(id, supportData);

    if (!updatedTicket) {
        throwModelError("No se encontró el ticket para actualizar", null, "NOT_FOUND", 404);
    }

    return updatedTicket;
}

export const removeSupportTicket = async (id: string) => {
    if (!id) {
        throw new Error("Id del ticket requerido");
    }

    const deletedTicket = await deleteSupportTicket(id);

    if (!deletedTicket) {
        throwModelError("No se encontró el ticket para remover", null, "NOT_FOUND", 404);
    }

    return deletedTicket;
}