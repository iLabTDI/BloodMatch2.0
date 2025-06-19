import { Router } from "express";

const router = Router()

//       ==rutas de imagenes==

//Esta ruta se encarga de crear imagenes
router.post("/");

//Esta ruta se encarga de optener un imagen
router.get("/",(req, res)=>{
    res.send({data: "Aqui van los modelos"})
});

//Esta ruta optiene todas las imagenes
router.get("/");

//Esta ruta se encarga de editar la imagen
router.put("/");

//Esta ruta se encarga de eliminar imagene
router.delete("/");

export default router;