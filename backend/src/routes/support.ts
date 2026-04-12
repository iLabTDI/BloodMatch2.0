import { Router } from "express";
import { createSupport, updateSupport, deleteSupport } from "../controllers/support";
import { checkJwt } from "../middleware/session";

const router = Router()

//==routes the support==
router.post("/", checkJwt, createSupport);
router.put("/:id", checkJwt, updateSupport);
router.delete("/:id", checkJwt, deleteSupport);

export default router;