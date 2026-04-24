//src/routes/saveGroups.ts
import { Router } from "express";
import { createSaveGroup, deleteSaveGroup } from "../controllers/saveGroups";

const router = Router()

router.post("/", createSaveGroup)
router.delete("/:id", deleteSaveGroup)

export default router;