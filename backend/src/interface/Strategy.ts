//scr/interface/Strategy.ts
import { Donation } from "./Donation/donations";
// validator/interfaces/ValidationStrategy.ts
export interface ValidationDonationStrategy {
    validate(donation: Donation): Promise<void>;
}