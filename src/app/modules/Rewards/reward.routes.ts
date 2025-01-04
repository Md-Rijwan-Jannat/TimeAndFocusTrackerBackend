import express from "express";
import { RewardController } from "./reward.controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../Auth/auth.constants";

const router = express.Router();

// Create a new reward
router.post(
  "",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  RewardController.createReward
);

// Get rewards for a user
router.get(
  "/:userId",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  RewardController.getUserRewards
);

// Get reward by ID
router.get(
  "/:rewardId",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  RewardController.getRewardById
);

// Update a reward
router.put(
  "/:rewardId",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  RewardController.updateReward
);

// Delete a reward
router.delete(
  "/:rewardId",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  RewardController.deleteReward
);

export const RewardsRoutes = router;
