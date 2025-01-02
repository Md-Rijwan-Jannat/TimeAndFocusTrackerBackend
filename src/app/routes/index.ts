import express from "express";
import { authRoutes } from "../modules/Auth/auth.routes";
import { focusSessionRoutes } from "../modules/FocusSession/focusSession.routes";
import { userRoutes } from "../modules/User/user.routes";

const router = express.Router();

const moduleRoutes = [
  { path: "/auth", route: authRoutes },
  { path: "/users", route: userRoutes },
  { path: "/focus-session", route: focusSessionRoutes },
  // { path: "/focus-metrics", route: focusMetricsRoutes },
  // { path: "/streaks", route: streaksRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
