//scr/validator/Strategies/RequiredFields.ts
import { ValidationDonationStrategy } from "../../interface/Strategy";
import { Donation } from "../../interface/Donation/donations";
import { throwModelError } from "../../utils/error.handle";

export class ValidationFields implements ValidationDonationStrategy {
    
    async validate(donation: Donation): Promise<void> {
        if (!donation.toUser || !donation.date || !donation.hospital || !donation.Blood_Type) {
            throwModelError(
                "Faltan campos obligatorios para el registro de la donación",
                null,
                "INVALID_DATA",
                400
            );
        }
    }
}