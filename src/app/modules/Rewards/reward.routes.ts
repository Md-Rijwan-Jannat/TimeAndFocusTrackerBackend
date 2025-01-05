import express from "express";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../Auth/auth.constants";
import { RewardController } from "./reward.controller";

const router = express.Router();

// Get all rewards for a user
router.get(
  "/:userId/all",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  RewardController.getAllUserRewards
);

// Get daily rewards for a user
router.get(
  "/:userId/daily",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  RewardController.getDailyUserRewards
);

// Get weekly rewards for a user
router.get(
  "/:userId/weekly",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  RewardController.getWeeklyUserRewards
);

// Get monthly rewards for a user
router.get(
  "/:userId/monthly",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  RewardController.getMonthlyUserRewards
);

// Get reward by ID
router.get(
  "/:rewardId",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  RewardController.getRewardById
);

// Delete a reward
router.delete(
  "/:rewardId",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  RewardController.deleteReward
);

export const RewardsRoutes = router;
