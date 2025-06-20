import { Router } from "express";

const router = Router()

//       ==rutas de usuario==

//Esta ruta se encarga de hacer loging un usuario
router.post("/login");

//esta ruta de encarga de registra un usuario
router.post("/register");

//esta ruta se encarga de cerrar la sesion de usuario
router.post("/logout");

//Esta ruta se encarga de optener un usuario
router.get("/:id",(req, res)=>{
    res.send({data: "Aqui van los modelos"})
});

//Esta ruta optiene todos los usuarios
router.get("/");

//Esta ruta se encarga de editar un usuario
router.put("/:id");

//Esta ruta se encarga de eliminar usuarios
router.delete("/:id");

export default router;