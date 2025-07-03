import { Router } from "express";
import { loginUser, registerUser,} from "../controllers/userController";

const router = Router()

//       ==rutas de usuario==

//Esta ruta se encarga de hacer loging un usuario
router.post("/login", loginUser);

//esta ruta de encarga de registra un usuario
router.post("/register", registerUser);

export default router;