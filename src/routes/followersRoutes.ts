import { Router } from "express";
import {
  getAllLikes,
  getLikesAmount,
  getUserLikes,
  handleToggleLikeController,
} from "../controllers/followersController";
import { checkAuthentication } from "../controllers/authControllers";

const router = Router();

router.get(`/all`, checkAuthentication, getAllLikes);
router.get("/:vid", checkAuthentication, getLikesAmount);
router.get("/user/:uid", checkAuthentication, getUserLikes);
router.post("/:uid", checkAuthentication, handleToggleLikeController);
router.delete("/:uid", checkAuthentication, handleToggleLikeController);

export default router;
