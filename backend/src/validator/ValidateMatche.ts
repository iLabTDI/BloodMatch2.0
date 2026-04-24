import { findMatchById } from "../models/matches"

export const validateMatchAccess = async (matchId: number | string) => {
    try {
        const match = await findMatchById(String(matchId)); // ✅ conversión explícita
        if (!match) {
            return { valid: false, reason: "MATCH_NOT_FOUND" };
        }
        return { valid: true, match };
    } catch (error) {
        console.log("Error en validateMatchAccess:", error);
        return { valid: false, reason: "INTERNAL_ERROR" };
    }
}