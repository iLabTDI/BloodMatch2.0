//scr/validator/Strategies/UserExistence.ts
import { Donation } from "../../interface/Donation/donations";
import { DonationStrategy } from "../../interface/Donation/donationStrategy";
import { getUserById } from "../../models/user";
import { throwModelError } from "../../utils/error.handle";

export class UserExistenceValidation implements DonationStrategy {
    async validate(donation: Donation): Promise<void> {
        const donor = await getUserById(donation.byUser);
        const recipient = await getUserById(donation.toUser);
        // Validar que el usuario donate y el receptor existan
        if(!donor){
            throwModelError("Usuario donante no existe", null, "DONOR_NOT_FOUND", 404);
        }
        if(!recipient){
            throwModelError("Usuario receptor no existe", null, "RECIPIENT_NOT_FOUND", 404);
        }
    }
}