import { RewardType } from "@prisma/client";
import prisma from "../../config/prismaClient";
import AppError from "../../error/appError";
import httpStatus from "http-status";
import { getDateRange } from "./reward.utils";

// Get all rewards for a user
const getAllUserRewards = async (userId: number) => {
  const rewards = await prisma.rewards.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return rewards;
};

// Get daily rewards for a user
const getDailyUserRewards = async (userId: number) => {
  const { start, end } = getDateRange("daily");
  const rewards = await prisma.rewards.findMany({
    where: {
      userId,
      createdAt: {
        gte: start,
        lte: end,
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return rewards;
};

// Get weekly rewards for a user
const getWeeklyUserRewards = async (userId: number) => {
  const { start, end } = getDateRange("weekly");
  const rewards = await prisma.rewards.findMany({
    where: {
      userId,
      createdAt: {
        gte: start,
        lte: end,
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return rewards;
};

// Get monthly rewards for a user
const getMonthlyUserRewards = async (userId: number) => {
  const { start, end } = getDateRange("monthly");
  const rewards = await prisma.rewards.findMany({
    where: {
      userId,
      createdAt: {
        gte: start,
        lte: end,
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return rewards;
};

// Get reward by ID
const getRewardById = async (rewardId: number) => {
  const reward = await prisma.rewards.findUnique({
    where: {
      id: rewardId,
    },
  });

  if (!reward) {
    throw new AppError(httpStatus.NOT_FOUND, "Reward not found");
  }

  return reward;
};

// Delete reward by ID
const deleteReward = async (rewardId: number) => {
  // Check if the reward exists
  const reward = await prisma.rewards.findUnique({
    where: {
      id: rewardId,
    },
  });

  if (!reward) {
    throw new AppError(httpStatus.NOT_FOUND, "Reward not found");
  }

  // Delete the reward
  await prisma.rewards.delete({
    where: {
      id: rewardId,
    },
  });

  return { message: "Reward deleted successfully" };
};

export const RewardService = {
  getAllUserRewards,
  getDailyUserRewards,
  getWeeklyUserRewards,
  getMonthlyUserRewards,
  getRewardById,
  deleteReward,
};
