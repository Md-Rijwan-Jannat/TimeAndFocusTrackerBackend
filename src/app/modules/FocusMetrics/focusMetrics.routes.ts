import express from "express";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../Auth/auth.constants";
import { focusMetricController } from "./focusMetrics.controller";

const router = express.Router();

router.get(
  "/daily",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  focusMetricController.getDailyMetrics
);

router.get(
  "/weekly",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  focusMetricController.getWeeklyMetrics
);

router.get(
  "/streak",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  focusMetricController.getStreakMetrics
);

export const focusMetricsRoutes = router;
