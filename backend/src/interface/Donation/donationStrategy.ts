//scr/interface/donationStrategy.ts
import { Donation } from "./donations";

export interface DonationStrategy {
    validate(donation: Donation): Promise<void>;
}