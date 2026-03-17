//src/service/donations.ts
import { createDonation, deleteDonation, updateDonation } from "../models/donations";
import { Donation } from "../interface/Donation/donations";
import { throwModelError } from "../utils/error.handle";
import { DonationValidator } from "../validator/donationValidator";
import { ValidationFieldsDonation } from "../validator/Strategies/RequiredFields";
import { UserExistenceValidation } from "../validator/Strategies/UserExistence";
import { BloodTypeValidation } from "../validator/Strategies/BloodType";

export const registerDonation = async (donation: Donation): Promise<Donation | null> => {
    const validator = new DonationValidator([
        new ValidationFieldsDonation(),
        new UserExistenceValidation(),
        new BloodTypeValidation()
    ]);

    await validator.validate(donation);
    
    const createdDonation = await createDonation(donation);

    if (!createdDonation) {
        throwModelError("Error al crear la donación", null, "CREATE_FAILED", 500);
    }
    return createdDonation; 
};

export const editDonation = async ( id: string, updateData:{ date: string, hospital:string }): Promise<Donation | null> => {

    const allowedFields = ["date", "hospital"];

    const invalidField = Object.keys(updateData).find(
        field => !allowedFields.includes(field)
    );

    if (invalidField) {
        throwModelError(`No se puede modificar el campo: ${invalidField}`,null,"INVALID_UPDATE",400);
    }
    const updatedDonation = await updateDonation(id, updateData);

    if (!updatedDonation) {
        throwModelError("No se encontró la donación para actualizar", null, "NOT_FOUND", 404);
    }
    return updatedDonation;
};

export const removeDonation = async (id: string): Promise<Donation | null> => {
    const deletedDonation = await deleteDonation(id);
    return deletedDonation;
};