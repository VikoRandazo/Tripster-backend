import { Router } from "express";
import vacationsRoutes from "./vacationsRoutes";
import authRoutes from "./authRoutes";
import followersRoutes from "./followersRoutes";
const router = Router();

router.use("/auth", authRoutes);
router.use("/vacations", vacationsRoutes);
router.use("/like", followersRoutes);

export default router;
