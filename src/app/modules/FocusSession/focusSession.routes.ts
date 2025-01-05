import express from "express";
import { FocusSessionController } from "./focusSession.controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../Auth/auth.constants";

const router = express.Router();

// Route to create a new focus session
router.post(
  "/",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  FocusSessionController.createFocusSession
);

// Route to get active session for a user
router.get(
  "/:userId/active",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  FocusSessionController.getActiveSession
);

// Route to get a focus session by ID
router.get(
  "/:sessionId",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  FocusSessionController.getFocusSessionById
);

// Route to update a focus session by ID
router.put(
  "/:sessionId",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  FocusSessionController.updateFocusSession
);

// Route to delete a focus session by ID
router.delete(
  "/:sessionId",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  FocusSessionController.deleteFocusSession
);

// Route to list all focus sessions for a user
router.get(
  "/:userId/list",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  FocusSessionController.listFocusSessions
);

// Route to update focus session status for a user
router.put(
  "/:userId/status",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  FocusSessionController.updateFocusSessionStatus
);

// Route to pause a focus session for a user
router.put(
  "/:userId/pause",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  FocusSessionController.pauseFocusSession
);

// Route to start a focus session for a user
router.put(
  "/:userId/start",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  FocusSessionController.startFocusSession
);

export const FocusSessionRoutes = router;
