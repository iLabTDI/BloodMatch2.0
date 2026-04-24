//src/validator/Strategies/BloodType.ts
import { Donation } from "../../interface/Donation/donations";
import { ValidationDonationStrategy } from "../../interface/Strategy";
import { throwModelError } from "../../utils/error.handle";
import { getUserById } from "../../models/user";

export class BloodTypeValidation implements ValidationDonationStrategy {
    async validate(donation: Donation): Promise<void> {
        const donor = await getUserById(donation.byUser);
        const recipient = await getUserById(donation.toUser);

        // Validar que los usuarios sean del mismo tipo sanguíneo que la donacion
        if(donor!.Blood_Type !== donation.Blood_Type){
            throwModelError("El tipo sanguíneo de la donacion no coincide con el del donante", null, "INVALID_BLOOD_TYPE", 400);
        }
        if(recipient!.Blood_Type !== donation.Blood_Type){
            throwModelError("El tipo sanguíneo de la donacion no coincide con el del receptor", null, "INVALID_BLOOD_TYPE", 400);
        }
    }
}