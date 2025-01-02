import express from "express";
import { focusSessionController } from "./focusSession.controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../Auth/auth.constants";

const router = express.Router();

// Create a new focus session
router.post(
  "/",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  focusSessionController.createFocusSession
);

// Get all focus sessions
router.get(
  "/",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  focusSessionController.getAllFocusSessionsForUser
);

// Get focus session by ID
router.get(
  "/:session_id",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  focusSessionController.getFocusSessionById
);

// Update focus session
router.put(
  "/:session_id",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  focusSessionController.updateFocusSession
);

// Delete focus session
router.delete(
  "/:session_id",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  focusSessionController.deleteFocusSession
);

export const focusSessionRoutes = router;
