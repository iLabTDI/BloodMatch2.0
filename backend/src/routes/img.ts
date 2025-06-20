import { Router } from "express";
import { deleImg, getImg, getImgs, postImg, updateImg } from "../controllers/imgController";

const router = Router()

//       ==rutas de imagenes==


//para inserta un img tienes que tener un id(usuario registrado)
router.post("/id:", postImg);//Esta ruta se encarga de inserta imagenes

//Esta ruta se encarga de optener un imagen
router.get("/id:", getImg);

//Esta ruta optiene todas las imagenes
router.get("/", getImgs);

//Esta ruta se encarga de editar la imagen
router.put("/id", updateImg);

//Esta ruta se encarga de eliminar imagene
router.delete("/id", deleImg);

export default router;