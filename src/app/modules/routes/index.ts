import express from "express";
import { authRoutes } from "../Auth/auth.routes";
import { focusMetricsRoutes } from "../FocusMetrics/focusMetrics.routes";
import { focusSessionRoutes } from "../FocusSession/focusSession.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/",
    route: focusMetricsRoutes,
  },
  {
    path: "/focus-session",
    route: focusSessionRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
