//src/validator/Validator.ts
import { ValidationDonationStrategy } from "../interface/Strategy";
import { Donation } from "../interface/Donation/donations";

export class Validator {
    constructor(private strategies: ValidationDonationStrategy[]){}

    async validate(donation: Donation): Promise<void> {
        for(const strategy of this.strategies){
            await strategy.validate(donation);
        }
    }
}