import { Router } from "express";

const router = Router()

//       ==rutas de usuario==

//Esta ruta se encarga de crear usuarios
router.post("/");

//Esta ruta se encarga de optener un usuario
router.get("/",(req, res)=>{
    res.send({data: "Aqui van los modelos"})
});

//Esta ruta optiene todos los usuarios
router.get("/");

//Esta ruta se encarga de editar un usuario
router.put("/");

//Esta ruta se encarga de eliminar usuarios
router.delete("/");

export default router;