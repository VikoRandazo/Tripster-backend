import { Router } from "express";
import {
  addFollow,
  removeVacationById,
  getAllVacations,
  getVacationById,
  getfollowedByUserId,
  editVacation,
  createNewVacation,
  exportCSV,
} from "../controllers/vacationsControllers";
import { checkAuthentication } from "../controllers/authControllers";

const router = Router();

router.get("/all", checkAuthentication, getAllVacations);
router.get("/:vid", checkAuthentication, getVacationById);
router.get("/user_vacations/:uid", checkAuthentication, getfollowedByUserId);
router.get("/csv/export", checkAuthentication, exportCSV);
router.post("/follow", checkAuthentication, addFollow);
router.post("/new", checkAuthentication, createNewVacation);
router.delete("/:vid", checkAuthentication, removeVacationById);

router.put("/:vid", checkAuthentication, editVacation);

export default router;
