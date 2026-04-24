import { Router } from "express";
import { deleUser, logoutUser, updateUser } from "../controllers/User/userController";

const router = Router()

//       ==rutas de usuario==

//esta ruta se encarga de cerrar la sesion de usuario
router.post("/logout", logoutUser);

//Esta ruta se encarga de editar un usuario
router.put("/:id", updateUser);

//Esta ruta se encarga de eliminar usuarios
router.delete("/:id", deleUser);

export default router;