import express from "express";
import { userController } from "./user.controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../Auth/auth.constants";

const router = express.Router();

// Get all users
router.get(
  "/",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  userController.getAllUser
);

// Get user by ID
router.get(
  "/:userId",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  userController.getUser
);

// Update user details
router.put(
  "/:userId",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  userController.updateUser
);

// Delete user by ID
router.delete("/:userId", auth(USER_ROLE.ADMIN), userController.deleteUser);

export const userRoutes = router;
