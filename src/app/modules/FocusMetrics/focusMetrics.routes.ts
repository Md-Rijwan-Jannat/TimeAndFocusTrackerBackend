import express from "express";
import { focusMetricsController } from "./focusMetrics.controller";

const router = express.Router();

router.get("/:userId/metrics", focusMetricsController.getFocusMetrics);
router.get("/:userId/streaks", focusMetricsController.getStreaks);

export const focusMetricsRoutes = router;
