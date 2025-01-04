import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { RewardService } from "./reward.service";

// Get all rewards for a user
const getAllUserRewards = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const rewards = await RewardService.getAllUserRewards(Number(userId));

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All rewards retrieved successfully",
    data: rewards,
  });
});

// Get daily rewards for a user
const getDailyUserRewards = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const rewards = await RewardService.getDailyUserRewards(Number(userId));

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Daily rewards retrieved successfully",
    data: rewards,
  });
});

// Get weekly rewards for a user
const getWeeklyUserRewards = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const rewards = await RewardService.getWeeklyUserRewards(Number(userId));

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Weekly rewards retrieved successfully",
    data: rewards,
  });
});

// Get monthly rewards for a user
const getMonthlyUserRewards = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    const rewards = await RewardService.getMonthlyUserRewards(Number(userId));

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Monthly rewards retrieved successfully",
      data: rewards,
    });
  }
);

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
  getAllUserRewards,
  getDailyUserRewards,
  getWeeklyUserRewards,
  getMonthlyUserRewards,
  getRewardById,
  deleteReward,
};
