import express from "express";
import { authController } from "./auth.controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "./auth.constants";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get(
  "/profile",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  authController.getProfile
);

export const authRoutes = router;
