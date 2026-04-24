//scr/validator/Strategies/UserExistence.ts
import type { ValidationDonationStrategy } from "../../interface/Strategy";
import type { Donation } from "../../interface/Donation/donations";
import { getUserById } from "../../models/user";
import { throwModelError } from "../../utils/error.handle";

export class UserExistenceValidation implements ValidationDonationStrategy {
    
    async validate(donation: Donation): Promise<void> {
        const User1 = await getUserById(donation.byUser);
        const User2 = await getUserById(donation.toUser);

        if (!User1) {
            throwModelError("Usuario donante no existe", null, "DONOR_NOT_FOUND", 404);
        }

        if (!User2) {
            throwModelError("Usuario receptor no existe", null, "RECIPIENT_NOT_FOUND", 404);
        }
    }
}