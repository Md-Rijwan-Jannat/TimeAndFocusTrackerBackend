import express from "express";
import { authRoutes } from "../Auth/auth.routes";
import { focusMetricsRoutes } from "../FocusMetrics/focusMetrics.routes";
import { focusSessionRoutes } from "../FocusSession/focusSession.routes";
// import { streaksRoutes } from "../Streaks/streaks.routes";
// import { usersRoutes } from "../Users/users.routes";

const router = express.Router();

const moduleRoutes = [
  { path: "/auth", route: authRoutes },
  { path: "/focus-metrics", route: focusMetricsRoutes },
  { path: "/focus-session", route: focusSessionRoutes },
  // { path: "/streaks", route: streaksRoutes },
  // { path: "/users", route: usersRoutes },
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
