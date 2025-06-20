import { Router } from "express";
import { deleUser, getUser, getUsers, postLogin, postlogout, postRegister, updateUser } from "../controllers/userController";

const router = Router()

//       ==rutas de usuario==

//Esta ruta se encarga de hacer loging un usuario
router.post("/login", postLogin);

//esta ruta de encarga de registra un usuario
router.post("/register", postRegister);

//esta ruta se encarga de cerrar la sesion de usuario
router.post("/logout", postlogout);

//Esta ruta se encarga de optener un usuario
router.get("/:id", getUser);

//Esta ruta optiene todos los usuarios
router.get("/", getUsers);

//Esta ruta se encarga de editar un usuario
router.put("/:id", updateUser);

//Esta ruta se encarga de eliminar usuarios
router.delete("/:id", deleUser);

export default router;