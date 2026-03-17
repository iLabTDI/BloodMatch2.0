//scr/validator/Strategies/RequiredFields.ts
import { Donation } from "../../interface/Donation/donations";
import { DonationStrategy } from "../../interface/Donation/donationStrategy";
import { throwModelError } from "../../utils/error.handle";

export class ValidationFieldsDonation implements DonationStrategy {
    async validate(donation: Donation): Promise<void> {
        if(!donation.toUser || !donation.date || !donation.hospital || !donation.Blood_Type){
            throwModelError("Faltan campos obligatorios para el registro de la donación", null, "INVALID_DATE", 400);
        }
    }
}