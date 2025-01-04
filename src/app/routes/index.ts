import express from "express";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { FocusSessionRoutes } from "../modules/FocusSession/focusSession.routes";
import { userRoutes } from "../modules/User/user.routes";
import { analyticsRoutes } from "../modules/Analytics/analytics.routes";
import { RewardsRoutes } from "../modules/Rewards/reward.routes";

const router = express.Router();

const moduleRoutes = [
  { path: "/auth", route: AuthRoutes },
  { path: "/users", route: userRoutes },
  { path: "/focus-session", route: FocusSessionRoutes },
  { path: "/analytics", route: analyticsRoutes },
  { path: "/rewards", route: RewardsRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
