//src/routes/upload.ts
import { Router } from "express";
import { postFile, deleteFile, putFile } from "../controllers/Upload/upload";
import { uploadMiddleware } from "../middleware/file";
import { checkJwt } from "../middleware/session";

const router = Router()

//==routes the storage==

router.post("/",checkJwt, uploadMiddleware, postFile);//Esta ruta se encarga de subir archivos al storage
router.delete("/:id", checkJwt, deleteFile);
router.put("/:id", checkJwt, uploadMiddleware, putFile);
export default router;