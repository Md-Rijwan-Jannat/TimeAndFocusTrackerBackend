import express from "express";
import { userController } from "./user.controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../Auth/auth.constants";

const router = express.Router();

// Get user by ID
router.get(
  "/users/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  userController.getUser
);

// Update user details
router.put("/users/:id", auth(USER_ROLE.ADMIN), userController.update);

// Delete user by ID
router.delete("/users/:id", auth(USER_ROLE.ADMIN), userController.remove);

export const userRoutes = router;
