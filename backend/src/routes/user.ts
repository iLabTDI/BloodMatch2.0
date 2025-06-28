import { Router } from "express";
import { deleUser, getUser, loginUser, logoutUser, registerUser, updateUser } from "../controllers/userController";

const router = Router()

//       ==rutas de usuario==

//Esta ruta se encarga de hacer loging un usuario
router.post("/login", loginUser);

//esta ruta de encarga de registra un usuario
router.post("/register", registerUser);

//esta ruta se encarga de cerrar la sesion de usuario
router.post("/logout", logoutUser);

//Esta ruta se encarga de optener un usuario
router.get("/:id", getUser);

//Esta ruta se encarga de editar un usuario
router.put("/:id", updateUser);

//Esta ruta se encarga de eliminar usuarios
router.delete("/:id", deleUser);

export default router;