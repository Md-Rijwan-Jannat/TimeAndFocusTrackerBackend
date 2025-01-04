import express from "express";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../Auth/auth.constants";
import { FocusMetricController } from "./analytics.controller";

const router = express.Router();

// Route to get daily metrics
router.get(
  "/daily",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  FocusMetricController.getDailyMetrics
);

// Route to get weekly metrics
router.get(
  "/weekly",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  FocusMetricController.getWeeklyMetrics
);

// Route to get streak metrics
router.get(
  "/streak",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  FocusMetricController.getStreakMetrics
);

export const analyticsRoutes = router;
