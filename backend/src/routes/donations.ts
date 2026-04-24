//src/routes/donations.ts
import { Router } from "express";
import { createDonation, updateDonation, deleteDonation } from "../controllers/donations";
import { checkJwt } from "../middleware/session";

const router = Router()

//==routes the donations==

router.post("/",checkJwt, createDonation);
router.put("/:id", checkJwt, updateDonation);
router.delete("/:id", checkJwt, deleteDonation);

export default router;