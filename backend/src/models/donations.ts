//src/models/donations.ts
import { BD } from "../config/supabase"
import { Donation } from "../interface/Donation/donations"
import { throwModelError } from "../utils/error.handle";

//Crear Donación
export const createDonation = async (Donation: Donation): Promise<Donation | null> => {
    const { data, error } = await BD
    .from("donations")
    .insert([Donation])
    .select("id, date, byUser, toUser, hospital, Blood_Type")
    .maybeSingle();

    if (error) throwModelError("Error al crear donación", error, "DB_CREATE_USER_FAIL");
    return data;
}

//Delete Donatión
export const deleteDonation = async (id: string): Promise<Donation | null>  => {
    const { data, error } = await BD
    .from("donations")
    .delete()
    .eq("id", id)
    .select("id, date, byUser, toUser, hospital, Blood_Type")
    .maybeSingle();

    if (error) throwModelError("Error al eliminar donación", error, "DB_CREATE_USER_FAIL");
    return data;
}

//Update Donatión
export const updateDonation = async (id: string, donationData: { date: string, hospital:string }): Promise<Donation | null> => {
    const { data, error } = await BD
    .from("donations")
    .update(donationData)
    .eq("id", id)
    .select("id, date, byUser, toUser, hospital, Blood_Type")
    .maybeSingle();

    if (error) throwModelError("Error al actualizar la donación", error, "DB_UPDATE_USER_FAIL");
    return data;
}