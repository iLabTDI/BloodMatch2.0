//src/routes/matches.ts
import { Router } from "express";
import { checkJwt } from "../middleware/session";
import { createMatch, deleteMatche, getMatches } from "../controllers/matches";

const router = Router()

router.post("/",checkJwt, createMatch);
router.get("/:id", checkJwt, getMatches);
router.delete("/:id", checkJwt, deleteMatche);

export default router;