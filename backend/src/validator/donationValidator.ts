//src/validator/donation.ts
import { Donation } from "../interface/Donation/donations";
import { DonationStrategy } from "../interface/Donation/donationStrategy";

export class DonationValidator {
    constructor(private strategies: DonationStrategy[]){}

    async validate(donation: Donation): Promise<void> {
        for(const strategy of this.strategies){
            await strategy.validate(donation);
        }
    }
}