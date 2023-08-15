import { Router } from "express";
import { getUserByEmail, login, register } from "../controllers/authControllers";


const router = Router()

router.post("/register",register)
router.post("/login", login)
router.get("/:email",getUserByEmail)

export default router