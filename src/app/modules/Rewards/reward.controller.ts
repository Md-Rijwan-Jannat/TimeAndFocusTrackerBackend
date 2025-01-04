import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { RewardService } from "./reward.service";

// Create a new reward
const createReward = catchAsync(async (req: Request, res: Response) => {
  const { userId, rewardType, details } = req.body;

  const reward = await RewardService.createReward(userId, rewardType, details);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Reward created successfully",
    data: reward,
  });
});

// Get all rewards for a user
const getUserRewards = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const rewards = await RewardService.getUserRewards(Number(userId));

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rewards retrieved successfully",
    data: rewards,
  });
});

// Get a reward by ID
const getRewardById = catchAsync(async (req: Request, res: Response) => {
  const { rewardId } = req.params;

  const reward = await RewardService.getRewardById(Number(rewardId));

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Reward retrieved successfully",
    data: reward,
  });
});

// Update a reward
const updateReward = catchAsync(async (req: Request, res: Response) => {
  const { rewardId } = req.params;
  const { rewardType, details } = req.body;

  const updatedReward = await RewardService.updateReward(
    Number(rewardId),
    rewardType,
    details
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Reward updated successfully",
    data: updatedReward,
  });
});

// Delete a reward
const deleteReward = catchAsync(async (req: Request, res: Response) => {
  const { rewardId } = req.params;

  await RewardService.deleteReward(Number(rewardId));

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Reward deleted successfully",
  });
});

export const RewardController = {
  createReward,
  getUserRewards,
  getRewardById,
  updateReward,
  deleteReward,
};
