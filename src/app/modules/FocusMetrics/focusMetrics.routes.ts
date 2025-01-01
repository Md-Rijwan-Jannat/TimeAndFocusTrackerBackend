import express from "express";
import { focusMetricsController } from "./focusMetrics.controller";

const router = express.Router();

router.get("/focus-metrics", focusMetricsController.getFocusMetrics);
router.get("/streaks", focusMetricsController.getStreaks);

export const focusMetricsRoutes = router;
