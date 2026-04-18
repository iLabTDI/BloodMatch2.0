import { Router } from "express";
import { checkJwt } from "../middleware/session";
import { createReport, getListReports, deleteReports } from "../controllers/reports";


const router = Router()

router.post("/", checkJwt, createReport);
router.get("/", checkJwt, getListReports);
router.delete("/:id", checkJwt, deleteReports);


export default router;