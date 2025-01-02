import express from "express";
import { authRoutes } from "../modules/Auth/auth.routes";
import { focusMetricsRoutes } from "../modules/FocusMetrics/focusMetrics.routes";
import { focusSessionRoutes } from "../modules/FocusSession/focusSession.routes";
import { userRoutes } from "../modules/User/user.routes";
// import { streaksRoutes } from "../Streaks/streaks.routes";
// import { usersRoutes } from "../Users/users.routes";

const router = express.Router();

const moduleRoutes = [
  { path: "/auth", route: authRoutes },
  { path: "/users", route: userRoutes },
  { path: "/focus-metrics", route: focusMetricsRoutes },
  { path: "/focus-session", route: focusSessionRoutes },
  // { path: "/streaks", route: streaksRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

// ─ Auth/
// │   │   │   │   ├── auth.controller.ts
// │   │   │   │   ├── auth.routes.ts
// │   │   │   │   ├── auth.service.ts
// │   │   │   │   ├── auth.utils.ts
// │   │   │   ├── FocusMetrics/
// │   │   │   │   ├── focusMetrics.controller.ts
// │   │   │   │   ├── focusMetrics.routes.ts
// │   │   │   │   ├── focusMetrics.service.ts
// │   │   │   ├── FocusSession/
// │   │   │   │   ├── focusSession.controller.ts
// │   │   │   │   ├── focusSession.routes.ts
// │   │   │   │   ├── focusSession.service.ts
// │   │   │   ├── Streaks/
// │   │   │   │   ├── streaks.controller.ts
// │   │   │   │   ├── streaks.routes.ts
// │   │   │   │   ├── streaks.service.ts
// │   │   │   ├── Users/
// │   │   │   │   ├── users.controller.ts
// │   │   │   │   ├── users.routes.ts
// │   │   │   │   ├── users.service.ts
